/**
 * Script to import a markdown file to the database as a blog post
 */

import { prisma } from '../src/lib/prisma'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'

// Convert markdown to HTML
async function markdownToHtml(markdown: string): Promise<string> {
  const processed = await remark()
    .use(remarkGfm)
    .use(html)
    .process(markdown)

  return processed.toString()
}

// Convert markdown to TipTap JSON format
function markdownToTipTapJson(markdown: string): any {
  const lines = markdown.split('\n')
  const content: any[] = []
  let currentParagraph: string[] = []

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(' ').trim()
      if (text) {
        content.push({
          type: 'paragraph',
          content: [{ type: 'text', text }]
        })
      }
      currentParagraph = []
    }
  }

  for (const line of lines) {
    const trimmed = line.trim()

    // Empty line - flush paragraph
    if (!trimmed) {
      flushParagraph()
      continue
    }

    // Heading
    if (trimmed.startsWith('#')) {
      flushParagraph()
      const level = trimmed.match(/^#+/)?.[0].length || 2
      const text = trimmed.replace(/^#+\s*/, '').replace(/\*\*/g, '')
      content.push({
        type: 'heading',
        attrs: { level: Math.min(Math.max(level, 2), 4) },
        content: [{ type: 'text', text }]
      })
      continue
    }

    // Bullet list item
    if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
      flushParagraph()
      const text = trimmed.replace(/^[-•]\s*/, '').replace(/\*\*/g, '')

      // Check if we need to create a new list or add to existing
      const lastItem = content[content.length - 1]
      if (lastItem?.type === 'bulletList') {
        lastItem.content.push({
          type: 'listItem',
          content: [{
            type: 'paragraph',
            content: [{ type: 'text', text }]
          }]
        })
      } else {
        content.push({
          type: 'bulletList',
          content: [{
            type: 'listItem',
            content: [{
              type: 'paragraph',
              content: [{ type: 'text', text }]
            }]
          }]
        })
      }
      continue
    }

    // Regular paragraph text
    currentParagraph.push(trimmed)
  }

  // Flush any remaining paragraph
  flushParagraph()

  return {
    type: 'doc',
    content
  }
}

async function importMarkdownPost(filename: string, locale: string = 'en') {
  const postsDirectory = path.join(process.cwd(), 'src/content/posts')
  const fullPath = path.join(postsDirectory, filename)

  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${fullPath}`)
  }

  console.log(`Reading file: ${filename}`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  console.log(`Processing content for: ${data.title}`)

  // Generate slug from filename
  const slug = filename.replace(/\.md$/, '')

  // Convert content to TipTap JSON and HTML
  const contentJson = markdownToTipTapJson(content)
  const contentHtml = await markdownToHtml(content)

  // Check if post already exists
  const existing = await prisma.blogPost.findFirst({
    where: { locale, slug }
  })

  if (existing) {
    console.log(`⚠️  Post already exists with slug "${slug}" and locale "${locale}"`)
    console.log(`Updating existing post...`)

    await prisma.blogPost.update({
      where: { id: existing.id },
      data: {
        title: data.title,
        excerpt: data.excerpt || null,
        content: content,
        contentJson,
        contentHtml,
        image: data.image || null,
        category: data.category || null,
        quote: data.quote || null,
        readingTime: data.readingTime || null,
        publishedDate: data.date || null,
        clientName: data.client?.name || null,
        clientAge: data.client?.age || null,
        clientJob: data.client?.job || null,
        clientImage: data.client?.image || null,
        expertName: data.expert?.name || null,
        expertTitle: data.expert?.title || null,
        expertImage: data.expert?.image || null,
        isFeatured: false,
        isPublished: true,
      }
    })

    console.log(`✅ Updated post: ${data.title}`)
  } else {
    await prisma.blogPost.create({
      data: {
        locale,
        slug,
        title: data.title,
        excerpt: data.excerpt || null,
        content: content,
        contentJson,
        contentHtml,
        image: data.image || null,
        category: data.category || null,
        quote: data.quote || null,
        readingTime: data.readingTime || null,
        publishedDate: data.date || null,
        clientName: data.client?.name || null,
        clientAge: data.client?.age || null,
        clientJob: data.client?.job || null,
        clientImage: data.client?.image || null,
        expertName: data.expert?.name || null,
        expertTitle: data.expert?.title || null,
        expertImage: data.expert?.image || null,
        isFeatured: false,
        isPublished: true,
      }
    })

    console.log(`✅ Created post: ${data.title}`)
  }
}

// Run the import
const filename = process.argv[2] || 'sole-trader-or-ltd-2.md'
const locale = process.argv[3] || 'en'

console.log('='.repeat(60))
console.log('Importing markdown post to database')
console.log('='.repeat(60))
console.log(`File: ${filename}`)
console.log(`Locale: ${locale}`)
console.log('='.repeat(60) + '\n')

importMarkdownPost(filename, locale)
  .then(() => {
    console.log('\n' + '='.repeat(60))
    console.log('Import complete!')
    console.log('='.repeat(60))
  })
  .catch(error => {
    console.error('Import failed:', error)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })
