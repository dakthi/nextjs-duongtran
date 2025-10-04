import { prisma } from '@/lib/prisma'
import type { Testimonial as PrismaTestimonial } from '@prisma/client'

import type {
  TestimonialInput,
  TestimonialRecord,
  TestimonialValidationErrors,
  TestimonialView
} from '@/types/testimonial.types'

const CACHE_DURATION = 30_000
let testimonialsCache: TestimonialRecord[] | null = null
let cacheTimestamp = 0

const mapPrismaTestimonial = (record: PrismaTestimonial): TestimonialRecord => ({
  id: record.id,
  name: record.name,
  role: record.role,
  relationship: record.relationship,
  dateLabel: record.dateLabel,
  content: record.content,
  image: record.image,
  order: record.order,
  isActive: record.isActive,
  createdAt: record.createdAt,
  updatedAt: record.updatedAt,
})

const toParagraphs = (content: string): string[] =>
  content
    .split(/\r?\n\s*\r?\n/)
    .map(paragraph => paragraph.trim())
    .filter(Boolean)

export class TestimonialService {
  static clearCache(): void {
    testimonialsCache = null
    cacheTimestamp = 0
  }

  private static isCacheFresh(): boolean {
    return Date.now() - cacheTimestamp < CACHE_DURATION
  }

  static async listActiveTestimonials(locale?: string): Promise<TestimonialRecord[]> {
    // Don't use cache when locale is specified, as cache doesn't account for locale
    if (!locale && testimonialsCache && this.isCacheFresh()) {
      return testimonialsCache
    }

    const records = await prisma.testimonial.findMany({
      where: {
        isActive: true,
        ...(locale && { locale })
      },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    })

    // Only cache when no locale specified (for backward compatibility)
    if (!locale) {
      testimonialsCache = records.map(mapPrismaTestimonial)
      cacheTimestamp = Date.now()
    }

    return records.map(mapPrismaTestimonial)
  }

  static async listAllTestimonials(): Promise<TestimonialRecord[]> {
    const records = await prisma.testimonial.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    })

    return records.map(mapPrismaTestimonial)
  }

  static async getById(id: string): Promise<TestimonialRecord | null> {
    const record = await prisma.testimonial.findUnique({ where: { id } })
    return record ? mapPrismaTestimonial(record) : null
  }

  static async upsertTestimonial(input: TestimonialInput): Promise<TestimonialRecord> {
    const validation = this.validate(input)
    if (Object.keys(validation).length > 0) {
      const error = new Error('Validation failed') as Error & { validationErrors?: TestimonialValidationErrors }
      error.validationErrors = validation
      throw error
    }

    const id = input.id?.trim() || undefined
    const record = id
      ? await prisma.testimonial.update({
          where: { id },
          data: {
            name: input.name.trim(),
            role: input.role?.trim() ?? null,
            relationship: input.relationship?.trim() ?? null,
            dateLabel: input.dateLabel?.trim() ?? null,
            content: input.content.trim(),
            image: input.image?.trim() ?? null,
            order: input.order ?? 0,
            isActive: input.isActive ?? true,
          }
        })
      : await prisma.testimonial.create({
          data: {
            name: input.name.trim(),
            role: input.role?.trim() ?? null,
            relationship: input.relationship?.trim() ?? null,
            dateLabel: input.dateLabel?.trim() ?? null,
            content: input.content.trim(),
            image: input.image?.trim() ?? null,
            order: input.order ?? 0,
            isActive: input.isActive ?? true,
          }
        })

    this.clearCache()

    return mapPrismaTestimonial(record)
  }

  static async deleteTestimonial(id: string): Promise<void> {
    await prisma.testimonial.delete({ where: { id } })
    this.clearCache()
  }

  static toView(record: TestimonialRecord): TestimonialView {
    return {
      ...record,
      paragraphs: toParagraphs(record.content),
    }
  }

  static validate(input: TestimonialInput): TestimonialValidationErrors {
    const errors: TestimonialValidationErrors = {}

    if (!input.name || !input.name.trim()) {
      errors.name = 'Name is required'
    }

    if (!input.content || !input.content.trim()) {
      errors.content = 'Testimonial content cannot be empty'
    }

    return errors
  }
}

export const listActiveTestimonials = (locale?: string) => TestimonialService.listActiveTestimonials(locale)
export const listAllTestimonials = () => TestimonialService.listAllTestimonials()
export const getTestimonialById = (id: string) => TestimonialService.getById(id)
export const upsertTestimonial = (input: TestimonialInput) => TestimonialService.upsertTestimonial(input)
export const deleteTestimonial = (id: string) => TestimonialService.deleteTestimonial(id)
export const testimonialToView = (record: TestimonialRecord) => TestimonialService.toView(record)
export const validateTestimonial = (input: TestimonialInput) => TestimonialService.validate(input)
