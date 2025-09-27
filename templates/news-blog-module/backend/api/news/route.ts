import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { validateNewsPost, generateUniqueSlug } from '../lib/news-service'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const published = searchParams.get('published')
    const featured = searchParams.get('featured')
    const category = searchParams.get('category')
    const limit = searchParams.get('limit')
    const search = searchParams.get('search')
    const author = searchParams.get('author')

    const where: any = {}

    if (published !== null) {
      where.published = published === 'true'
    }

    if (featured !== null) {
      where.featured = featured === 'true'
    }

    if (category) {
      where.category = category
    }

    if (author) {
      where.author = author
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
        { tags: { contains: search, mode: 'insensitive' } }
      ]
    }

    const news = await prisma.newsPost.findMany({
      where,
      orderBy: [
        { featured: 'desc' },
        { displayOrder: 'asc' },
        { publishedAt: 'desc' },
        { createdAt: 'desc' }
      ],
      take: limit ? parseInt(limit) : undefined
    })

    return NextResponse.json(news)
  } catch (error) {
    console.error('Error fetching news:', error)
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()

    // Validate required fields
    const validation = validateNewsPost(body)
    if (!validation.isValid) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.errors },
        { status: 400 }
      )
    }

    // Generate slug from title if not provided
    let slug = body.slug
    if (!slug && body.title) {
      const existingSlugs = await prisma.newsPost.findMany({
        select: { slug: true }
      })
      slug = await generateUniqueSlug(body.title, existingSlugs.map(p => p.slug))
    }

    // Prepare data for creation
    const newsData = {
      title: body.title,
      slug,
      excerpt: body.excerpt || null,
      content: body.content,
      imageUrl: body.imageUrl || null,
      category: body.category || 'general',
      tags: body.tags || null,
      author: body.author || session.user?.name || null,
      featured: body.featured || false,
      published: body.published || false,
      publishedAt: body.published ? new Date() : null,
      displayOrder: body.displayOrder || 0
    }

    const newsPost = await prisma.newsPost.create({
      data: newsData
    })

    return NextResponse.json(newsPost, { status: 201 })
  } catch (error) {
    console.error('Error creating news post:', error)
    return NextResponse.json(
      { error: 'Failed to create news post' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const ids = searchParams.get('ids')

    if (!ids) {
      return NextResponse.json(
        { error: 'No post IDs provided' },
        { status: 400 }
      )
    }

    // Parse comma-separated IDs
    const postIds = ids.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id))

    if (postIds.length === 0) {
      return NextResponse.json(
        { error: 'No valid post IDs provided' },
        { status: 400 }
      )
    }

    // Bulk delete
    const result = await prisma.newsPost.deleteMany({
      where: {
        id: { in: postIds }
      }
    })

    return NextResponse.json({
      success: true,
      deletedCount: result.count
    })
  } catch (error) {
    console.error('Error deleting news posts:', error)
    return NextResponse.json(
      { error: 'Failed to delete news posts' },
      { status: 500 }
    )
  }
}