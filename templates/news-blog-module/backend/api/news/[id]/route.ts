import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { validateNewsPost, generateUniqueSlug } from '../../lib/news-service'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id

    let newsPost

    if (isNaN(parseInt(id))) {
      // Try to find by slug
      newsPost = await prisma.newsPost.findUnique({
        where: { slug: id }
      })
    } else {
      // Find by ID
      newsPost = await prisma.newsPost.findUnique({
        where: { id: parseInt(id) }
      })
    }

    if (!newsPost) {
      return NextResponse.json(
        { error: 'News post not found' },
        { status: 404 }
      )
    }

    // Increment view count for published posts accessed by slug
    if (isNaN(parseInt(id)) && newsPost.published) {
      await prisma.newsPost.update({
        where: { id: newsPost.id },
        data: { viewCount: { increment: 1 } }
      })

      // Return updated post with incremented view count
      newsPost.viewCount += 1
    }

    return NextResponse.json(newsPost)
  } catch (error) {
    console.error('Error fetching news post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch news post' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid post ID' },
        { status: 400 }
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

    // Get current post
    const currentPost = await prisma.newsPost.findUnique({
      where: { id }
    })

    if (!currentPost) {
      return NextResponse.json(
        { error: 'News post not found' },
        { status: 404 }
      )
    }

    // Generate slug from title if not provided
    let slug = body.slug
    if (!slug && body.title) {
      const existingSlugs = await prisma.newsPost.findMany({
        where: { NOT: { id } },
        select: { slug: true }
      })
      slug = await generateUniqueSlug(body.title, existingSlugs.map(p => p.slug))
    }

    // Handle publishedAt logic
    let publishedAt = currentPost.publishedAt

    if (body.published && !currentPost.published) {
      // Publishing for the first time
      publishedAt = new Date()
    } else if (!body.published) {
      // Unpublishing
      publishedAt = null
    }

    // Prepare data for update
    const updateData = {
      title: body.title,
      slug,
      excerpt: body.excerpt || null,
      content: body.content,
      imageUrl: body.imageUrl || null,
      category: body.category || 'general',
      tags: body.tags || null,
      author: body.author || currentPost.author,
      featured: body.featured || false,
      published: body.published || false,
      publishedAt,
      displayOrder: body.displayOrder !== undefined ? body.displayOrder : currentPost.displayOrder
    }

    const newsPost = await prisma.newsPost.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json(newsPost)
  } catch (error) {
    console.error('Error updating news post:', error)

    // Handle unique constraint violation (duplicate slug)
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { error: 'A post with this slug already exists' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update news post' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid post ID' },
        { status: 400 }
      )
    }

    // Check if post exists
    const existingPost = await prisma.newsPost.findUnique({
      where: { id }
    })

    if (!existingPost) {
      return NextResponse.json(
        { error: 'News post not found' },
        { status: 404 }
      )
    }

    await prisma.newsPost.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'News post deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting news post:', error)
    return NextResponse.json(
      { error: 'Failed to delete news post' },
      { status: 500 }
    )
  }
}