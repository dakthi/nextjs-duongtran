/**
 * URL slug generation utilities for News/Blog module
 * Handles slug creation, validation, and uniqueness
 */

/**
 * Generate a URL-friendly slug from a title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    // Replace spaces and special characters with hyphens
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s-]+/g, '-')
    // Remove leading and trailing hyphens
    .replace(/^-+|-+$/g, '')
}

/**
 * Validate slug format
 */
export function isValidSlug(slug: string): boolean {
  if (!slug || slug.length === 0) return false

  // Must be lowercase letters, numbers, and hyphens only
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  return slugPattern.test(slug)
}

/**
 * Generate unique slug by appending timestamp if needed
 */
export function generateUniqueSlug(title: string, existingSlugs: string[] = []): string {
  let baseSlug = generateSlug(title)

  // If base slug is not in use, return it
  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug
  }

  // Append timestamp to make it unique
  const timestamp = Date.now()
  return `${baseSlug}-${timestamp}`
}

/**
 * Clean and optimize slug
 */
export function cleanSlug(slug: string): string {
  return slug
    .toLowerCase()
    .trim()
    // Remove any characters that aren't letters, numbers, or hyphens
    .replace(/[^a-z0-9-]/g, '')
    // Replace multiple consecutive hyphens with single hyphen
    .replace(/-+/g, '-')
    // Remove leading and trailing hyphens
    .replace(/^-+|-+$/g, '')
}

/**
 * Suggest alternative slugs based on title
 */
export function suggestSlugs(title: string, count = 5): string[] {
  const baseSlug = generateSlug(title)
  const suggestions = [baseSlug]

  // Add variations
  const words = title.toLowerCase().split(/\s+/)

  if (words.length > 1) {
    // Use first few words
    for (let i = 2; i <= Math.min(words.length, 4); i++) {
      const shortSlug = words.slice(0, i).join('-')
      suggestions.push(cleanSlug(shortSlug))
    }

    // Use last few words
    for (let i = 2; i <= Math.min(words.length, 3); i++) {
      const endSlug = words.slice(-i).join('-')
      suggestions.push(cleanSlug(endSlug))
    }
  }

  // Remove duplicates and return limited count
  return [...new Set(suggestions)].slice(0, count)
}

/**
 * Extract slug from various input formats
 */
export function extractSlug(input: string): string {
  // If it's a URL, extract the slug part
  try {
    const url = new URL(input)
    const pathParts = url.pathname.split('/').filter(part => part.length > 0)
    if (pathParts.length > 0) {
      return cleanSlug(pathParts[pathParts.length - 1])
    }
  } catch {
    // Not a URL, treat as regular string
  }

  // Clean as regular slug
  return cleanSlug(input)
}

/**
 * Check if slug is reserved/forbidden
 */
export function isReservedSlug(slug: string): boolean {
  const reservedSlugs = [
    // Admin paths
    'admin', 'api', 'auth', 'login', 'logout', 'register',
    // Common pages
    'about', 'contact', 'home', 'index', 'search', 'sitemap',
    'privacy', 'terms', 'help', 'support', 'faq',
    // Technical
    'feed', 'rss', 'xml', 'json', 'robots', 'favicon',
    'assets', 'static', 'public', 'files', 'uploads',
    // News specific
    'news', 'blog', 'posts', 'articles', 'archive', 'category',
    'tag', 'author', 'date', 'year', 'month', 'day',
    // Common words that might cause confusion
    'new', 'edit', 'delete', 'create', 'update', 'view',
    'draft', 'published', 'featured', 'recent', 'popular'
  ]

  return reservedSlugs.includes(slug.toLowerCase())
}

/**
 * Generate SEO-friendly slug with validation
 */
export interface SlugGenerationOptions {
  maxLength?: number
  existingSlugs?: string[]
  allowReserved?: boolean
}

export function generateSEOSlug(
  title: string,
  options: SlugGenerationOptions = {}
): { slug: string; warnings: string[] } {
  const { maxLength = 100, existingSlugs = [], allowReserved = false } = options
  const warnings: string[] = []

  let slug = generateSlug(title)

  // Check if slug is too long
  if (slug.length > maxLength) {
    const words = slug.split('-')
    let truncatedSlug = ''

    for (const word of words) {
      const testSlug = truncatedSlug ? `${truncatedSlug}-${word}` : word
      if (testSlug.length <= maxLength) {
        truncatedSlug = testSlug
      } else {
        break
      }
    }

    slug = truncatedSlug || slug.substring(0, maxLength).replace(/-[^-]*$/, '')
    warnings.push('Slug was truncated to fit length limit')
  }

  // Check for reserved slugs
  if (!allowReserved && isReservedSlug(slug)) {
    slug = `${slug}-post`
    warnings.push('Slug was modified to avoid reserved word')
  }

  // Ensure uniqueness
  if (existingSlugs.includes(slug)) {
    slug = generateUniqueSlug(title, existingSlugs)
    warnings.push('Slug was modified to ensure uniqueness')
  }

  return { slug, warnings }
}

/**
 * Batch slug generation for multiple titles
 */
export function generateSlugsForTitles(titles: string[]): Record<string, string> {
  const slugs: Record<string, string> = {}
  const usedSlugs: string[] = []

  for (const title of titles) {
    const { slug } = generateSEOSlug(title, { existingSlugs: usedSlugs })
    slugs[title] = slug
    usedSlugs.push(slug)
  }

  return slugs
}