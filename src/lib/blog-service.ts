import { prisma } from '@/lib/prisma'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'
import type { BlogPost as PrismaBlogPost } from '@prisma/client'
import { isDatabaseAvailable } from '@/lib/build-config'

import type {
  BlogPostInput,
  BlogPostRecord,
  BlogPostSummary,
  BlogPostView,
  BlogValidationErrors
} from '@/types/blog.types'

const CACHE_DURATION = 30_000 // 30 seconds

let publishedCache: BlogPostRecord[] | null = null
let allPostsCache: BlogPostRecord[] | null = null
let cacheTimestamp = 0
const postCache = new Map<string, { data: BlogPostRecord; timestamp: number }>()

const mapPrismaPost = (post: PrismaBlogPost): BlogPostRecord => ({
  id: post.id,
  slug: post.slug,
  title: post.title,
  excerpt: post.excerpt,
  content: post.content,
  image: post.image,
  category: post.category,
  quote: post.quote,
  readingTime: post.readingTime,
  publishedDate: post.publishedDate,
  clientName: post.clientName,
  clientAge: post.clientAge,
  clientJob: post.clientJob,
  clientImage: post.clientImage,
  expertName: post.expertName,
  expertTitle: post.expertTitle,
  expertImage: post.expertImage,
  isFeatured: post.isFeatured,
  isPublished: post.isPublished,
  createdAt: post.createdAt,
  updatedAt: post.updatedAt,
})

export class BlogService {
  static clearCache(): void {
    publishedCache = null
    allPostsCache = null
    cacheTimestamp = 0
    postCache.clear()
  }

  private static isCacheFresh(timestamp: number): boolean {
    return Date.now() - timestamp < CACHE_DURATION
  }

  static async listPublishedPosts(): Promise<BlogPostRecord[]> {
    if (!isDatabaseAvailable()) {
      console.warn('Database not available during build time, returning empty posts list')
      return []
    }

    const now = Date.now()

    if (publishedCache && this.isCacheFresh(cacheTimestamp)) {
      return publishedCache
    }

    try {
      const posts = await prisma.blogPost.findMany({
        where: { isPublished: true },
        orderBy: [{ isFeatured: 'desc' }, { publishedDate: 'desc' }, { createdAt: 'desc' }],
      })

      publishedCache = posts.map(mapPrismaPost)
      cacheTimestamp = now

      return publishedCache
    } catch (error) {
      console.warn('Database error, returning empty posts list:', error)
      return []
    }
  }

  static async listAllPosts(): Promise<BlogPostRecord[]> {
    const now = Date.now()

    if (allPostsCache && this.isCacheFresh(cacheTimestamp)) {
      return allPostsCache
    }

    const posts = await prisma.blogPost.findMany({
      orderBy: [{ createdAt: 'desc' }],
    })

    allPostsCache = posts.map(mapPrismaPost)
    cacheTimestamp = now

    return allPostsCache
  }

  static async getPostBySlug(slug: string, includeDraft = false): Promise<BlogPostRecord | null> {
    if (!isDatabaseAvailable()) {
      console.warn('Database not available during build time, returning null for post:', slug)
      return null
    }

    const cacheKey = `slug:${slug}:draft:${includeDraft}`
    const cached = postCache.get(cacheKey)
    if (cached && this.isCacheFresh(cached.timestamp)) {
      return cached.data
    }

    try {
      const post = await prisma.blogPost.findFirst({
        where: {
          slug,
          ...(includeDraft ? {} : { isPublished: true })
        }
      })

      if (!post) return null

      const mapped = mapPrismaPost(post)
      postCache.set(cacheKey, { data: mapped, timestamp: Date.now() })
      return mapped
    } catch (error) {
      console.warn('Database error, returning null for post:', slug, error)
      return null
    }
  }

  static async getPostById(id: string): Promise<BlogPostRecord | null> {
    const cacheKey = `id:${id}`
    const cached = postCache.get(cacheKey)
    if (cached && this.isCacheFresh(cached.timestamp)) {
      return cached.data
    }

    const post = await prisma.blogPost.findUnique({ where: { id } })
    if (!post) return null

    const mapped = mapPrismaPost(post)
    postCache.set(cacheKey, { data: mapped, timestamp: Date.now() })
    return mapped
  }

  static async upsertPost(input: BlogPostInput): Promise<BlogPostRecord> {
    const validationErrors = this.validatePost(input)
    if (Object.keys(validationErrors).length > 0) {
      const error = new Error('Validation failed') as Error & { validationErrors?: BlogValidationErrors }
      error.validationErrors = validationErrors
      throw error
    }

    const data = {
      slug: input.slug.trim(),
      title: input.title.trim(),
      excerpt: input.excerpt?.trim() ?? null,
      content: input.content,
      image: input.image?.trim() ?? null,
      category: input.category?.trim() ?? null,
      quote: input.quote?.trim() ?? null,
      readingTime: input.readingTime ?? null,
      publishedDate: input.publishedDate?.trim() ?? null,
      clientName: input.clientName?.trim() ?? null,
      clientAge: input.clientAge ?? null,
      clientJob: input.clientJob?.trim() ?? null,
      clientImage: input.clientImage?.trim() ?? null,
      expertName: input.expertName?.trim() ?? null,
      expertTitle: input.expertTitle?.trim() ?? null,
      expertImage: input.expertImage?.trim() ?? null,
      isFeatured: input.isFeatured ?? false,
      isPublished: input.isPublished ?? true,
    }

    const post = input.id
      ? await prisma.blogPost.update({
          where: { id: input.id },
          data,
        })
      : await prisma.blogPost.upsert({
          where: { slug: input.slug.trim() },
          update: data,
          create: data,
        })

    this.clearCache()

    return mapPrismaPost(post)
  }

  static async deletePost(id: string): Promise<void> {
    await prisma.blogPost.delete({ where: { id } })
    this.clearCache()
  }

  static async toView(post: BlogPostRecord): Promise<BlogPostView> {
    const processed = await remark()
      .use(remarkGfm)
      .use(html)
      .process(post.content)

    const contentHtml = processed.toString()

    return {
      ...post,
      contentHtml,
      client: post.clientName || post.clientJob || post.clientImage || post.clientAge !== null
        ? {
            name: post.clientName,
            age: post.clientAge,
            job: post.clientJob,
            image: post.clientImage,
          }
        : undefined,
      expert: post.expertName || post.expertTitle || post.expertImage
        ? {
            name: post.expertName,
            title: post.expertTitle,
            image: post.expertImage,
          }
        : undefined,
    }
  }

  static toSummary(post: BlogPostRecord): BlogPostSummary {
    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      quote: post.quote,
      image: post.image,
      readingTime: post.readingTime,
      publishedDate: post.publishedDate,
      isFeatured: post.isFeatured,
      isPublished: post.isPublished,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }
  }

  static validatePost(input: BlogPostInput): BlogValidationErrors {
    const errors: BlogValidationErrors = {}

    if (!input.slug || !input.slug.trim()) {
      errors.slug = 'Slug is required'
    } else if (!/^[a-z0-9-]+$/.test(input.slug.trim())) {
      errors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens'
    }

    if (!input.title || !input.title.trim()) {
      errors.title = 'Title is required'
    }

    if (!input.content || !input.content.trim()) {
      errors.content = 'Content cannot be empty'
    }

    if (input.readingTime != null) {
      if (Number.isNaN(Number(input.readingTime)) || Number(input.readingTime) < 0) {
        errors.readingTime = 'Reading time must be a positive number'
      }
    }

    return errors
  }
}

export const listPublishedPosts = () => BlogService.listPublishedPosts()
export const listAllPosts = () => BlogService.listAllPosts()
export const getBlogPostBySlug = (slug: string, includeDraft = false) => BlogService.getPostBySlug(slug, includeDraft)
export const getBlogPostById = (id: string) => BlogService.getPostById(id)
export const upsertBlogPost = (input: BlogPostInput) => BlogService.upsertPost(input)
export const deleteBlogPost = (id: string) => BlogService.deletePost(id)
export const renderBlogPost = (post: BlogPostRecord) => BlogService.toView(post)
export const blogPostToSummary = (post: BlogPostRecord) => BlogService.toSummary(post)
export const validateBlogPost = (input: BlogPostInput) => BlogService.validatePost(input)
