export interface BlogPostRecord {
  id: string
  locale: string
  slug: string
  title: string
  excerpt: string | null
  content: string
  image: string | null
  imagePosition: string | null
  imageZoom: number | null
  imageFit: string | null
  category: string | null
  quote: string | null
  readingTime: number | null
  publishedDate: string | null
  clientName: string | null
  clientAge: number | null
  clientJob: string | null
  clientImage: string | null
  clientImagePosition: string | null
  clientImageZoom: number | null
  clientImageFit: string | null
  expertName: string | null
  expertTitle: string | null
  expertImage: string | null
  expertImagePosition: string | null
  expertImageZoom: number | null
  expertImageFit: string | null
  isFeatured: boolean
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}

export interface BlogPostInput {
  id?: string
  locale: string
  slug: string
  title: string
  excerpt?: string | null
  content: string
  image?: string | null
  imagePosition?: string | null
  imageZoom?: number | null
  imageFit?: string | null
  category?: string | null
  quote?: string | null
  readingTime?: number | null
  publishedDate?: string | null
  clientName?: string | null
  clientAge?: number | null
  clientJob?: string | null
  clientImage?: string | null
  clientImagePosition?: string | null
  clientImageZoom?: number | null
  clientImageFit?: string | null
  expertName?: string | null
  expertTitle?: string | null
  expertImage?: string | null
  expertImagePosition?: string | null
  expertImageZoom?: number | null
  expertImageFit?: string | null
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
    imagePosition: string | null
    imageZoom: number | null
    imageFit: string | null
  }
  expert?: {
    name: string | null
    title: string | null
    image: string | null
    imagePosition: string | null
    imageZoom: number | null
    imageFit: string | null
  }
}

export interface BlogValidationErrors {
  [field: string]: string
}
