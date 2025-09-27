/**
 * News/Blog service functions for server-side operations
 * Handles business logic, validation, and database operations
 */

import { prisma } from '@/lib/prisma'
import { NewsPost, CreateNewsPost, UpdateNewsPost } from '../../types/news.types'

/**
 * Generate URL-friendly slug from title
 */
export function generateSlugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Generate unique slug by checking existing slugs
 */
export async function generateUniqueSlug(title: string, existingSlugs: string[] = []): Promise<string> {
  let baseSlug = generateSlugFromTitle(title)

  // If no existing slugs provided, check database
  if (existingSlugs.length === 0) {
    const posts = await prisma.newsPost.findMany({
      select: { slug: true }
    })
    existingSlugs = posts.map(p => p.slug)
  }

  // If base slug is unique, return it
  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug
  }

  // Add timestamp to make it unique
  const timestamp = Date.now()
  return `${baseSlug}-${timestamp}`
}

/**
 * Validate news post data
 */
export interface NewsValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

export function validateNewsPost(data: Partial<CreateNewsPost | UpdateNewsPost>): NewsValidationResult {
  const errors: Record<string, string> = {}

  // Title validation
  if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
    errors.title = 'Title is required'
  } else if (data.title.length > 200) {
    errors.title = 'Title must be less than 200 characters'
  }

  // Content validation
  if (!data.content || typeof data.content !== 'string' || data.content.trim().length === 0) {
    errors.content = 'Content is required'
  } else if (data.content.length < 10) {
    errors.content = 'Content must be at least 10 characters'
  }

  // Category validation
  const validCategories = ['general', 'announcement', 'event', 'update', 'notice', 'community']
  if (data.category && !validCategories.includes(data.category)) {
    errors.category = 'Invalid category'
  }

  // Slug validation (if provided)
  if (data.slug) {
    const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
    if (!slugPattern.test(data.slug)) {
      errors.slug = 'Slug must contain only lowercase letters, numbers, and hyphens'
    } else if (data.slug.length > 100) {
      errors.slug = 'Slug must be less than 100 characters'
    }
  }

  // Display order validation
  if (data.displayOrder !== undefined && (typeof data.displayOrder !== 'number' || data.displayOrder < 0)) {
    errors.displayOrder = 'Display order must be a non-negative number'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

/**
 * Get published news posts for public display
 */
export async function getNews(options: {
  limit?: number
  featured?: boolean
  category?: string
  excludeSlug?: string
} = {}): Promise<NewsPost[]> {
  try {
    if (!process.env.DATABASE_URL) {
      return []
    }

    const where: any = {
      published: true
    }

    if (options.featured !== undefined) {
      where.featured = options.featured
    }

    if (options.category) {
      where.category = options.category
    }

    if (options.excludeSlug) {
      where.slug = { not: options.excludeSlug }
    }

    const news = await prisma.newsPost.findMany({
      where,
      orderBy: [
        { featured: 'desc' },
        { displayOrder: 'asc' },
        { publishedAt: 'desc' },
        { createdAt: 'desc' }
      ],
      take: options.limit
    })

    return news
  } catch (error) {
    console.error('Error fetching news:', error)
    return []
  }
}

/**
 * Get single news post by slug
 */
export async function getNewsPost(slug: string): Promise<NewsPost | null> {
  try {
    if (!process.env.DATABASE_URL) {
      return null
    }

    const post = await prisma.newsPost.findUnique({
      where: { slug }
    })

    return post
  } catch (error) {
    console.error('Error fetching news post:', error)
    return null
  }
}

/**
 * Get related news posts
 */
export async function getRelatedNews(
  category: string,
  currentSlug: string,
  limit: number = 5
): Promise<NewsPost[]> {
  try {
    if (!process.env.DATABASE_URL) {
      return []
    }

    const news = await prisma.newsPost.findMany({
      where: {
        published: true,
        category,
        slug: { not: currentSlug }
      },
      orderBy: [
        { featured: 'desc' },
        { publishedAt: 'desc' },
        { createdAt: 'desc' }
      ],
      take: limit
    })

    return news
  } catch (error) {
    console.error('Error fetching related news:', error)
    return []
  }
}

/**
 * Get news posts by author
 */
export async function getNewsByAuthor(author: string, limit?: number): Promise<NewsPost[]> {
  try {
    if (!process.env.DATABASE_URL) {
      return []
    }

    const news = await prisma.newsPost.findMany({
      where: {
        published: true,
        author
      },
      orderBy: [
        { publishedAt: 'desc' },
        { createdAt: 'desc' }
      ],
      take: limit
    })

    return news
  } catch (error) {
    console.error('Error fetching news by author:', error)
    return []
  }
}

/**
 * Search news posts
 */
export async function searchNews(
  query: string,
  options: {
    category?: string
    publishedOnly?: boolean
    limit?: number
  } = {}
): Promise<NewsPost[]> {
  try {
    if (!process.env.DATABASE_URL) {
      return []
    }

    const where: any = {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { content: { contains: query, mode: 'insensitive' } },
        { excerpt: { contains: query, mode: 'insensitive' } },
        { tags: { contains: query, mode: 'insensitive' } }
      ]
    }

    if (options.publishedOnly !== false) {
      where.published = true
    }

    if (options.category) {
      where.category = options.category
    }

    const news = await prisma.newsPost.findMany({
      where,
      orderBy: [
        { featured: 'desc' },
        { publishedAt: 'desc' },
        { createdAt: 'desc' }
      ],
      take: options.limit
    })

    return news
  } catch (error) {
    console.error('Error searching news:', error)
    return []
  }
}

/**
 * Get news statistics
 */
export async function getNewsStats(): Promise<{
  totalPosts: number
  publishedPosts: number
  draftPosts: number
  featuredPosts: number
  categoryCounts: Record<string, number>
}> {
  try {
    if (!process.env.DATABASE_URL) {
      return {
        totalPosts: 0,
        publishedPosts: 0,
        draftPosts: 0,
        featuredPosts: 0,
        categoryCounts: {}
      }
    }

    const [total, published, featured, categories] = await Promise.all([
      prisma.newsPost.count(),
      prisma.newsPost.count({ where: { published: true } }),
      prisma.newsPost.count({ where: { featured: true } }),
      prisma.newsPost.groupBy({
        by: ['category'],
        _count: { category: true }
      })
    ])

    const categoryCounts: Record<string, number> = {}
    categories.forEach(cat => {
      categoryCounts[cat.category] = cat._count.category
    })

    return {
      totalPosts: total,
      publishedPosts: published,
      draftPosts: total - published,
      featuredPosts: featured,
      categoryCounts
    }
  } catch (error) {
    console.error('Error fetching news stats:', error)
    return {
      totalPosts: 0,
      publishedPosts: 0,
      draftPosts: 0,
      featuredPosts: 0,
      categoryCounts: {}
    }
  }
}

/**
 * Get recent news posts
 */
export async function getRecentNews(limit: number = 10): Promise<NewsPost[]> {
  return getNews({ limit })
}

/**
 * Get featured news posts
 */
export async function getFeaturedNews(limit?: number): Promise<NewsPost[]> {
  return getNews({ featured: true, limit })
}

/**
 * Get news by category
 */
export async function getNewsByCategory(category: string, limit?: number): Promise<NewsPost[]> {
  return getNews({ category, limit })
}

/**
 * Bulk update news posts
 */
export async function bulkUpdateNews(
  postIds: number[],
  updates: Partial<Pick<NewsPost, 'published' | 'featured' | 'category'>>
): Promise<{ updated: number }> {
  try {
    if (!process.env.DATABASE_URL) {
      return { updated: 0 }
    }

    const result = await prisma.newsPost.updateMany({
      where: {
        id: { in: postIds }
      },
      data: updates
    })

    return { updated: result.count }
  } catch (error) {
    console.error('Error bulk updating news:', error)
    return { updated: 0 }
  }
}

/**
 * Generate excerpt from content
 */
export function generateExcerpt(content: string, maxLength: number = 160): string {
  // Remove any HTML tags
  const textContent = content.replace(/<[^>]*>/g, '')

  // Get first paragraph or sentences up to maxLength
  const sentences = textContent.split('.')
  let excerpt = ''

  for (const sentence of sentences) {
    const testExcerpt = excerpt ? `${excerpt}. ${sentence.trim()}` : sentence.trim()
    if (testExcerpt.length <= maxLength) {
      excerpt = testExcerpt
    } else {
      break
    }
  }

  // If we still don't have an excerpt, just truncate
  if (!excerpt || excerpt.length < 20) {
    excerpt = textContent.substring(0, maxLength).trim()
  }

  return excerpt.length < textContent.length ? `${excerpt}...` : excerpt
}