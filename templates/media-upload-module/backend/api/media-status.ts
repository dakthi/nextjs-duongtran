import { NextRequest, NextResponse } from 'next/server'
import { isR2Configured } from '../lib/r2-storage'

/**
 * GET /api/media/status - Get storage configuration status
 * Returns information about current storage configuration
 */
export async function GET(request: NextRequest) {
  try {
    const r2Configured = isR2Configured()

    const status = {
      storageType: r2Configured ? 'r2' : 'local',
      isCloudStorage: r2Configured,
      r2: r2Configured ? {
        accountId: process.env.R2_ACCOUNT_ID ? '[CONFIGURED]' : '[NOT SET]',
        bucketName: process.env.R2_BUCKET_NAME || '[NOT SET]',
        region: process.env.R2_REGION || 'auto',
        publicUrl: process.env.R2_PUBLIC_URL || '[NOT SET]'
      } : null,
      local: !r2Configured ? {
        uploadPath: process.env.UPLOAD_PATH || 'public/uploads',
        note: 'Files stored locally - configure R2 for cloud storage'
      } : null
    }

    return NextResponse.json(status)
  } catch (error) {
    console.error('Error getting storage status:', error)
    return NextResponse.json(
      { error: 'Failed to get storage status' },
      { status: 500 }
    )
  }
}