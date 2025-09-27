/**
 * Shared TypeScript interfaces for News/Blog Module
 * Use these types across both frontend and backend
 */

// Core NewsPost interface matching the database model
export interface NewsPost {
  id: number
  title: string
  slug: string
  excerpt: string | null
  content: string
  imageUrl: string | null
  category: string
  tags: string | null
  author: string | null
  featured: boolean
  published: boolean
  publishedAt: string | null
  displayOrder: number
  viewCount: number
  createdAt: string
  updatedAt: string
}

// Interface for creating new news posts (without auto-generated fields)
export interface CreateNewsPost {
  title: string
  slug?: string
  excerpt?: string | null
  content: string
  imageUrl?: string | null
  category?: string
  tags?: string | null
  author?: string | null
  featured?: boolean
  published?: boolean
  displayOrder?: number
}

// Interface for updating news posts
export interface UpdateNewsPost {
  title?: string
  slug?: string
  excerpt?: string | null
  content?: string
  imageUrl?: string | null
  category?: string
  tags?: string | null
  author?: string | null
  featured?: boolean
  published?: boolean
  displayOrder?: number
}

// News categories configuration
export interface NewsCategory {
  value: string
  label: string
  color: string
  description: string
}

export const NEWS_CATEGORIES: NewsCategory[] = [
  {
    value: 'general',
    label: 'General',
    color: 'bg-gray-100 text-gray-800',
    description: 'General news and updates'
  },
  {
    value: 'announcement',
    label: 'Announcement',
    color: 'bg-blue-100 text-blue-800',
    description: 'Important announcements and notices'
  },
  {
    value: 'event',
    label: 'Event',
    color: 'bg-purple-100 text-purple-800',
    description: 'Event-related news and updates'
  },
  {
    value: 'update',
    label: 'Update',
    color: 'bg-green-100 text-green-800',
    description: 'System and service updates'
  },
  {
    value: 'notice',
    label: 'Notice',
    color: 'bg-yellow-100 text-yellow-800',
    description: 'Official notices and alerts'
  },
  {
    value: 'community',
    label: 'Community',
    color: 'bg-indigo-100 text-indigo-800',
    description: 'Community-focused content'
  }
]

// API Response types
export interface NewsApiResponse {
  data?: NewsPost | NewsPost[]
  error?: string
  message?: string
}

export interface NewsListResponse extends NewsApiResponse {
  data: NewsPost[]
  pagination?: {
    total: number
    page: number
    limit: number
    hasMore: boolean
  }
}

export interface NewsDetailResponse extends NewsApiResponse {
  data: NewsPost
}

// Search and filtering interfaces
export interface NewsFilters {
  search?: string
  category?: string
  author?: string
  published?: 'all' | 'published' | 'draft'
  featured?: boolean
  dateRange?: {
    start: Date
    end: Date
  }
  tags?: string[]
}

export interface NewsSortOptions {
  sortBy: 'date' | 'title' | 'author' | 'category' | 'views' | 'featured'
  sortOrder: 'asc' | 'desc'
}

export interface NewsSearchParams extends NewsFilters, Partial<NewsSortOptions> {
  limit?: number
  offset?: number
  page?: number
}

// Form validation
export interface NewsValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

export interface NewsFormData extends Partial<CreateNewsPost> {
  // Additional form-specific fields
  publishNow?: boolean
  schedulePublish?: boolean
  scheduledDate?: Date
  notifySubscribers?: boolean
}

// Statistics and analytics
export interface NewsStats {
  totalPosts: number
  publishedPosts: number
  draftPosts: number
  featuredPosts: number
  totalViews: number
  categoryCounts: Record<string, number>
  authorCounts: Record<string, number>
  popularPosts: NewsPost[]
  recentPosts: NewsPost[]
}

export interface NewsMetrics {
  postId: number
  title: string
  slug: string
  views: number
  publishedAt: string | null
  category: string
  author: string | null
}

// Bulk operations
export interface BulkNewsOperation {
  action: 'delete' | 'publish' | 'unpublish' | 'feature' | 'unfeature' | 'updateCategory'
  postIds: number[]
  metadata?: {
    category?: string
    author?: string
  }
}

export interface BulkOperationResponse {
  success: boolean
  processed: number
  failed: number
  errors?: string[]
}

// Comment system (if implementing comments)
export interface NewsComment {
  id: number
  postId: number
  author: string
  email: string
  content: string
  approved: boolean
  parentId: number | null
  createdAt: string
  updatedAt: string
}

export interface CreateNewsComment {
  postId: number
  author: string
  email: string
  content: string
  parentId?: number | null
}

// SEO and meta data
export interface NewsMetaData {
  title: string
  description: string
  keywords?: string[]
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogType?: string
  twitterCard?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  canonicalUrl?: string
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
}

// Newsletter/subscription related
export interface NewsletterPost {
  postId: number
  title: string
  excerpt: string
  url: string
  imageUrl?: string
  publishedAt: string
  category: string
}

export interface NewsletterTemplate {
  subject: string
  posts: NewsletterPost[]
  customContent?: string
}

// Archive and pagination
export interface NewsArchive {
  year: number
  month: number
  count: number
  posts?: NewsPost[]
}

export interface NewsPagination {
  currentPage: number
  totalPages: number
  totalPosts: number
  hasNext: boolean
  hasPrevious: boolean
  nextPage?: number
  previousPage?: number
}

// RSS/Feed related
export interface NewsFeedItem {
  title: string
  link: string
  description: string
  pubDate: string
  author?: string
  category?: string
  guid: string
}

export interface NewsFeed {
  title: string
  description: string
  link: string
  language: string
  lastBuildDate: string
  items: NewsFeedItem[]
}

// Import/Export
export interface NewsExportData {
  posts: NewsPost[]
  categories?: NewsCategory[]
  exportDate: string
  version: string
}

export interface NewsImportResult {
  imported: number
  skipped: number
  errors: string[]
  warnings: string[]
}

// Configuration for the news module
export interface NewsModuleConfig {
  enableComments: boolean
  enableNewsletter: boolean
  enableRSS: boolean
  enableSEO: boolean
  enableAnalytics: boolean
  postsPerPage: number
  excerptLength: number
  allowedImageTypes: string[]
  maxImageSize: number
  defaultCategory: string
  requireApproval: boolean
  enableFeaturedImages: boolean
  enableTags: boolean
  enableAuthor: boolean
  dateFormat: string
  timezone: string
}

// Error handling
export interface NewsError extends Error {
  code?: string
  field?: string
  details?: Record<string, unknown>
}