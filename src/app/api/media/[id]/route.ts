import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import authOptions from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { deleteFromR2, extractKeyFromUrl, isR2Configured } from '@/lib/media/r2-storage'

interface RouteParams {
  params: { id: string }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const session = await getServerSession(authOptions)

  if (!session?.user || (session.user as any)?.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const media = await prisma.mediaItem.findUnique({ where: { id: params.id } })

    if (!media) {
      return NextResponse.json({ success: false, error: 'Media item not found' }, { status: 404 })
    }

    if (isR2Configured()) {
      const key = media.filename || extractKeyFromUrl(media.url)
      if (key) {
        try {
          await deleteFromR2(key)
        } catch (error) {
          console.error('[api/media/:id] Failed to delete from R2', error)
        }
      }
    }

    await prisma.mediaItem.delete({ where: { id: params.id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[api/media/:id] Delete failed', error)
    return NextResponse.json({ success: false, error: 'Failed to delete media item' }, { status: 500 })
  }
}
