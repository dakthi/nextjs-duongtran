import { prisma } from '@/lib/prisma'
import type { AboutContent as PrismaAboutContent } from '@prisma/client'

import type {
  AboutContentInput,
  AboutContentRecord,
  AboutSection,
  AboutValidationErrors
} from '@/types/about.types'

const CACHE_DURATION = 30_000
let aboutCache: AboutContentRecord | null = null
let cacheTimestamp = 0

const mapPrismaAbout = (record: PrismaAboutContent): AboutContentRecord => ({
  id: record.id,
  slug: record.slug,
  headline: record.headline,
  intro: record.intro,
  sections: Array.isArray(record.sections)
    ? (record.sections as unknown as AboutSection[])
    : [],
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

  static async getActiveContent(): Promise<AboutContentRecord | null> {
    if (aboutCache && this.isCacheFresh()) {
      return aboutCache
    }

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

    const record = input.id
      ? await prisma.aboutContent.update({
          where: { id: input.id },
          data: {
            slug,
            headline: input.headline?.trim() ?? null,
            intro: input.intro?.trim() ?? null,
            sections: input.sections as any,
            isActive: input.isActive ?? true,
          }
        })
      : await prisma.aboutContent.upsert({
          where: { slug },
          update: {
            headline: input.headline?.trim() ?? null,
            intro: input.intro?.trim() ?? null,
            sections: input.sections as any,
            isActive: input.isActive ?? true,
          },
          create: {
            slug,
            headline: input.headline?.trim() ?? null,
            intro: input.intro?.trim() ?? null,
            sections: input.sections as any,
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

export const getActiveAboutContent = () => AboutService.getActiveContent()
export const getAboutContent = () => AboutService.getActiveContent()
export const upsertAboutContent = (input: AboutContentInput) => AboutService.upsertContent(input)
export const validateAboutContent = (input: AboutContentInput) => AboutService.validate(input)
