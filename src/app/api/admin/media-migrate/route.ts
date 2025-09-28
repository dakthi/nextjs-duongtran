import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import path from 'path'
import { promises as fs } from 'fs'

import authOptions from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { uploadToR2, isR2Configured } from '@/lib/media/r2-storage'

const PUBLIC_IMG_ROOT = path.join(process.cwd(), 'public', 'img')

const MIME_MAP: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
}

interface FileEntry {
  relativePath: string
  absolutePath: string
}

async function collectFiles(dir: string, base: string): Promise<FileEntry[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const results: FileEntry[] = []

  for (const entry of entries) {
    const absolutePath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      const nested = await collectFiles(absolutePath, base)
      results.push(...nested)
    } else if (entry.isFile()) {
      const relativePath = path.relative(base, absolutePath).replace(/\\/g, '/')
      results.push({ relativePath, absolutePath })
    }
  }

  return results
}

export async function POST() {
  const session = await getServerSession(authOptions)

  if (!session?.user || (session.user as any)?.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  if (!isR2Configured()) {
    return NextResponse.json({ success: false, error: 'Cloudflare R2 is not configured' }, { status: 500 })
  }

  try {
    await fs.access(PUBLIC_IMG_ROOT)
  } catch {
    return NextResponse.json({ success: false, error: 'public/img directory not found' }, { status: 404 })
  }

  const files = await collectFiles(PUBLIC_IMG_ROOT, PUBLIC_IMG_ROOT)

  const uploads: Array<{
    localPath: string
    key: string
    url: string
    bytes: number
  }> = []

  const skipped: Array<{ path: string; reason: string }> = []

  for (const file of files) {
    const ext = path.extname(file.relativePath).toLowerCase()
    const contentType = MIME_MAP[ext]

    if (!contentType) {
      skipped.push({ path: file.relativePath, reason: 'Unsupported file type' })
      continue
    }

    const buffer = await fs.readFile(file.absolutePath)
    const key = `legacy/${file.relativePath}`

    const upload = await uploadToR2(key, buffer, contentType, {
      source: 'public-img-migration',
    })

    const existing = await prisma.mediaItem.findFirst({ where: { filename: key } })

    if (existing) {
      await prisma.mediaItem.update({
        where: { id: existing.id },
        data: {
          url: upload.url,
          originalName: path.basename(file.relativePath),
          mimeType: contentType,
          size: buffer.length,
        },
      })
    } else {
      await prisma.mediaItem.create({
        data: {
          filename: key,
          originalName: path.basename(file.relativePath),
          mimeType: contentType,
          size: buffer.length,
          url: upload.url,
        },
      })
    }

    uploads.push({
      localPath: `/img/${file.relativePath}`,
      key,
      url: upload.url,
      bytes: buffer.length,
    })
  }

  return NextResponse.json({
    success: true,
    uploaded: uploads,
    skipped,
  })
}
