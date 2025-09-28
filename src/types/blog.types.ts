export interface BlogPostRecord {
  id: string
  slug: string
  title: string
  excerpt: string | null
  content: string
  image: string | null
  category: string | null
  quote: string | null
  readingTime: number | null
  publishedDate: string | null
  clientName: string | null
  clientAge: number | null
  clientJob: string | null
  clientImage: string | null
  expertName: string | null
  expertTitle: string | null
  expertImage: string | null
  isFeatured: boolean
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}

export interface BlogPostInput {
  id?: string
  slug: string
  title: string
  excerpt?: string | null
  content: string
  image?: string | null
  category?: string | null
  quote?: string | null
  readingTime?: number | null
  publishedDate?: string | null
  clientName?: string | null
  clientAge?: number | null
  clientJob?: string | null
  clientImage?: string | null
  expertName?: string | null
  expertTitle?: string | null
  expertImage?: string | null
  isFeatured?: boolean
  isPublished?: boolean
}

export interface BlogPostSummary {
  id: string
  slug: string
  title: string
  excerpt: string | null
  category: string | null
  quote: string | null
  image: string | null
  readingTime: number | null
  publishedDate: string | null
  isFeatured: boolean
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}

export interface BlogPostView extends BlogPostRecord {
  contentHtml: string
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

export interface BlogValidationErrors {
  [field: string]: string
}
