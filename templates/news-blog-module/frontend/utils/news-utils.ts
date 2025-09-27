/**
 * Client-side utilities for News/Blog module
 * Handles formatting, validation, and helper functions
 */

export interface CategoryConfig {
  label: string
  color: string
  description: string
}

export const NEWS_CATEGORIES: Record<string, CategoryConfig> = {
  general: {
    label: 'General',
    color: 'bg-gray-100 text-gray-800',
    description: 'General news and updates'
  },
  announcement: {
    label: 'Announcement',
    color: 'bg-blue-100 text-blue-800',
    description: 'Important announcements and notices'
  },
  event: {
    label: 'Event',
    color: 'bg-purple-100 text-purple-800',
    description: 'Event-related news and updates'
  },
  update: {
    label: 'Update',
    color: 'bg-green-100 text-green-800',
    description: 'System and service updates'
  },
  notice: {
    label: 'Notice',
    color: 'bg-yellow-100 text-yellow-800',
    description: 'Official notices and alerts'
  },
  community: {
    label: 'Community',
    color: 'bg-indigo-100 text-indigo-800',
    description: 'Community-focused content'
  }
}

/**
 * Get category configuration with fallback
 */
export function getCategoryConfig(category: string): CategoryConfig {
  return NEWS_CATEGORIES[category] || NEWS_CATEGORIES['general']
}

/**
 * Get category color class
 */
export function getCategoryColor(category: string): string {
  return getCategoryConfig(category).color
}

/**
 * Format date for display
 */
export function formatDate(dateString: string | Date, options?: {
  locale?: string
  format?: 'short' | 'long' | 'relative'
}): string {
  const date = new Date(dateString)
  const locale = options?.locale || 'en-GB'

  if (options?.format === 'relative') {
    return formatRelativeDate(date)
  }

  if (options?.format === 'short') {
    return date.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  // Default long format
  return date.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

/**
 * Format relative date (e.g., "2 hours ago", "3 days ago")
 */
export function formatRelativeDate(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return 'Just now'
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
  }

  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`
  }

  const diffInYears = Math.floor(diffInMonths / 12)
  return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number, addEllipsis = true): string {
  if (text.length <= maxLength) return text

  const truncated = text.substring(0, maxLength).trim()
  return addEllipsis ? `${truncated}...` : truncated
}

/**
 * Extract excerpt from content if not provided
 */
export function generateExcerpt(content: string, maxLength = 160): string {
  // Remove HTML tags if present
  const textContent = content.replace(/<[^>]*>/g, '')

  // Get first paragraph or truncate
  const firstParagraph = textContent.split('\n')[0] || ''

  if (firstParagraph.length <= maxLength) {
    return firstParagraph.trim()
  }

  return truncateText(firstParagraph, maxLength)
}

/**
 * Parse and format tags
 */
export function parseTags(tagString: string | null): string[] {
  if (!tagString) return []

  return tagString
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0)
}

/**
 * Format tags for display
 */
export function formatTags(tags: string[]): string {
  return tags.join(', ')
}

/**
 * Calculate reading time
 */
export function calculateReadingTime(content: string): { minutes: number; text: string } {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)

  return {
    minutes,
    text: `${minutes} min read`
  }
}

/**
 * Validate news post data
 */
export interface NewsValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

export function validateNewsPost(data: {
  title?: string
  content?: string
  category?: string
  slug?: string
}): NewsValidationResult {
  const errors: Record<string, string> = {}

  if (!data.title || data.title.trim().length === 0) {
    errors.title = 'Title is required'
  } else if (data.title.length > 200) {
    errors.title = 'Title must be less than 200 characters'
  }

  if (!data.content || data.content.trim().length === 0) {
    errors.content = 'Content is required'
  } else if (data.content.length < 50) {
    errors.content = 'Content must be at least 50 characters'
  }

  if (data.category && !NEWS_CATEGORIES[data.category]) {
    errors.category = 'Invalid category selected'
  }

  if (data.slug) {
    const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
    if (!slugPattern.test(data.slug)) {
      errors.slug = 'Slug must contain only lowercase letters, numbers, and hyphens'
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

/**
 * Search/filter utilities
 */
export function filterNewsPosts<T extends { title: string; content: string; excerpt?: string | null; tags?: string | null; category: string; published: boolean }>(
  posts: T[],
  filters: {
    search?: string
    category?: string
    published?: 'all' | 'published' | 'draft'
  }
): T[] {
  return posts.filter(post => {
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      const searchableText = [
        post.title,
        post.content,
        post.excerpt || '',
        post.tags || ''
      ].join(' ').toLowerCase()

      if (!searchableText.includes(searchTerm)) {
        return false
      }
    }

    // Category filter
    if (filters.category && filters.category !== 'all') {
      if (post.category !== filters.category) {
        return false
      }
    }

    // Published filter
    if (filters.published && filters.published !== 'all') {
      if (filters.published === 'published' && !post.published) {
        return false
      }
      if (filters.published === 'draft' && post.published) {
        return false
      }
    }

    return true
  })
}

/**
 * Sort news posts
 */
export function sortNewsPosts<T extends { featured: boolean; publishedAt: string | null; createdAt: string; displayOrder: number }>(
  posts: T[],
  sortBy: 'date' | 'featured' | 'order' = 'date'
): T[] {
  return [...posts].sort((a, b) => {
    switch (sortBy) {
      case 'featured':
        // Featured first, then by date
        if (a.featured !== b.featured) {
          return a.featured ? -1 : 1
        }
        return new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime()

      case 'order':
        // By display order, then by date
        if (a.displayOrder !== b.displayOrder) {
          return a.displayOrder - b.displayOrder
        }
        return new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime()

      case 'date':
      default:
        return new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime()
    }
  })
}

/**
 * SEO utilities
 */
export function generateMetaTags(post: {
  title: string
  excerpt?: string | null
  content: string
  imageUrl?: string | null
  author?: string | null
  publishedAt?: string | null
}) {
  return {
    title: post.title,
    description: post.excerpt || generateExcerpt(post.content),
    image: post.imageUrl,
    author: post.author,
    publishedTime: post.publishedAt,
    type: 'article'
  }
}