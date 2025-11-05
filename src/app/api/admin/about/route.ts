import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateHTML } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'

// GET - Fetch about content
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const locale = searchParams.get('locale') || 'en'

    const aboutContent = await prisma.aboutContent.findFirst({
      where: {
        locale,
        isActive: true,
      },
    })

    return NextResponse.json(aboutContent)
  } catch (error) {
    console.error('Error fetching about content:', error)
    return NextResponse.json({ error: 'Failed to fetch about content' }, { status: 500 })
  }
}

// POST - Create or update about content
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { locale = 'en', slug = 'default', headline, intro, contentJson } = body

    // Generate HTML from TipTap JSON
    const extensions = [
      StarterKit,
      Image,
      Link,
    ]
    const contentHtml = generateHTML(contentJson, extensions)

    // Deactivate any existing active content for this locale
    await prisma.aboutContent.updateMany({
      where: {
        locale,
        isActive: true,
      },
      data: {
        isActive: false,
      },
    })

    // Create or update the about content
    const aboutContent = await prisma.aboutContent.upsert({
      where: {
        locale_slug: {
          locale,
          slug,
        },
      },
      update: {
        headline,
        intro,
        contentJson,
        contentHtml,
        isActive: true,
      },
      create: {
        locale,
        slug,
        headline,
        intro,
        contentJson,
        contentHtml,
        isActive: true,
      },
    })

    return NextResponse.json(aboutContent)
  } catch (error) {
    console.error('Error saving about content:', error)
    return NextResponse.json({ error: 'Failed to save about content' }, { status: 500 })
  }
}
