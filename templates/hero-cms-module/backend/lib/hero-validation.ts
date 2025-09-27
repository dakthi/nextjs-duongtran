// Hero Validation - Server-side validation schemas and utilities

import { HeroSettings, HeroValidationSchema } from '../../types/hero.types'

export class HeroValidator {

  // Validation schema for hero settings
  static readonly schema: HeroValidationSchema = {
    hero_title: {
      required: true,
      minLength: 3,
      maxLength: 100,
      custom: (value: string) => {
        if (value.trim().length === 0) return 'Hero title cannot be empty'
        if (value.length > 100) return 'Hero title is too long (maximum 100 characters)'
        return null
      }
    },
    hero_subtitle: {
      required: true,
      minLength: 10,
      maxLength: 200,
      custom: (value: string) => {
        if (value.trim().length === 0) return 'Hero subtitle cannot be empty'
        if (value.length > 200) return 'Hero subtitle is too long (maximum 200 characters)'
        return null
      }
    },
    hero_description: {
      required: false,
      maxLength: 300,
      custom: (value: string) => {
        if (value && value.length > 300) return 'Description is too long (maximum 300 characters)'
        return null
      }
    },
    hero_background_image: {
      required: false,
      custom: (value: string) => {
        if (!value) return null

        // Validate URL format
        if (!HeroValidator.isValidUrl(value) && !HeroValidator.isValidPath(value)) {
          return 'Must be a valid URL or file path'
        }

        // Validate image extension
        if (!HeroValidator.isImageUrl(value)) {
          return 'Must be a valid image file (jpg, png, gif, webp)'
        }

        return null
      }
    },
    hero_cta_button_text: {
      required: false,
      maxLength: 30,
      custom: (value: string) => {
        if (value && value.length > 30) return 'Button text is too long (maximum 30 characters)'
        return null
      }
    },
    hero_cta_button_link: {
      required: false,
      custom: (value: string) => {
        if (!value) return null
        if (!HeroValidator.isValidUrl(value) && !HeroValidator.isValidPath(value)) {
          return 'Must be a valid URL or path'
        }
        return null
      }
    },
    hero_secondary_button_text: {
      required: false,
      maxLength: 30,
      custom: (value: string) => {
        if (value && value.length > 30) return 'Button text is too long (maximum 30 characters)'
        return null
      }
    },
    hero_secondary_button_link: {
      required: false,
      custom: (value: string) => {
        if (!value) return null
        if (!HeroValidator.isValidUrl(value) && !HeroValidator.isValidPath(value)) {
          return 'Must be a valid URL or path'
        }
        return null
      }
    },
    residents_served: {
      required: false,
      maxLength: 20,
      custom: (value: string) => {
        if (value && value.length > 20) return 'Value is too long (maximum 20 characters)'
        return null
      }
    },
    weekly_programs: {
      required: false,
      maxLength: 20,
      custom: (value: string) => {
        if (value && value.length > 20) return 'Value is too long (maximum 20 characters)'
        return null
      }
    },
    opening_hours_text: {
      required: false,
      maxLength: 20,
      custom: (value: string) => {
        if (value && value.length > 20) return 'Value is too long (maximum 20 characters)'
        return null
      }
    },
    main_hall_capacity: {
      required: false,
      maxLength: 10,
      custom: (value: string) => {
        if (value && value.length > 10) return 'Value is too long (maximum 10 characters)'
        return null
      }
    }
  }

  /**
   * Validate hero settings against schema
   */
  static validate(settings: Partial<HeroSettings>): Record<string, string> {
    const errors: Record<string, string> = {}

    Object.entries(settings).forEach(([key, value]) => {
      const fieldSchema = this.schema[key]
      if (!fieldSchema) return

      const stringValue = value?.toString() || ''

      // Required field validation
      if (fieldSchema.required && !stringValue.trim()) {
        errors[key] = `${this.getFieldLabel(key)} is required`
        return
      }

      // Skip further validation if field is empty and not required
      if (!stringValue.trim() && !fieldSchema.required) return

      // Length validations
      if (fieldSchema.minLength && stringValue.length < fieldSchema.minLength) {
        errors[key] = `${this.getFieldLabel(key)} must be at least ${fieldSchema.minLength} characters`
      }

      if (fieldSchema.maxLength && stringValue.length > fieldSchema.maxLength) {
        errors[key] = `${this.getFieldLabel(key)} must be no more than ${fieldSchema.maxLength} characters`
      }

      // Pattern validation
      if (fieldSchema.pattern && !fieldSchema.pattern.test(stringValue)) {
        errors[key] = `${this.getFieldLabel(key)} format is invalid`
      }

      // Custom validation
      if (fieldSchema.custom) {
        const customError = fieldSchema.custom(stringValue)
        if (customError) {
          errors[key] = customError
        }
      }
    })

    return errors
  }

  /**
   * Validate individual field
   */
  static validateField(key: string, value: string): string | null {
    const fieldSchema = this.schema[key]
    if (!fieldSchema) return null

    // Required validation
    if (fieldSchema.required && !value.trim()) {
      return `${this.getFieldLabel(key)} is required`
    }

    if (!value.trim() && !fieldSchema.required) return null

    // Length validations
    if (fieldSchema.minLength && value.length < fieldSchema.minLength) {
      return `Must be at least ${fieldSchema.minLength} characters`
    }

    if (fieldSchema.maxLength && value.length > fieldSchema.maxLength) {
      return `Must be no more than ${fieldSchema.maxLength} characters`
    }

    // Pattern validation
    if (fieldSchema.pattern && !fieldSchema.pattern.test(value)) {
      return 'Invalid format'
    }

    // Custom validation
    if (fieldSchema.custom) {
      return fieldSchema.custom(value)
    }

    return null
  }

  /**
   * Check if a string is a valid URL
   */
  static isValidUrl(value: string): boolean {
    try {
      new URL(value)
      return true
    } catch {
      return false
    }
  }

  /**
   * Check if a string is a valid path
   */
  static isValidPath(value: string): boolean {
    return value.startsWith('/') || value.startsWith('./') || value.startsWith('../')
  }

  /**
   * Check if a URL/path points to an image
   */
  static isImageUrl(value: string): boolean {
    const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i
    return imageExtensions.test(value)
  }

  /**
   * Get human-readable field label
   */
  static getFieldLabel(key: string): string {
    const labels: Record<string, string> = {
      hero_title: 'Hero Title',
      hero_subtitle: 'Hero Subtitle',
      hero_description: 'Hero Description',
      hero_background_image: 'Background Image',
      hero_cta_button_text: 'Primary Button Text',
      hero_cta_button_link: 'Primary Button Link',
      hero_secondary_button_text: 'Secondary Button Text',
      hero_secondary_button_link: 'Secondary Button Link',
      residents_served: 'Residents Served',
      weekly_programs: 'Weekly Programs',
      opening_hours_text: 'Opening Hours',
      main_hall_capacity: 'Main Hall Capacity'
    }

    return labels[key] || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  /**
   * Sanitize input values
   */
  static sanitize(settings: Partial<HeroSettings>): Partial<HeroSettings> {
    const sanitized: Partial<HeroSettings> = {}

    Object.entries(settings).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        sanitized[key] = ''
        return
      }

      let sanitizedValue = value.toString().trim()

      // Remove potentially dangerous HTML/JS
      sanitizedValue = sanitizedValue
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<[^>]*>/g, '') // Remove all HTML tags
        .replace(/javascript:/gi, '') // Remove javascript: URLs
        .replace(/data:/gi, '') // Remove data: URLs (except for valid images)

      // Specific sanitization for URLs
      if (key.includes('link') || key.includes('image')) {
        // Allow only safe URL schemes
        if (sanitizedValue && !this.isValidUrl(sanitizedValue) && !this.isValidPath(sanitizedValue)) {
          sanitizedValue = ''
        }
      }

      sanitized[key] = sanitizedValue
    })

    return sanitized
  }

  /**
   * Check if hero settings are complete for publishing
   */
  static isComplete(settings: HeroSettings): { complete: boolean; missing: string[] } {
    const requiredFields = ['hero_title', 'hero_subtitle']
    const missing: string[] = []

    requiredFields.forEach(field => {
      if (!settings[field] || !settings[field].trim()) {
        missing.push(this.getFieldLabel(field))
      }
    })

    return {
      complete: missing.length === 0,
      missing
    }
  }

  /**
   * Generate validation report
   */
  static generateReport(settings: Partial<HeroSettings>): {
    valid: boolean
    errors: Record<string, string>
    warnings: string[]
    suggestions: string[]
  } {
    const errors = this.validate(settings)
    const warnings: string[] = []
    const suggestions: string[] = []

    // Check for warnings
    if (settings.hero_title && settings.hero_title.length > 60) {
      warnings.push('Hero title is quite long - consider keeping it under 60 characters for better impact')
    }

    if (settings.hero_subtitle && settings.hero_subtitle.length > 120) {
      warnings.push('Hero subtitle is lengthy - consider shorter text for better readability')
    }

    if (!settings.hero_background_image) {
      suggestions.push('Consider adding a background image to make your hero section more visually appealing')
    }

    if (!settings.hero_cta_button_text) {
      suggestions.push('Add a call-to-action button to guide users to important pages')
    }

    // Check for accessibility concerns
    if (settings.hero_background_image && !settings.hero_title) {
      warnings.push('Background images should have meaningful text content for accessibility')
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors,
      warnings,
      suggestions
    }
  }
}

// Export utility functions
export const validateHeroSettings = (settings: Partial<HeroSettings>) =>
  HeroValidator.validate(settings)

export const validateHeroField = (key: string, value: string) =>
  HeroValidator.validateField(key, value)

export const sanitizeHeroSettings = (settings: Partial<HeroSettings>) =>
  HeroValidator.sanitize(settings)

export const isHeroComplete = (settings: HeroSettings) =>
  HeroValidator.isComplete(settings)

export const generateHeroReport = (settings: Partial<HeroSettings>) =>
  HeroValidator.generateReport(settings)