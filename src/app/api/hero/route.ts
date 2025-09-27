import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { HeroService } from '@/lib/hero-service'
import { HeroApiResponse } from '@/types/hero.types'

// GET /api/hero - Get hero content
export async function GET(): Promise<NextResponse<HeroApiResponse>> {
  try {
    const heroData = await HeroService.getHeroData()

    return NextResponse.json({
      success: true,
      data: heroData
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  } catch (error) {
    console.error('Error fetching hero data:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch hero data'
    }, { status: 500 })
  }
}

// PUT /api/hero - Update hero content
export async function PUT(request: NextRequest): Promise<NextResponse<HeroApiResponse>> {
  // TODO: Add authentication before production
  // const session = await getServerSession()
  // if (!session?.user) {
  //   return NextResponse.json({
  //     success: false,
  //     error: 'Unauthorized'
  //   }, { status: 401 })
  // }

  try {
    const body = await request.json()

    // Validate the request body
    const validationErrors = HeroService.validateHeroData(body)
    if (Object.keys(validationErrors).length > 0) {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        data: null,
        errors: validationErrors
      }, { status: 400 })
    }

    // Update hero content
    const updatedHero = await HeroService.updateHeroData(body)

    return NextResponse.json({
      success: true,
      message: 'Hero content updated successfully',
      data: updatedHero
    })
  } catch (error) {
    console.error('Error updating hero content:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to update hero content'
    }, { status: 500 })
  }
}

// POST /api/hero - Create new hero content
export async function POST(request: NextRequest): Promise<NextResponse<HeroApiResponse>> {
  // TODO: Add authentication before production
  // const session = await getServerSession()
  // if (!session?.user) {
  //   return NextResponse.json({
  //     success: false,
  //     error: 'Unauthorized'
  //   }, { status: 401 })
  // }

  try {
    const body = await request.json()

    // Validate the request body
    const validationErrors = HeroService.validateHeroData(body)
    if (Object.keys(validationErrors).length > 0) {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        data: null,
        errors: validationErrors
      }, { status: 400 })
    }

    // Create hero content
    const newHero = await HeroService.updateHeroData(body)

    return NextResponse.json({
      success: true,
      message: 'Hero content created successfully',
      data: newHero
    })
  } catch (error) {
    console.error('Error creating hero content:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to create hero content'
    }, { status: 500 })
  }
}
