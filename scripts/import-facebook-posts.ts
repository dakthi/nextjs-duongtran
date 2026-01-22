/**
 * Script to import Facebook posts from gallery-index.json to the database
 */

import { prisma } from '../src/lib/prisma'
import fs from 'fs'
import path from 'path'

const RESOURCES_DIR = path.join(process.cwd(), '.resources/facebook-gallery')
const PUBLIC_BLOG_DIR = path.join(process.cwd(), 'public/img/blog')

interface FacebookPost {
  postId: string
  folder: string
  images: string[]
  message: string
  name: string
  timestamp: string
  yearMonth: string
  likesCount: number
  commentsCount: number
  sharesCount: number
  type: string
  url: string
}

// Generate a URL-friendly slug from Vietnamese text
function generateSlug(text: string, postId: string): string {
  // Remove Vietnamese diacritics
  const normalized = text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 50)
    .replace(/-$/, '')

  // Add postId suffix for uniqueness
  return `${normalized}-${postId.slice(-6)}`
}

// Generate title from first line of message
function generateTitle(message: string): string {
  const firstLine = message.split('\n')[0].trim()
  // Remove quotes and limit length
  const cleaned = firstLine.replace(/^[""]|[""]$/g, '').substring(0, 100)
  return cleaned || 'Untitled post'
}

// Generate excerpt from message
function generateExcerpt(message: string): string {
  // Take first 200 chars, break at word boundary
  const cleaned = message.replace(/\n+/g, ' ').trim()
  if (cleaned.length <= 200) return cleaned
  return cleaned.substring(0, 200).replace(/\s+\S*$/, '') + '...'
}

// Calculate reading time (average 200 words per minute for Vietnamese)
function calculateReadingTime(message: string): number {
  const wordCount = message.split(/\s+/).length
  return Math.max(1, Math.ceil(wordCount / 200))
}

// Convert plain text to TipTap JSON
function textToTipTapJson(text: string): any {
  const lines = text.split('\n')
  const content: any[] = []
  let currentParagraph: string[] = []

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const paragraphText = currentParagraph.join(' ').trim()
      if (paragraphText) {
        content.push({
          type: 'paragraph',
          content: [{ type: 'text', text: paragraphText }]
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

    // Bullet list item
    if (trimmed.startsWith('-') || trimmed.startsWith('•') || trimmed.match(/^[1-9]️⃣/)) {
      flushParagraph()
      const itemText = trimmed.replace(/^[-•]\s*/, '').replace(/^[1-9]️⃣\s*/, '')

      // Check if we need to create a new list or add to existing
      const lastItem = content[content.length - 1]
      if (lastItem?.type === 'bulletList') {
        lastItem.content.push({
          type: 'listItem',
          content: [{
            type: 'paragraph',
            content: [{ type: 'text', text: itemText }]
          }]
        })
      } else {
        content.push({
          type: 'bulletList',
          content: [{
            type: 'listItem',
            content: [{
              type: 'paragraph',
              content: [{ type: 'text', text: itemText }]
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

// Convert plain text to HTML
function textToHtml(text: string): string {
  const lines = text.split('\n')
  let html = ''
  let inList = false

  for (const line of lines) {
    const trimmed = line.trim()

    if (!trimmed) {
      if (inList) {
        html += '</ul>'
        inList = false
      }
      continue
    }

    if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
      if (!inList) {
        html += '<ul>'
        inList = true
      }
      const itemText = trimmed.replace(/^[-•]\s*/, '')
      html += `<li>${escapeHtml(itemText)}</li>`
    } else {
      if (inList) {
        html += '</ul>'
        inList = false
      }
      html += `<p>${escapeHtml(trimmed)}</p>`
    }
  }

  if (inList) {
    html += '</ul>'
  }

  return html
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Copy image to public folder and return new path
function copyImage(imagePath: string, postId: string): string | null {
  const sourcePath = path.join(RESOURCES_DIR, imagePath.replace('/gallery/', ''))

  if (!fs.existsSync(sourcePath)) {
    console.log(`  ⚠️  Image not found: ${sourcePath}`)
    return null
  }

  // Ensure blog directory exists
  if (!fs.existsSync(PUBLIC_BLOG_DIR)) {
    fs.mkdirSync(PUBLIC_BLOG_DIR, { recursive: true })
  }

  const ext = path.extname(imagePath)
  const newFilename = `${postId}${ext}`
  const destPath = path.join(PUBLIC_BLOG_DIR, newFilename)

  fs.copyFileSync(sourcePath, destPath)
  return `/img/blog/${newFilename}`
}

// Categorize post based on content
function categorizePost(message: string): string {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes('coaching') || lowerMessage.includes('coach') || lowerMessage.includes('khai vấn')) {
    return 'Coaching'
  }
  if (lowerMessage.includes('mentoring') || lowerMessage.includes('mentor') || lowerMessage.includes('hướng dẫn')) {
    return 'Mentoring'
  }
  if (lowerMessage.includes('scholarship') || lowerMessage.includes('học bổng') || lowerMessage.includes('apply')) {
    return 'Scholarships'
  }
  if (lowerMessage.includes('university') || lowerMessage.includes('đại học') || lowerMessage.includes('ngành học')) {
    return 'Education'
  }
  if (lowerMessage.includes('career') || lowerMessage.includes('nghề') || lowerMessage.includes('sự nghiệp')) {
    return 'Career'
  }
  if (lowerMessage.includes('personal development') || lowerMessage.includes('bản thân') || lowerMessage.includes('phát triển')) {
    return 'Personal growth'
  }

  return 'Reflections'
}

async function importFacebookPosts() {
  // Read gallery index
  const indexPath = path.join(RESOURCES_DIR, 'gallery-index.json')
  const posts: FacebookPost[] = JSON.parse(fs.readFileSync(indexPath, 'utf8'))

  console.log(`Found ${posts.length} posts to import`)

  // Filter out posts with very short messages (likely just photo captions)
  const substantivePosts = posts.filter(p => p.message && p.message.length > 100)
  console.log(`Filtering to ${substantivePosts.length} substantive posts (100+ chars)`)

  let created = 0
  let updated = 0
  let skipped = 0

  for (const post of substantivePosts) {
    try {
      const slug = generateSlug(post.name || post.message, post.postId)
      const title = generateTitle(post.message)
      const excerpt = generateExcerpt(post.message)
      const readingTime = calculateReadingTime(post.message)
      const category = categorizePost(post.message)
      const contentJson = textToTipTapJson(post.message)
      const contentHtml = textToHtml(post.message)

      // Copy first image if available
      let imagePath: string | null = null
      if (post.images && post.images.length > 0) {
        imagePath = copyImage(post.images[0], post.postId)
      }

      // Format date
      const publishedDate = new Date(post.timestamp).toISOString().split('T')[0]

      // Check if post already exists
      const existing = await prisma.blogPost.findFirst({
        where: { locale: 'vi', slug }
      })

      if (existing) {
        await prisma.blogPost.update({
          where: { id: existing.id },
          data: {
            title,
            excerpt,
            content: post.message,
            contentJson,
            contentHtml,
            image: imagePath || existing.image,
            category,
            readingTime,
            publishedDate,
            isPublished: true,
          }
        })
        updated++
        console.log(`  ✅ Updated: ${title.substring(0, 50)}...`)
      } else {
        await prisma.blogPost.create({
          data: {
            locale: 'vi',
            slug,
            title,
            excerpt,
            content: post.message,
            contentJson,
            contentHtml,
            image: imagePath,
            category,
            readingTime,
            publishedDate,
            isFeatured: false,
            isPublished: true,
          }
        })
        created++
        console.log(`  ✅ Created: ${title.substring(0, 50)}...`)
      }
    } catch (error) {
      console.error(`  ❌ Error importing post ${post.postId}:`, error)
      skipped++
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log(`Import complete!`)
  console.log(`  Created: ${created}`)
  console.log(`  Updated: ${updated}`)
  console.log(`  Skipped: ${skipped}`)
  console.log('='.repeat(60))
}

// Run the import
console.log('='.repeat(60))
console.log('Importing Facebook posts to database')
console.log('='.repeat(60) + '\n')

importFacebookPosts()
  .catch(error => {
    console.error('Import failed:', error)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })
