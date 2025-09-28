import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import authOptions from '@/lib/auth'
import { debugR2Config } from '@/lib/env-debug'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.user || (session.user as any)?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const config = debugR2Config()

  return NextResponse.json({
    environment: process.env.NODE_ENV,
    r2Config: config,
    timestamp: new Date().toISOString()
  })
}