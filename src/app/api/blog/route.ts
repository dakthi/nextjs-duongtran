import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import authOptions from '@/lib/auth'
import { listAllPosts, upsertBlogPost } from '@/lib/blog-service'
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
  locale: payload?.locale ? String(payload.locale) : 'en',
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

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user || (session.user as any)?.role !== 'admin') {
    return unauthorized
  }

  try {
    const url = new URL(request.url)
    const locale = url.searchParams.get('locale') || 'en'
    const posts = await listAllPosts(locale)
    return NextResponse.json({ success: true, data: posts }, {
      headers: {
        'Cache-Control': 'no-store'
      }
    })
  } catch (error) {
    console.error('[api/blog] Failed to fetch posts', error)
    return NextResponse.json({ success: false, error: 'Failed to load posts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user || (session.user as any)?.role !== 'admin') {
    return unauthorized
  }

  try {
    const url = new URL(request.url)
    const locale = url.searchParams.get('locale') || 'en'

    const payload = parseBlogInput(await request.json())
    // Ensure the locale is set based on the current admin locale
    const postWithLocale = { ...payload, locale }

    const post = await upsertBlogPost(postWithLocale)
    return NextResponse.json({ success: true, data: post }, { status: 201 })
  } catch (error) {
    console.error('[api/blog] Failed to create post', error)
    const validationErrors = (error as any)?.validationErrors
    if (validationErrors) {
      return NextResponse.json({ success: false, error: 'Validation failed', errors: validationErrors }, { status: 400 })
    }
    return NextResponse.json({ success: false, error: 'Failed to create post' }, { status: 500 })
  }
}
