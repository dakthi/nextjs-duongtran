import { prisma } from '@/lib/prisma'
import type { AboutContent as PrismaAboutContent } from '@prisma/client'
import { isDatabaseAvailable } from '@/lib/config/build-config'

import type {
  AboutContentInput,
  AboutContentRecord,
  AboutSection,
  AboutValidationErrors
} from '@/types/about.types'

const CACHE_DURATION = 30_000
let aboutCache: AboutContentRecord | null = null
let cacheTimestamp = 0

const mapPrismaAbout = (record: any): AboutContentRecord => ({
  id: record.id,
  locale: record.locale,
  slug: record.slug,
  headline: record.headline,
  intro: record.intro,
  sections: Array.isArray(record.sections)
    ? (record.sections as unknown as AboutSection[])
    : [],
  contentJson: record.contentJson || null,
  contentHtml: record.contentHtml || null,
  isActive: record.isActive,
  createdAt: record.createdAt,
  updatedAt: record.updatedAt,
})

export class AboutService {
  static clearCache(): void {
    aboutCache = null
    cacheTimestamp = 0
  }

  private static isCacheFresh(): boolean {
    return Date.now() - cacheTimestamp < CACHE_DURATION
  }

  static async getActiveContent(locale?: string): Promise<AboutContentRecord | null> {
    if (!isDatabaseAvailable()) {
      console.warn('Database not available during build time, returning null for about content')
      return null
    }

    // If no locale specified, use the original behavior for backwards compatibility
    if (!locale) {
      if (aboutCache && this.isCacheFresh()) {
        return aboutCache
      }

      try {
        const record = await prisma.aboutContent.findFirst({
          where: { isActive: true },
          orderBy: { updatedAt: 'desc' },
        })

        if (!record) {
          return null
        }

        aboutCache = mapPrismaAbout(record)
        cacheTimestamp = Date.now()
        return aboutCache
      } catch (error) {
        console.warn('Database error, returning null for about content:', error)
        return null
      }
    }

    // If locale is specified, find content for that locale
    try {
      const record = await prisma.aboutContent.findFirst({
        where: {
          isActive: true,
          locale: locale
        },
        orderBy: { updatedAt: 'desc' },
      })

      return record ? mapPrismaAbout(record) : null
    } catch (error) {
      console.warn('Database error, returning null for about content:', error)
      return null
    }
  }

  static async getContentById(id: string): Promise<AboutContentRecord | null> {
    const record = await prisma.aboutContent.findUnique({ where: { id } })
    return record ? mapPrismaAbout(record) : null
  }

  static async upsertContent(input: AboutContentInput): Promise<AboutContentRecord> {
    const validation = this.validate(input)
    if (Object.keys(validation).length > 0) {
      const error = new Error('Validation failed') as Error & { validationErrors?: AboutValidationErrors }
      error.validationErrors = validation
      throw error
    }

    const slug = (input.slug || 'default').trim() || 'default'
    const locale = input.locale || 'en'

    const record = input.id
      ? await prisma.aboutContent.update({
          where: { id: input.id },
          data: {
            locale,
            slug,
            headline: input.headline?.trim() ?? null,
            intro: input.intro?.trim() ?? null,
            sections: input.sections as any,
            contentJson: input.contentJson as any,
            contentHtml: input.contentHtml ?? null,
            isActive: input.isActive ?? true,
          }
        })
      : await prisma.aboutContent.upsert({
          where: {
            locale_slug: {
              locale,
              slug
            }
          },
          update: {
            headline: input.headline?.trim() ?? null,
            intro: input.intro?.trim() ?? null,
            sections: input.sections as any,
            contentJson: input.contentJson as any,
            contentHtml: input.contentHtml ?? null,
            isActive: input.isActive ?? true,
          },
          create: {
            locale,
            slug,
            headline: input.headline?.trim() ?? null,
            intro: input.intro?.trim() ?? null,
            sections: input.sections as any,
            contentJson: input.contentJson as any,
            contentHtml: input.contentHtml ?? null,
            isActive: input.isActive ?? true,
          }
        })

    this.clearCache()

    return mapPrismaAbout(record)
  }

  static validate(input: AboutContentInput): AboutValidationErrors {
    const errors: AboutValidationErrors = {}

    if (!input.sections || input.sections.length === 0) {
      errors.sections = 'At least one section is required'
      return errors
    }

    input.sections.forEach((section, index) => {
      if (!section.id || !section.id.trim()) {
        errors[`sections[${index}].id`] = 'Section ID is required'
      }

      if (!section.body || section.body.length === 0) {
        errors[`sections[${index}].body`] = 'Section must include at least one paragraph'
      }
    })

    return errors
  }
}

export const getActiveAboutContent = (locale?: string) => AboutService.getActiveContent(locale)
export const getAboutContent = () => AboutService.getActiveContent()
export const upsertAboutContent = (input: AboutContentInput) => AboutService.upsertContent(input)
export const validateAboutContent = (input: AboutContentInput) => AboutService.validate(input)
