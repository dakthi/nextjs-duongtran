import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json()

    if (!code) {
      return NextResponse.json({ error: 'Code required' }, { status: 400 })
    }

    // Verify code in database
    const referralCode = await prisma.referralCode.findUnique({
      where: { code: code.trim().toUpperCase() }
    })

    if (!referralCode) {
      return NextResponse.json({ error: 'Invalid code' }, { status: 403 })
    }

    // Return the public R2 URL
    const cvUrl = `${process.env.NEXT_PUBLIC_MEDIA_BASE_URL}/LieuVo_CV.pdf`

    return NextResponse.json({ url: cvUrl })
  } catch (error) {
    console.error('CV verification error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
