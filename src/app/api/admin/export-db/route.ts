import { NextResponse, NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get format from query params (default: json)
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format') || 'json'

    // Generate timestamp for filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0]

    // Fetch all data from all tables (using correct PascalCase model names)
    const [
      heroContent,
      blogPosts,
      testimonials,
      aboutContent,
      faqItems,
      siteSettings,
      mediaItems
    ] = await Promise.all([
      prisma.heroContent.findMany(),
      prisma.blogPost.findMany(),
      prisma.testimonial.findMany(),
      prisma.aboutContent.findMany(),
      prisma.faqItem.findMany(),
      prisma.siteSetting.findMany(),
      prisma.mediaItem.findMany()
    ])

    const data = {
      exportDate: new Date().toISOString(),
      exportFormat: format,
      tables: {
        heroContent,
        blogPosts,
        testimonials,
        aboutContent,
        faqItems,
        siteSettings,
        mediaItems
      }
    }

    // Export as JSON
    if (format === 'json') {
      const filename = `lieuvo-db-backup-${timestamp}.json`
      return new NextResponse(JSON.stringify(data, null, 2), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      })
    }

    // Export as CSV (simplified - one file with all table names and counts)
    if (format === 'csv') {
      const filename = `lieuvo-db-backup-${timestamp}.csv`
      let csv = 'Table,Record Count,Sample Data\n'

      Object.entries(data.tables).forEach(([tableName, records]) => {
        const count = (records as any[]).length
        const sampleData = count > 0 ? JSON.stringify((records as any[])[0]).substring(0, 100) : 'Empty'
        csv += `"${tableName}","${count}","${sampleData.replace(/"/g, '""')}"\n`
      })

      return new NextResponse(csv, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      })
    }

    // Export as Text (human-readable format)
    if (format === 'txt') {
      const filename = `lieuvo-db-backup-${timestamp}.txt`
      let text = `Database Export - Lieu Vo Website\n`
      text += `Export Date: ${new Date().toISOString()}\n`
      text += `${'='.repeat(60)}\n\n`

      Object.entries(data.tables).forEach(([tableName, records]) => {
        text += `\n${tableName.toUpperCase()}\n`
        text += `${'-'.repeat(60)}\n`
        text += `Total Records: ${(records as any[]).length}\n\n`

        if ((records as any[]).length > 0) {
          (records as any[]).forEach((record: any, index: number) => {
            text += `Record ${index + 1}:\n`
            Object.entries(record).forEach(([key, value]) => {
              const displayValue = typeof value === 'object' ? JSON.stringify(value) : String(value)
              text += `  ${key}: ${displayValue.substring(0, 200)}\n`
            })
            text += '\n'
          })
        } else {
          text += '  (No records)\n\n'
        }
      })

      return new NextResponse(text, {
        status: 200,
        headers: {
          'Content-Type': 'text/plain',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      })
    }

    return NextResponse.json({ error: 'Invalid format. Use json, csv, or txt' }, { status: 400 })
  } catch (error) {
    console.error('Database export error:', error)
    return NextResponse.json(
      { error: 'Failed to export database', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
