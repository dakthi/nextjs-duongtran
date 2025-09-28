import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import authOptions from '@/lib/auth'
import { upsertTestimonial, deleteTestimonial, getTestimonialById } from '@/lib/testimonial-service'
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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user || (session.user as any)?.role !== 'admin') {
    return unauthorized
  }

  try {
    const testimonial = await getTestimonialById(params.id)
    if (!testimonial) {
      return NextResponse.json({ success: false, error: 'Testimonial not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: testimonial })
  } catch (error) {
    console.error('[api/testimonials/[id]] Failed to fetch testimonial', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch testimonial' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user || (session.user as any)?.role !== 'admin') {
    return unauthorized
  }

  try {
    const payload = parseTestimonialInput(await request.json())
    const testimonial = await upsertTestimonial({ ...payload, id: params.id })
    return NextResponse.json({ success: true, data: testimonial })
  } catch (error) {
    console.error('[api/testimonials/[id]] Failed to update testimonial', error)
    const validationErrors = (error as any)?.validationErrors
    if (validationErrors) {
      return NextResponse.json({ success: false, error: 'Validation failed', errors: validationErrors }, { status: 400 })
    }
    return NextResponse.json({ success: false, error: 'Failed to update testimonial' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user || (session.user as any)?.role !== 'admin') {
    return unauthorized
  }

  try {
    await deleteTestimonial(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[api/testimonials/[id]] Failed to delete testimonial', error)
    return NextResponse.json({ success: false, error: 'Failed to delete testimonial' }, { status: 500 })
  }
}