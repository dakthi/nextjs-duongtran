import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import authOptions from '@/lib/auth'
import { upsertBlogPost, deleteBlogPost, getBlogPostById } from '@/lib/blog-service'
import type { BlogPostInput } from '@/types/blog.types'

const toOptionalNumber = (value: unknown): number | null => {
  if (value === null || value === undefined || value === '') return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

const toBoolean = (value: unknown, fallback = false): boolean => {
  if (typeof value === 'boolean') return value
  if (typeof value === 'string') return value === 'true'
  return fallback
}

const parseBlogInput = (payload: any): BlogPostInput => ({
  id: typeof payload?.id === 'string' ? payload.id : undefined,
  slug: String(payload?.slug ?? ''),
  title: String(payload?.title ?? ''),
  excerpt: payload?.excerpt ? String(payload.excerpt) : null,
  content: String(payload?.content ?? ''),
  image: payload?.image ? String(payload.image) : null,
  category: payload?.category ? String(payload.category) : null,
  quote: payload?.quote ? String(payload.quote) : null,
  readingTime: toOptionalNumber(payload?.readingTime),
  publishedDate: payload?.publishedDate ? String(payload.publishedDate) : null,
  clientName: payload?.clientName ? String(payload.clientName) : null,
  clientAge: toOptionalNumber(payload?.clientAge),
  clientJob: payload?.clientJob ? String(payload.clientJob) : null,
  clientImage: payload?.clientImage ? String(payload.clientImage) : null,
  expertName: payload?.expertName ? String(payload.expertName) : null,
  expertTitle: payload?.expertTitle ? String(payload.expertTitle) : null,
  expertImage: payload?.expertImage ? String(payload.expertImage) : null,
  isFeatured: toBoolean(payload?.isFeatured, false),
  isPublished: toBoolean(payload?.isPublished, true),
})

const unauthorized = NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user || (session.user as any)?.role !== 'admin') {
    return unauthorized
  }

  try {
    const post = await getBlogPostById(params.id)
    if (!post) {
      return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: post })
  } catch (error) {
    console.error('[api/blog/[id]] Failed to fetch post', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch post' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user || (session.user as any)?.role !== 'admin') {
    return unauthorized
  }

  try {
    const payload = parseBlogInput(await request.json())
    const post = await upsertBlogPost({ ...payload, id: params.id })
    return NextResponse.json({ success: true, data: post })
  } catch (error) {
    console.error('[api/blog/[id]] Failed to update post', error)
    const validationErrors = (error as any)?.validationErrors
    if (validationErrors) {
      return NextResponse.json({ success: false, error: 'Validation failed', errors: validationErrors }, { status: 400 })
    }
    return NextResponse.json({ success: false, error: 'Failed to update post' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user || (session.user as any)?.role !== 'admin') {
    return unauthorized
  }

  try {
    await deleteBlogPost(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[api/blog/[id]] Failed to delete post', error)
    return NextResponse.json({ success: false, error: 'Failed to delete post' }, { status: 500 })
  }
}