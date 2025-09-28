import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import authOptions from '@/lib/auth'
import { getAboutContent, upsertAboutContent } from '@/lib/about-service'
import type { AboutContentInput } from '@/types/about.types'

const unauthorized = NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user || (session.user as any)?.role !== 'admin') {
    return unauthorized
  }

  try {
    const content = await getAboutContent()
    return NextResponse.json({ success: true, data: content }, {
      headers: {
        'Cache-Control': 'no-store'
      }
    })
  } catch (error) {
    console.error('[api/about] Failed to fetch about content', error)
    return NextResponse.json({ success: false, error: 'Failed to load about content' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user || (session.user as any)?.role !== 'admin') {
    return unauthorized
  }

  try {
    const payload = await request.json() as AboutContentInput
    const content = await upsertAboutContent(payload)
    return NextResponse.json({ success: true, data: content })
  } catch (error) {
    console.error('[api/about] Failed to save about content', error)
    const validationErrors = (error as any)?.validationErrors
    if (validationErrors) {
      return NextResponse.json({ success: false, error: 'Validation failed', errors: validationErrors }, { status: 400 })
    }
    return NextResponse.json({ success: false, error: 'Failed to save about content' }, { status: 500 })
  }
}