// Hero Service - Business logic for hero content management

import { prisma } from '@/lib/prisma'
import { HeroSettings, HeroPreviewData, SiteSetting } from '../../types/hero.types'

// Cache for hero settings
let heroCache: HeroSettings | null = null
let cacheTimestamp: number = 0
const CACHE_DURATION = 30 * 1000 // 30 seconds

export class HeroService {
  /**
   * Get all hero-related settings
   */
  static async getHeroSettings(): Promise<HeroSettings> {
    // Check cache first
    const now = Date.now()
    if (heroCache && (now - cacheTimestamp) < CACHE_DURATION) {
      return heroCache
    }

    try {
      const heroKeys = [
        'hero_title',
        'hero_subtitle',
        'hero_description',
        'hero_background_image',
        'hero_cta_button_text',
        'hero_cta_button_link',
        'hero_secondary_button_text',
        'hero_secondary_button_link',
        'residents_served',
        'weekly_programs',
        'opening_hours_text',
        'main_hall_capacity'
      ]

      const settings = await prisma.siteSetting.findMany({
        where: {
          key: {
            in: heroKeys
          }
        }
      })

      // Create default hero settings
      const heroSettings: HeroSettings = {
        hero_title: 'Your Organization Name',
        hero_subtitle: 'Serving the community with excellence',
        hero_description: 'We provide outstanding services and programs for our community members.',
        hero_background_image: '/img/hero-bg.jpg',
        hero_cta_button_text: 'Get Started',
        hero_cta_button_link: '/programs',
        hero_secondary_button_text: 'Learn More',
        hero_secondary_button_link: '/about',
        residents_served: '2,000+',
        weekly_programs: '15+',
        opening_hours_text: '7 days',
        main_hall_capacity: '120'
      }

      // Override with database values
      settings.forEach((setting: SiteSetting) => {
        heroSettings[setting.key] = setting.value || ''
      })

      // Update cache
      heroCache = heroSettings
      cacheTimestamp = now

      return heroSettings
    } catch (error) {
      console.error('Error fetching hero settings:', error)
      throw new Error('Failed to fetch hero settings')
    }
  }

  /**
   * Update hero settings
   */
  static async updateHeroSettings(updates: Partial<HeroSettings>): Promise<HeroSettings> {
    try {
      const updatePromises = Object.entries(updates).map(([key, value]) =>
        prisma.siteSetting.upsert({
          where: { key },
          update: {
            value: value?.toString() || '',
            type: this.getFieldType(key),
            description: this.getFieldDescription(key)
          },
          create: {
            key,
            value: value?.toString() || '',
            type: this.getFieldType(key),
            description: this.getFieldDescription(key)
          }
        })
      )

      await Promise.all(updatePromises)

      // Clear cache
      this.clearCache()

      // Return updated settings
      return await this.getHeroSettings()
    } catch (error) {
      console.error('Error updating hero settings:', error)
      throw new Error('Failed to update hero settings')
    }
  }

  /**
   * Get hero data formatted for preview component
   */
  static async getHeroPreviewData(): Promise<HeroPreviewData> {
    const settings = await this.getHeroSettings()

    return {
      title: settings.hero_title || 'Your Organization Name',
      subtitle: settings.hero_subtitle || 'Serving the community with excellence',
      description: settings.hero_description,
      backgroundImage: settings.hero_background_image,
      primaryButton: settings.hero_cta_button_text ? {
        text: settings.hero_cta_button_text,
        link: settings.hero_cta_button_link || '#'
      } : undefined,
      secondaryButton: settings.hero_secondary_button_text ? {
        text: settings.hero_secondary_button_text,
        link: settings.hero_secondary_button_link || '#'
      } : undefined,
      stats: {
        residentsServed: settings.residents_served || '2,000+',
        weeklyPrograms: settings.weekly_programs || '15+',
        openingHours: settings.opening_hours_text || '7 days',
        mainHallCapacity: settings.main_hall_capacity || '120'
      }
    }
  }

  /**
   * Clear hero settings cache
   */
  static clearCache(): void {
    heroCache = null
    cacheTimestamp = 0
  }

  /**
   * Get field type for database storage
   */
  private static getFieldType(key: string): string {
    const imageFields = ['hero_background_image']
    const urlFields = ['hero_cta_button_link', 'hero_secondary_button_link']

    if (imageFields.includes(key)) return 'image'
    if (urlFields.includes(key)) return 'url'
    return 'string'
  }

  /**
   * Get field description for admin interface
   */
  private static getFieldDescription(key: string): string {
    const descriptions: Record<string, string> = {
      hero_title: 'Main headline displayed in the hero section',
      hero_subtitle: 'Supporting subtitle text below the main title',
      hero_description: 'Detailed description text for the hero section',
      hero_background_image: 'Background image URL for the hero section',
      hero_cta_button_text: 'Text for the primary call-to-action button',
      hero_cta_button_link: 'URL/path for the primary CTA button',
      hero_secondary_button_text: 'Text for the secondary button',
      hero_secondary_button_link: 'URL/path for the secondary button',
      residents_served: 'Number of residents/members served',
      weekly_programs: 'Number of weekly programs offered',
      opening_hours_text: 'Operating days display text',
      main_hall_capacity: 'Maximum capacity of main facility'
    }

    return descriptions[key] || 'Hero section setting'
  }

  /**
   * Validate hero settings
   */
  static validateHeroSettings(settings: Partial<HeroSettings>): Record<string, string> {
    const errors: Record<string, string> = {}

    // Validate required fields
    if (settings.hero_title !== undefined && !settings.hero_title.trim()) {
      errors.hero_title = 'Hero title is required'
    }

    if (settings.hero_subtitle !== undefined && !settings.hero_subtitle.trim()) {
      errors.hero_subtitle = 'Hero subtitle is required'
    }

    // Validate URL fields
    const urlFields = ['hero_cta_button_link', 'hero_secondary_button_link']
    urlFields.forEach(field => {
      const value = settings[field]
      if (value && !this.isValidUrl(value)) {
        errors[field] = 'Must be a valid URL or path'
      }
    })

    // Validate text length
    Object.entries(settings).forEach(([key, value]) => {
      if (typeof value === 'string' && value.length > 500) {
        errors[key] = 'Text too long (maximum 500 characters)'
      }
    })

    return errors
  }

  /**
   * Check if a string is a valid URL or path
   */
  private static isValidUrl(value: string): boolean {
    // Allow relative paths
    if (value.startsWith('/')) return true

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
export const getHeroSettings = () => HeroService.getHeroSettings()
export const updateHeroSettings = (updates: Partial<HeroSettings>) =>
  HeroService.updateHeroSettings(updates)
export const getHeroPreviewData = () => HeroService.getHeroPreviewData()
export const clearHeroCache = () => HeroService.clearCache()