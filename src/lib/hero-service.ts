// Hero Service adapted for existing HeroContent model

import { prisma } from '@/lib/prisma'
import { HeroData, HeroPreviewData } from '@/types/hero.types'
import { isDatabaseAvailable } from '@/lib/build-config'

// Cache for hero data - now locale-specific
const heroCache: Map<string, { data: HeroData | null; timestamp: number }> = new Map()
const CACHE_DURATION = 30 * 1000 // 30 seconds

export class HeroService {
  /**
   * Get active hero content for a specific locale
   */
  static async getHeroData(locale: string = 'en'): Promise<HeroData | null> {
    if (!isDatabaseAvailable()) {
      console.warn('Database not available during build time, returning null for hero data')
      return null
    }

    // Check cache first (locale-specific)
    const now = Date.now()
    const cached = heroCache.get(locale)
    if (cached && (now - cached.timestamp) < CACHE_DURATION) {
      return cached.data
    }

    try {
      const heroContent = await prisma.heroContent.findFirst({
        where: {
          isActive: true,
          locale: locale
        },
        orderBy: { updatedAt: 'desc' }
      })

      // Update cache for this locale
      heroCache.set(locale, { data: heroContent, timestamp: now })

      return heroContent
    } catch (error) {
      console.warn('Database error, returning null for hero data:', error)
      // Return null instead of throwing error when no data exists
      return null
    }
  }

  /**
   * Update hero content for a specific locale
   */
  static async updateHeroData(data: Partial<HeroData>, locale: string = 'en'): Promise<HeroData> {
    try {
      let heroContent

      if (data.id) {
        // Update existing content
        heroContent = await prisma.heroContent.update({
          where: { id: data.id },
          data: {
            title: data.title,
            subtitle: data.subtitle,
            description: data.description,
            ctaText: data.ctaText,
            ctaLink: data.ctaLink,
            image: data.image,
            imagePosition: data.imagePosition,
            imageZoom: data.imageZoom,
            imageFit: data.imageFit,
            locale: locale
          }
        })
      } else {
        // Deactivate existing active content for this locale
        await prisma.heroContent.updateMany({
          where: {
            isActive: true,
            locale: locale
          },
          data: { isActive: false }
        })

        // Create new content
        heroContent = await prisma.heroContent.create({
          data: {
            title: data.title || 'Untitled',
            subtitle: data.subtitle,
            description: data.description,
            ctaText: data.ctaText,
            ctaLink: data.ctaLink,
            image: data.image,
            imagePosition: data.imagePosition,
            imageZoom: data.imageZoom,
            imageFit: data.imageFit,
            locale: locale,
            isActive: true
          }
        })
      }

      // Clear cache for this locale
      this.clearCache(locale)

      return heroContent
    } catch (error) {
      console.error('Error updating hero data:', error)
      throw new Error('Failed to update hero data')
    }
  }

  /**
   * Generate preview data from form input
   */
  static generatePreviewData(formData: Partial<HeroData>): HeroPreviewData {
    return {
      title: formData.title || 'Your Title Here',
      subtitle: formData.subtitle ?? undefined,
      description: formData.description ?? undefined,
      image: formData.image ?? undefined,
      ctaText: formData.ctaText ?? undefined,
      ctaLink: formData.ctaLink ?? '#'
    }
  }

  /**
   * Clear hero data cache (optionally for a specific locale)
   */
  static clearCache(locale?: string): void {
    if (locale) {
      heroCache.delete(locale)
    } else {
      heroCache.clear()
    }
  }

  /**
   * Validate hero data
   */
  static validateHeroData(data: Partial<HeroData>): Record<string, string> {
    const errors: Record<string, string> = {}

    // Validate required fields
    if (!data.title || !data.title.trim()) {
      errors.title = 'Title is required'
    }

    // Validate text length
    if (data.title && data.title.length > 200) {
      errors.title = 'Title too long (maximum 200 characters)'
    }

    if (data.subtitle && data.subtitle.length > 300) {
      errors.subtitle = 'Subtitle too long (maximum 300 characters)'
    }

    if (data.description && data.description.length > 500) {
      errors.description = 'Description too long (maximum 500 characters)'
    }

    if (data.ctaText && data.ctaText.length > 50) {
      errors.ctaText = 'CTA text too long (maximum 50 characters)'
    }

    // Validate URL
    if (data.ctaLink && !this.isValidUrl(data.ctaLink)) {
      errors.ctaLink = 'Must be a valid URL or path'
    }

    return errors
  }

  /**
   * Check if a string is a valid URL or path
   */
  private static isValidUrl(value: string): boolean {
    // Allow relative paths
    if (value.startsWith('/')) return true

    // Allow hash links
    if (value.startsWith('#')) return true

    // Allow full URLs
    try {
      new URL(value)
      return true
    } catch {
      return false
    }
  }
}

// Export convenience functions
export const getHeroData = (locale?: string) => HeroService.getHeroData(locale)
export const updateHeroData = (data: Partial<HeroData>, locale?: string) => HeroService.updateHeroData(data, locale)
export const generatePreviewData = (formData: Partial<HeroData>) => HeroService.generatePreviewData(formData)
export const clearHeroCache = () => HeroService.clearCache()
