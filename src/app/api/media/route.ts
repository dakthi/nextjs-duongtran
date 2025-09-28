import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import authOptions from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateR2Key, uploadToR2, isR2Configured } from '@/lib/media/r2-storage'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.user || (session.user as any)?.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const mediaItems = await prisma.mediaItem.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(mediaItems)
  } catch (error) {
    console.error('[api/media] Failed to fetch media items', error)
    return NextResponse.json({ success: false, error: 'Failed to load media library' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user || (session.user as any)?.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  if (!isR2Configured()) {
    return NextResponse.json({ success: false, error: 'Cloudflare R2 is not configured' }, { status: 500 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!(file instanceof File)) {
      return NextResponse.json({ success: false, error: 'File missing from request' }, { status: 400 })
    }

    if (file.size === 0) {
      return NextResponse.json({ success: false, error: 'Empty file provided' }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const altText = formData.get('altText')?.toString() ?? null
    const caption = formData.get('caption')?.toString() ?? null

    const key = generateR2Key(file.name, 'media')
    const upload = await uploadToR2(key, buffer, file.type || 'application/octet-stream')

    const mediaItem = await prisma.mediaItem.create({
      data: {
        filename: upload.key,
        originalName: file.name,
        mimeType: file.type || 'application/octet-stream',
        size: buffer.length,
        url: upload.url,
        alt: altText,
        caption,
      },
    })

    return NextResponse.json(mediaItem, { status: 201 })
  } catch (error) {
    console.error('[api/media] Upload failed', error)
    return NextResponse.json({ success: false, error: 'Failed to upload media' }, { status: 500 })
  }
}
