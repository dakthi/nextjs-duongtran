import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import authOptions from '@/lib/auth'
import { listAllTestimonials, upsertTestimonial } from '@/lib/testimonial-service'
import type { TestimonialInput } from '@/types/testimonial.types'

const toOptionalNumber = (value: unknown): number | null => {
  if (value === null || value === undefined || value === '') return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

const toBoolean = (value: unknown, fallback = false): boolean => {
  if (typeof value === 'boolean') return value
  if (typeof value === 'string') return value === 'true'
  return fallback
}

const parseTestimonialInput = (payload: any): TestimonialInput => ({
  id: typeof payload?.id === 'string' ? payload.id : undefined,
  name: String(payload?.name ?? ''),
  role: payload?.role ? String(payload.role) : null,
  relationship: payload?.relationship ? String(payload.relationship) : null,
  dateLabel: payload?.dateLabel ? String(payload.dateLabel) : null,
  content: String(payload?.content ?? ''),
  image: payload?.image ? String(payload.image) : null,
  order: toOptionalNumber(payload?.order) ?? 0,
  isActive: toBoolean(payload?.isActive, true),
})

const unauthorized = NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user || (session.user as any)?.role !== 'admin') {
    return unauthorized
  }

  try {
    const testimonials = await listAllTestimonials()
    return NextResponse.json({ success: true, data: testimonials }, {
      headers: {
        'Cache-Control': 'no-store'
      }
    })
  } catch (error) {
    console.error('[api/testimonials] Failed to fetch testimonials', error)
    return NextResponse.json({ success: false, error: 'Failed to load testimonials' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user || (session.user as any)?.role !== 'admin') {
    return unauthorized
  }

  try {
    const payload = parseTestimonialInput(await request.json())
    const testimonial = await upsertTestimonial(payload)
    return NextResponse.json({ success: true, data: testimonial }, { status: 201 })
  } catch (error) {
    console.error('[api/testimonials] Failed to create testimonial', error)
    const validationErrors = (error as any)?.validationErrors
    if (validationErrors) {
      return NextResponse.json({ success: false, error: 'Validation failed', errors: validationErrors }, { status: 400 })
    }
    return NextResponse.json({ success: false, error: 'Failed to create testimonial' }, { status: 500 })
  }
}