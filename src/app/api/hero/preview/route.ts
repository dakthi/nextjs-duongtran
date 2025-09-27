import { NextRequest, NextResponse } from 'next/server'
import { HeroService } from '@/lib/hero-service'

// POST /api/hero/preview - Get preview data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Generate preview data from form input
    const previewData = HeroService.generatePreviewData(body)

    return NextResponse.json({
      success: true,
      data: previewData
    })
  } catch (error) {
    console.error('Error generating hero preview:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to generate preview'
    }, { status: 500 })
  }
}