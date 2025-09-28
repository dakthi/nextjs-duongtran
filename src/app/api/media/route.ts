import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import authOptions from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateR2Key, uploadToR2, isR2Configured } from '@/lib/media/r2-storage'
import { debugR2Config } from '@/lib/env-debug'
import { extractFileData } from '@/lib/file-utils'

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
    const config = debugR2Config()
    console.error('R2 not configured. Debug info:', config)
    return NextResponse.json({
      success: false,
      error: 'Cloudflare R2 is not configured',
      debug: process.env.NODE_ENV === 'development' ? config : undefined
    }, { status: 500 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file')

    // Extract file data using our compatibility utility
    const fileData = await extractFileData(file)

    if (fileData.size === 0) {
      return NextResponse.json({ success: false, error: 'Empty file provided' }, { status: 400 })
    }

    const altText = formData.get('altText')?.toString() ?? null
    const caption = formData.get('caption')?.toString() ?? null

    const key = generateR2Key(fileData.name, 'media')
    const upload = await uploadToR2(key, fileData.buffer, fileData.type)

    const mediaItem = await prisma.mediaItem.create({
      data: {
        filename: upload.key,
        originalName: fileData.name,
        mimeType: fileData.type,
        size: fileData.buffer.length,
        url: upload.url,
        alt: altText,
        caption,
      },
    })

    return NextResponse.json(mediaItem, { status: 201 })
  } catch (error) {
    console.error('[api/media] Upload failed', error)

    // More specific error messages based on the error type
    let errorMessage = 'Failed to upload media'
    let statusCode = 500

    if (error instanceof Error) {
      if (error.message.includes('No file provided') || error.message.includes('Invalid file object')) {
        errorMessage = error.message
        statusCode = 400
      } else if (error.message.includes('Failed to read file data')) {
        errorMessage = 'Unable to process the uploaded file'
        statusCode = 400
      } else {
        errorMessage = `Upload error: ${error.message}`
      }
    }

    return NextResponse.json({
      success: false,
      error: errorMessage,
      debug: process.env.NODE_ENV === 'development' ? error?.toString() : undefined
    }, { status: statusCode })
  }
}
