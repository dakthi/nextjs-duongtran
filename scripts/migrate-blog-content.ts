/**
 * Migration script to convert legacy markdown content to TipTap JSON format
 * This script reads all blog posts and converts their markdown content to:
 * - contentJson: TipTap JSON format for the editor
 * - contentHtml: Rendered HTML for display
 */

import { prisma } from '../src/lib/prisma'
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
    if (trimmed.startsWith('##')) {
      flushParagraph()
      const level = trimmed.match(/^#+/)?.[0].length || 2
      const text = trimmed.replace(/^#+\s*/, '')
      content.push({
        type: 'heading',
        attrs: { level: Math.min(level, 4) },
        content: [{ type: 'text', text }]
      })
      continue
    }

    // Bullet list item
    if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
      flushParagraph()
      const text = trimmed.replace(/^[-•]\s*/, '')

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

async function migrateBlogPosts() {
  console.log('Starting blog content migration...\n')

  // Get all blog posts
  const posts = await prisma.blogPost.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      content: true,
      contentJson: true,
      contentHtml: true
    }
  })

  console.log(`Found ${posts.length} blog posts\n`)

  let updated = 0
  let skipped = 0
  let errors = 0

  for (const post of posts) {
    try {
      // Skip if already has contentJson and contentHtml
      if (post.contentJson && post.contentHtml) {
        console.log(`⏭️  Skipping "${post.title}" - already has TipTap content`)
        skipped++
        continue
      }

      console.log(`🔄 Processing "${post.title}"...`)

      // Convert markdown content to TipTap JSON and HTML
      const contentJson = markdownToTipTapJson(post.content)
      const contentHtml = await markdownToHtml(post.content)

      // Update the post
      await prisma.blogPost.update({
        where: { id: post.id },
        data: {
          contentJson,
          contentHtml
        }
      })

      console.log(`✅ Updated "${post.title}"`)
      updated++

    } catch (error) {
      console.error(`❌ Error processing "${post.title}":`, error)
      errors++
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log('Migration complete!')
  console.log('='.repeat(60))
  console.log(`✅ Updated: ${updated}`)
  console.log(`⏭️  Skipped: ${skipped}`)
  console.log(`❌ Errors: ${errors}`)
  console.log(`📊 Total: ${posts.length}`)
  console.log('='.repeat(60) + '\n')
}

// Run the migration
migrateBlogPosts()
  .catch(error => {
    console.error('Migration failed:', error)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })
