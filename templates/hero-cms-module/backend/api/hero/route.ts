// Hero API Route - Dedicated endpoints for hero content management

import { NextRequest, NextResponse } from 'next/server'
import { HeroService } from '../../lib/hero-service'
import { checkAuth } from '@/lib/auth-middleware'
import { HeroApiResponse } from '../../../types/hero.types'

// GET /api/hero - Get all hero settings
export async function GET(): Promise<NextResponse<HeroApiResponse>> {
  try {
    const heroSettings = await HeroService.getHeroSettings()

    return NextResponse.json({
      success: true,
      data: heroSettings
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  } catch (error) {
    console.error('Error fetching hero settings:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch hero settings'
    }, { status: 500 })
  }
}

// PUT /api/hero - Update hero settings
export async function PUT(request: NextRequest): Promise<NextResponse<HeroApiResponse>> {
  // Check authentication for write operations
  const isAuthed = await checkAuth(request)
  if (!isAuthed) {
    return NextResponse.json({
      success: false,
      error: 'Unauthorized'
    }, { status: 401 })
  }

  try {
    const body = await request.json()

    // Validate the request body
    const validationErrors = HeroService.validateHeroSettings(body)
    if (Object.keys(validationErrors).length > 0) {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        data: validationErrors
      }, { status: 400 })
    }

    // Update hero settings
    const updatedSettings = await HeroService.updateHeroSettings(body)

    return NextResponse.json({
      success: true,
      message: 'Hero settings updated successfully',
      data: updatedSettings
    })
  } catch (error) {
    console.error('Error updating hero settings:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to update hero settings'
    }, { status: 500 })
  }
}

// POST /api/hero/preview - Get formatted preview data
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json()

    // If preview data is provided, use it; otherwise get current settings
    let previewData
    if (Object.keys(body).length > 0) {
      // Create preview from provided data
      previewData = {
        title: body.hero_title || 'Your Organization Name',
        subtitle: body.hero_subtitle || 'Serving the community with excellence',
        description: body.hero_description,
        backgroundImage: body.hero_background_image,
        primaryButton: body.hero_cta_button_text ? {
          text: body.hero_cta_button_text,
          link: body.hero_cta_button_link || '#'
        } : undefined,
        secondaryButton: body.hero_secondary_button_text ? {
          text: body.hero_secondary_button_text,
          link: body.hero_secondary_button_link || '#'
        } : undefined,
        stats: {
          residentsServed: body.residents_served || '2,000+',
          weeklyPrograms: body.weekly_programs || '15+',
          openingHours: body.opening_hours_text || '7 days',
          mainHallCapacity: body.main_hall_capacity || '120'
        }
      }
    } else {
      // Get current preview data
      previewData = await HeroService.getHeroPreviewData()
    }

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

// DELETE /api/hero/cache - Clear hero cache (admin only)
export async function DELETE(request: NextRequest): Promise<NextResponse<HeroApiResponse>> {
  const isAuthed = await checkAuth(request)
  if (!isAuthed) {
    return NextResponse.json({
      success: false,
      error: 'Unauthorized'
    }, { status: 401 })
  }

  try {
    HeroService.clearCache()

    return NextResponse.json({
      success: true,
      message: 'Hero cache cleared successfully'
    })
  } catch (error) {
    console.error('Error clearing hero cache:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to clear cache'
    }, { status: 500 })
  }
}