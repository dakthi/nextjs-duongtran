import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'

import {
  getBlogPostBySlug,
  listPublishedPosts,
  renderBlogPost
} from '@/lib/blog-service'
import { optionalLegacyMediaUrl } from '@/lib/media/media-client'
import type { BlogPostRecord, BlogPostView } from '@/types/blog.types'

const postsDirectory = path.join(process.cwd(), 'src/content/posts')

export interface PostSummary {
  slug: string
  title: string
  image?: string | null
  date?: string | null
  readingTime?: number | null
  category?: string | null
  quote?: string | null
}

export interface Post extends PostSummary {
  content: string
  client?: {
    name: string | null
    age: number | null
    job: string | null
    image: string | null
  }
  expert?: {
    name: string | null
    title: string | null
    image: string | null
  }
}

const mapViewToPost = (view: BlogPostView): Post => ({
  slug: view.slug,
  title: view.title,
  image: optionalLegacyMediaUrl(view.image ?? undefined) ?? view.image,
  date: view.publishedDate,
  readingTime: view.readingTime,
  category: view.category,
  quote: view.quote,
  content: view.contentHtml,
  client: view.client
    ? {
        name: view.client.name,
        age: view.client.age,
        job: view.client.job,
        image: optionalLegacyMediaUrl(view.client.image ?? undefined) ?? view.client.image,
      }
    : undefined,
  expert: view.expert
    ? {
        name: view.expert.name,
        title: view.expert.title,
        image: optionalLegacyMediaUrl(view.expert.image ?? undefined) ?? view.expert.image,
      }
    : undefined,
})

const mapRecordToSummary = (record: BlogPostRecord): PostSummary => ({
  slug: record.slug,
  title: record.title,
  image: optionalLegacyMediaUrl(record.image ?? undefined) ?? record.image,
  date: record.publishedDate,
  readingTime: record.readingTime,
  category: record.category,
  quote: record.quote,
})

const getLocalPostSlugs = (): string[] => {
  if (!fs.existsSync(postsDirectory)) return []
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.md'))
}

const getLocalPostBySlug = async (slug: string): Promise<Post | null> => {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = path.join(postsDirectory, `${realSlug}.md`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const parsed = matter(fileContents)
  const { data, content } = parsed

  if (typeof data.title !== 'string') {
    throw new Error(`Post "${slug}" is missing a valid "title" in its frontmatter.`)
  }

  const processedContent = await remark()
    .use(remarkGfm)
    .use(html)
    .process(content)

  const contentHtml = processedContent.toString()

  const client = data.client
    ? {
        name: data.client.name ?? null,
        age: data.client.age ?? null,
        job: data.client.job ?? null,
        image: optionalLegacyMediaUrl(data.client.image) ?? data.client.image ?? null,
      }
    : undefined

  const expert = data.expert
    ? {
        name: data.expert.name ?? null,
        title: data.expert.title ?? null,
        image: optionalLegacyMediaUrl(data.expert.image) ?? data.expert.image ?? null,
      }
    : undefined

  return {
    slug: realSlug,
    title: data.title,
    content: contentHtml,
    image: optionalLegacyMediaUrl(data.image) ?? data.image ?? null,
    date: data.date ?? null,
    readingTime: data.readingTime ?? null,
    category: data.category ?? null,
    quote: data.quote ?? null,
    client,
    expert,
  }
}

export async function getPostSlugs(): Promise<string[]> {
  const posts = await listPublishedPosts()
  if (posts.length > 0) {
    return posts.map((post) => post.slug)
  }

  return getLocalPostSlugs().map((slug) => slug.replace(/\.md$/, ''))
}

export async function getPostSummaries(): Promise<PostSummary[]> {
  const posts = await listPublishedPosts()
  if (posts.length > 0) {
    return posts.map((post) => mapRecordToSummary(post))
  }

  const localSlugs = getLocalPostSlugs()
  const fallbackPosts = await Promise.all(localSlugs.map((slug) => getLocalPostBySlug(path.basename(slug, '.md'))))
  return fallbackPosts.filter(Boolean).map((post) => ({
    slug: post!.slug,
    title: post!.title,
    image: post!.image,
    date: post!.date,
    readingTime: post!.readingTime != null ? Number(post!.readingTime) || null : null,
    category: post!.category,
    quote: post!.quote,
  }))
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const record = await getBlogPostBySlug(slug)

  if (record) {
    const view = await renderBlogPost(record)
    return mapViewToPost(view)
  }

  const fallback = await getLocalPostBySlug(slug)
  if (fallback) return fallback

  throw new Error(`Post with slug "${slug}" not found`)
}
