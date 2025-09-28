/**
 * Generate URL-friendly slug from title
 * Handles both English and Vietnamese text
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    // Replace Vietnamese characters with ASCII equivalents
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    // Replace Vietnamese specific characters
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    // Replace spaces and special characters with hyphens
    .replace(/[^a-z0-9]+/g, '-')
    // Remove leading and trailing hyphens
    .replace(/^-+|-+$/g, '')
    // Remove duplicate hyphens
    .replace(/-+/g, '-')
    // Limit length to reasonable URL size
    .substring(0, 100)
    // Remove trailing hyphen if created by substring
    .replace(/-+$/, '')
}

/**
 * Validate slug format
 */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9-]+$/.test(slug) && slug.length > 0 && slug.length <= 100
}

/**
 * Clean existing slug to ensure it meets format requirements
 */
export function cleanSlug(slug: string): string {
  return generateSlug(slug)
}