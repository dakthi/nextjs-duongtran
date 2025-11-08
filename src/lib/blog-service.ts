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

const mapPrismaPost = (post: PrismaBlogPost): BlogPostRecord => {
  const mapped: any = {
    id: post.id,
    locale: post.locale,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    image: post.image,
    imagePosition: post.imagePosition,
    imageZoom: post.imageZoom,
    imageFit: post.imageFit,
    category: post.category,
    quote: post.quote,
    readingTime: post.readingTime,
    publishedDate: post.publishedDate,
    clientName: post.clientName,
    clientAge: post.clientAge,
    clientJob: post.clientJob,
    clientImage: post.clientImage,
    clientImagePosition: post.clientImagePosition,
    clientImageZoom: post.clientImageZoom,
    clientImageFit: post.clientImageFit,
    expertName: post.expertName,
    expertTitle: post.expertTitle,
    expertImage: post.expertImage,
    expertImagePosition: post.expertImagePosition,
    expertImageZoom: post.expertImageZoom,
    expertImageFit: post.expertImageFit,
    isFeatured: post.isFeatured,
    isPublished: post.isPublished,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  }

  // Include contentJson and contentHtml if they exist (for admin)
  if ((post as any).contentJson !== undefined) {
    mapped.contentJson = (post as any).contentJson
  }
  if ((post as any).contentHtml !== undefined) {
    mapped.contentHtml = (post as any).contentHtml
  }

  return mapped
}

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

  static async listAllPosts(locale?: string): Promise<BlogPostRecord[]> {
    if (!isDatabaseAvailable()) {
      console.warn('Database not available during build time, returning empty posts list')
      return []
    }

    const now = Date.now()

    if (allPostsCache && this.isCacheFresh(cacheTimestamp) && !locale) {
      return allPostsCache
    }

    try {
      const posts = await prisma.blogPost.findMany({
        where: locale ? { locale } : undefined,
        orderBy: [{ createdAt: 'desc' }],
      })

      const mappedPosts = posts.map(mapPrismaPost)

      // Only cache if no locale filter (for backwards compatibility)
      if (!locale) {
        allPostsCache = mappedPosts
        cacheTimestamp = now
      }

      return mappedPosts
    } catch (error) {
      console.warn('Database error, returning empty posts list:', error)
      return []
    }
  }

  static async getPostBySlug(slug: string, includeDraft = false, locale = 'en'): Promise<BlogPostRecord | null> {
    if (!isDatabaseAvailable()) {
      console.warn('Database not available during build time, returning null for post:', slug)
      return null
    }

    const cacheKey = `slug:${slug}:draft:${includeDraft}:locale:${locale}`
    const cached = postCache.get(cacheKey)
    if (cached && this.isCacheFresh(cached.timestamp)) {
      return cached.data
    }

    try {
      const post = await prisma.blogPost.findFirst({
        where: {
          slug,
          locale,
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
      locale: input.locale,
      slug: input.slug.trim(),
      title: input.title.trim(),
      excerpt: input.excerpt?.trim() ?? null,
      content: input.content,
      contentJson: (input as any).contentJson ?? null,
      contentHtml: (input as any).contentHtml ?? null,
      image: input.image?.trim() ?? null,
      imagePosition: input.imagePosition ?? 'center',
      imageZoom: input.imageZoom ?? 100,
      imageFit: input.imageFit ?? 'cover',
      category: input.category?.trim() ?? null,
      quote: input.quote?.trim() ?? null,
      readingTime: input.readingTime ?? null,
      publishedDate: input.publishedDate?.trim() ?? null,
      clientName: input.clientName?.trim() ?? null,
      clientAge: input.clientAge ?? null,
      clientJob: input.clientJob?.trim() ?? null,
      clientImage: input.clientImage?.trim() ?? null,
      clientImagePosition: input.clientImagePosition ?? 'center',
      clientImageZoom: input.clientImageZoom ?? 100,
      clientImageFit: input.clientImageFit ?? 'cover',
      expertName: input.expertName?.trim() ?? null,
      expertTitle: input.expertTitle?.trim() ?? null,
      expertImage: input.expertImage?.trim() ?? null,
      expertImagePosition: input.expertImagePosition ?? 'center',
      expertImageZoom: input.expertImageZoom ?? 100,
      expertImageFit: input.expertImageFit ?? 'cover',
      isFeatured: input.isFeatured ?? false,
      isPublished: input.isPublished ?? true,
    }

    const post = input.id
      ? await prisma.blogPost.update({
          where: { id: input.id },
          data,
        })
      : await prisma.blogPost.upsert({
          where: {
            locale_slug: {
              locale: input.locale,
              slug: input.slug.trim()
            }
          },
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
    let contentHtml: string

    // Priority 1: Use pre-rendered contentHtml from database if it exists
    if ((post as any).contentHtml && (post as any).contentHtml.trim()) {
      contentHtml = (post as any).contentHtml
    }
    // Priority 2: Check if content is already HTML (from TipTap editor)
    else if (post.content.trim().startsWith('<')) {
      contentHtml = post.content
    }
    // Priority 3: Content is markdown, process it
    else {
      const processed = await remark()
        .use(remarkGfm)
        .use(html)
        .process(post.content)
      contentHtml = processed.toString()
    }

    return {
      ...post,
      contentHtml,
      client: post.clientName || post.clientJob || post.clientImage || post.clientAge !== null
        ? {
            name: post.clientName,
            age: post.clientAge,
            job: post.clientJob,
            image: post.clientImage,
            imagePosition: post.clientImagePosition,
            imageZoom: post.clientImageZoom,
            imageFit: post.clientImageFit,
          }
        : undefined,
      expert: post.expertName || post.expertTitle || post.expertImage
        ? {
            name: post.expertName,
            title: post.expertTitle,
            image: post.expertImage,
            imagePosition: post.expertImagePosition,
            imageZoom: post.expertImageZoom,
            imageFit: post.expertImageFit,
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
export const listAllPosts = (locale?: string) => BlogService.listAllPosts(locale)
export const getBlogPostBySlug = (slug: string, includeDraft = false, locale = 'en') => BlogService.getPostBySlug(slug, includeDraft, locale)
export const getBlogPostById = (id: string) => BlogService.getPostById(id)
export const upsertBlogPost = (input: BlogPostInput) => BlogService.upsertPost(input)
export const deleteBlogPost = (id: string) => BlogService.deletePost(id)
export const renderBlogPost = (post: BlogPostRecord) => BlogService.toView(post)
export const blogPostToSummary = (post: BlogPostRecord) => BlogService.toSummary(post)
export const validateBlogPost = (input: BlogPostInput) => BlogService.validatePost(input)
