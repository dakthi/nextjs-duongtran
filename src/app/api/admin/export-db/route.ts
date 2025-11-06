import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export async function GET() {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get database connection details from environment
    const databaseUrl = process.env.DATABASE_URL
    if (!databaseUrl) {
      return NextResponse.json({ error: 'Database URL not configured' }, { status: 500 })
    }

    // Parse DATABASE_URL (format: postgresql://user:password@host:port/database)
    const dbUrlMatch = databaseUrl.match(/postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)
    if (!dbUrlMatch) {
      return NextResponse.json({ error: 'Invalid DATABASE_URL format' }, { status: 500 })
    }

    const [, user, password, host, port, database] = dbUrlMatch

    // Generate timestamp for filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0]
    const filename = `lieuvo-db-backup-${timestamp}.sql`

    // Use pg_dump to create SQL dump
    const pgDumpCommand = `PGPASSWORD="${password}" pg_dump -h ${host} -p ${port} -U ${user} -d ${database} --no-owner --no-acl`

    try {
      const { stdout, stderr } = await execAsync(pgDumpCommand)

      if (stderr && !stderr.includes('WARNING')) {
        console.error('pg_dump stderr:', stderr)
      }

      // Return SQL dump as downloadable file
      return new NextResponse(stdout, {
        status: 200,
        headers: {
          'Content-Type': 'application/sql',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      })
    } catch (execError: any) {
      console.error('pg_dump execution error:', execError)

      // If pg_dump is not available, return JSON export instead
      return NextResponse.json(
        {
          error: 'pg_dump not available. Install PostgreSQL client tools or use individual export buttons.',
          details: execError.message
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Database export error:', error)
    return NextResponse.json(
      { error: 'Failed to export database', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
