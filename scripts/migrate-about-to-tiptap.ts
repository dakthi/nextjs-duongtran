import { PrismaClient } from '@prisma/client'
import { generateHTML } from '@tiptap/html/server'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'

const prisma = new PrismaClient()

interface AboutSection {
  id: string
  title?: string
  image?: string
  imagePosition?: 'left' | 'right'
  body?: string[]
}

async function migrateAboutContent() {
  console.log('Starting migration of about content to TipTap format...')

  try {
    // Fetch all about content records
    const allRecords = await prisma.aboutContent.findMany()

    // Filter records that have sections but no contentJson
    const records = allRecords.filter(
      (record) => record.sections != null && record.contentJson == null
    )

    console.log(`Found ${records.length} records to migrate`)

    for (const record of records) {
      console.log(`\nMigrating record: ${record.id} (${record.locale})`)

      const sections = record.sections as unknown as AboutSection[]

      if (!sections || sections.length === 0) {
        console.log('  No sections found, skipping...')
        continue
      }

      // Build TipTap content structure
      const tiptapContent: any[] = []

      // Add headline as heading if it exists
      if (record.headline) {
        tiptapContent.push({
          type: 'heading',
          attrs: { level: 1 },
          content: [{ type: 'text', text: record.headline }],
        })
      }

      // Add intro as paragraph if it exists
      if (record.intro) {
        tiptapContent.push({
          type: 'paragraph',
          content: [{ type: 'text', text: record.intro }],
        })
      }

      // Convert each section
      sections.forEach((section, index) => {
        console.log(`  Converting section ${index + 1}: ${section.title || 'Untitled'}`)

        // Add section title as heading
        if (section.title) {
          tiptapContent.push({
            type: 'heading',
            attrs: { level: 2 },
            content: [{ type: 'text', text: section.title }],
          })
        }

        // Add section image if exists
        if (section.image) {
          tiptapContent.push({
            type: 'paragraph',
            content: [
              {
                type: 'image',
                attrs: {
                  src: section.image,
                  alt: section.title || '',
                  title: section.title || '',
                },
              },
            ],
          })
        }

        // Add body paragraphs
        if (section.body && Array.isArray(section.body)) {
          section.body.forEach((paragraph) => {
            if (paragraph.trim()) {
              tiptapContent.push({
                type: 'paragraph',
                content: [{ type: 'text', text: paragraph }],
              })
            }
          })
        }

        // Add spacing between sections (empty paragraph)
        if (index < sections.length - 1) {
          tiptapContent.push({
            type: 'paragraph',
          })
        }
      })

      // Create the TipTap document structure
      const contentJson = {
        type: 'doc',
        content: tiptapContent,
      }

      // Generate HTML from TipTap JSON
      const extensions = [StarterKit, Image, Link]
      const contentHtml = generateHTML(contentJson, extensions)

      console.log(`  Generated TipTap content with ${tiptapContent.length} elements`)

      // Update the record
      await prisma.aboutContent.update({
        where: { id: record.id },
        data: {
          contentJson: contentJson as any,
          contentHtml: contentHtml,
        },
      })

      console.log(`  ✓ Successfully migrated record ${record.id}`)
    }

    console.log('\n✓ Migration completed successfully!')
  } catch (error) {
    console.error('Migration failed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the migration
migrateAboutContent()
  .then(() => {
    console.log('\nDone!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\nMigration failed:', error)
    process.exit(1)
  })
