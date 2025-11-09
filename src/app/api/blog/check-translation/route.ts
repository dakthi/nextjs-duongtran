import { NextRequest, NextResponse } from 'next/server'
import { getBlogPostBySlug } from '@/lib/blog-service'

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const slug = url.searchParams.get('slug')
    const locale = url.searchParams.get('locale') || 'en'

    if (!slug) {
      return NextResponse.json({ exists: false }, { status: 400 })
    }

    // Try to get the post in the target language
    const post = await getBlogPostBySlug(slug, false, locale)

    return NextResponse.json({
      exists: !!post,
      slug: post?.slug,
      locale: post?.locale
    })
  } catch (error) {
    return NextResponse.json({ exists: false }, { status: 200 })
  }
}
