import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import authOptions from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const KEY_WHITELIST = [
  'site_title',
  'site_description',
  'contact_email',
  'contact_phone',
  'address',
]

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.user || (session.user as any)?.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const [heroCount, testimonialsCount, faqCount, mediaCount, latestHero, latestTestimonial, latestFaq, siteSettings] =
      await Promise.all([
        prisma.heroContent.count(),
        prisma.testimonial.count(),
        prisma.faqItem.count(),
        prisma.mediaItem.count(),
        prisma.heroContent.findFirst({ orderBy: { updatedAt: 'desc' } }),
        prisma.testimonial.findFirst({ orderBy: { updatedAt: 'desc' } }),
        prisma.faqItem.findFirst({ orderBy: { updatedAt: 'desc' } }),
        prisma.siteSetting.findMany({ where: { key: { in: KEY_WHITELIST } } }),
      ])

    const settingsMap = siteSettings.reduce<Record<string, string | null>>((acc, setting) => {
      acc[setting.key] = setting.value ?? ''
      return acc
    }, {})

    const lastUpdated = [
      latestHero ? { id: 'hero', label: 'Hero content updated', at: latestHero.updatedAt, href: '/admin/hero' } : null,
      latestTestimonial
        ? { id: 'testimonial', label: 'Testimonials refreshed', at: latestTestimonial.updatedAt, href: '/admin/testimonials' }
        : null,
      latestFaq ? { id: 'faq', label: 'FAQ edited', at: latestFaq.updatedAt, href: '/admin/faq' } : null,
    ]
      .filter((item): item is { id: string; label: string; at: Date; href: string } => Boolean(item))
      .sort((a, b) => b.at.getTime() - a.at.getTime())
      .slice(0, 5)
      .map((item) => ({
        ...item,
        at: item.at.toISOString(),
      }))

    return NextResponse.json({
      success: true,
      data: {
        metrics: {
          heroCount,
          testimonialsCount,
          faqCount,
          mediaCount,
        },
        siteSettings: settingsMap,
        updates: lastUpdated,
      },
    })
  } catch (error) {
    console.error('Error loading admin summary:', error)
    return NextResponse.json({ success: false, error: 'Failed to load dashboard summary' }, { status: 500 })
  }
}
