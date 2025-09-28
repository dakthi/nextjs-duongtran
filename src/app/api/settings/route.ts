import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { prisma } from '@/lib/prisma'
import authOptions from '@/lib/auth'

const DEFAULT_TYPE = 'text'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const keys = searchParams.get('keys')

    const where = keys
      ? { key: { in: keys.split(',').map((key) => key.trim()).filter(Boolean) } }
      : undefined

    const settings = await prisma.siteSetting.findMany({
      where,
      orderBy: { key: 'asc' },
    })

    return NextResponse.json({ success: true, data: settings })
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch site settings' }, { status: 500 })
  }
}

interface SettingUpdate {
  key: string
  value: string | null
  type?: string
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user || (session.user as any)?.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const updates: SettingUpdate[] = Array.isArray(body?.updates) ? body.updates : []

    if (updates.length === 0) {
      return NextResponse.json({ success: false, error: 'No updates provided' }, { status: 400 })
    }

    const sanitizedUpdates = updates
      .filter((entry) => typeof entry?.key === 'string' && entry.key.trim().length > 0)
      .map((entry) => ({
        key: entry.key.trim(),
        value: entry.value === undefined ? null : String(entry.value ?? ''),
        type: entry.type?.trim() || DEFAULT_TYPE,
      }))

    if (sanitizedUpdates.length === 0) {
      return NextResponse.json({ success: false, error: 'Invalid updates payload' }, { status: 400 })
    }

    const results = await prisma.$transaction(
      sanitizedUpdates.map((entry) =>
        prisma.siteSetting.upsert({
          where: { key: entry.key },
          update: { value: entry.value, type: entry.type },
          create: { key: entry.key, value: entry.value, type: entry.type },
        })
      )
    )

    return NextResponse.json({ success: true, data: results })
  } catch (error) {
    console.error('Error updating site settings:', error)
    return NextResponse.json({ success: false, error: 'Failed to update settings' }, { status: 500 })
  }
}
