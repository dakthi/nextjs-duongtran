/**
 * Example seed file for Hero CMS Module
 *
 * INSTRUCTIONS:
 * 1. Check your existing Hero component to see what content it currently displays
 * 2. Replace the placeholder values below with your actual hero content
 * 3. Update image paths to match your project's public folder structure
 * 4. Modify statistics to reflect your organization's data
 * 5. Copy this to your project's prisma/seed.ts or integrate with existing seed file
 */

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// ⚠️ IMPORTANT: Replace these values with your actual hero content
// Look at your current Hero component and copy the existing fallback values
const DEFAULT_HERO_CONTENT = {
  // Site Information - Update with your organization's details
  site_title: 'YOUR_ORGANIZATION_NAME_HERE',              // e.g., 'West Acton Community Centre'
  site_description: 'YOUR_ORGANIZATION_DESCRIPTION_HERE', // e.g., 'Your local hub for community activities'

  // Hero Section - Main hero content
  hero_title: 'YOUR_HERO_TITLE_HERE',                     // Main headline (usually same as site_title)
  hero_subtitle: 'YOUR_HERO_SUBTITLE_HERE',               // Supporting text (1-2 sentences)
  hero_background_image: '/img/YOUR_HERO_IMAGE.jpg',      // Path to your hero background image
  hero_cta_button_text: 'YOUR_PRIMARY_BUTTON_TEXT',       // e.g., 'Explore Programs', 'Get Started'
  hero_cta_button_link: '/your-primary-link',             // e.g., '/programs', '/services'
  hero_secondary_button_text: 'YOUR_SECONDARY_BUTTON',    // e.g., 'Book Facilities', 'Contact Us'
  hero_secondary_button_link: '/your-secondary-link',     // e.g., '/facilities', '/contact'

  // Statistics - Update with your actual numbers
  residents_served: 'YOUR_STAT_1',                        // e.g., '2,000+', '500+ Clients'
  weekly_programs: 'YOUR_STAT_2',                         // e.g., '15+', '20 Services'
  opening_hours_text: 'YOUR_STAT_3',                      // e.g., '7 Days', 'Mon-Fri'
  main_hall_capacity: 'YOUR_STAT_4',                      // e.g., '120', '50 People'

  // Optional: Additional hero-related settings
  hero_overlay_opacity: '40',      // Background overlay darkness (0-100)
  hero_text_alignment: 'center',   // Text alignment: 'center', 'left', 'right'
  hero_stats_enabled: 'true'       // Show/hide statistics: 'true' or 'false'
}

// 📝 TODO: After updating the content above, you can customize these labels
// These are the labels that appear under each statistic in the hero section
const STATISTIC_LABELS = {
  residents_served: 'YOUR_STAT_1_LABEL',      // e.g., 'Residents Served', 'Happy Clients'
  weekly_programs: 'YOUR_STAT_2_LABEL',       // e.g., 'Weekly Programs', 'Services Offered'
  opening_hours_text: 'YOUR_STAT_3_LABEL',    // e.g., 'Days a Week', 'Operating Hours'
  main_hall_capacity: 'YOUR_STAT_4_LABEL'     // e.g., 'Main Hall Capacity', 'Max Capacity'
}

async function seedHeroContent() {
  console.log('🎨 Seeding Hero CMS content...')

  // Convert object to array of settings
  const heroSettings = Object.entries(DEFAULT_HERO_CONTENT).map(([key, value]) => {
    // Determine type based on key
    let type = 'text'
    let category = 'hero'

    if (key.includes('image')) type = 'image'
    if (key.includes('link') || key.includes('url')) type = 'url'
    if (key.includes('enabled')) type = 'boolean'
    if (key.includes('opacity')) type = 'number'

    // Categorize settings
    if (key.startsWith('site_')) category = 'site'
    if (key.includes('served') || key.includes('programs') || key.includes('hours') || key.includes('capacity')) {
      category = 'hero_stats'
    }

    return {
      key,
      value: String(value),
      type,
      category,
      description: `Hero CMS: ${key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`
    }
  })

  // Upsert all hero settings
  for (const setting of heroSettings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: {
        value: setting.value,
        type: setting.type,
        category: setting.category,
        description: setting.description
      },
      create: setting
    })
  }

  console.log(`✅ Created/updated ${heroSettings.length} hero settings`)
}

async function seedAdminUser() {
  console.log('👤 Creating admin user...')

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com'
  const adminPassword = process.env.ADMIN_PASSWORD || 'changeme123'

  // Hash the password
  const hashedPassword = await bcrypt.hash(adminPassword, 10)

  // Create or update admin user
  const user = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      name: 'Admin User',
      password: hashedPassword,
      role: 'admin',
      active: true
    },
    create: {
      email: adminEmail,
      name: 'Admin User',
      password: hashedPassword,
      role: 'admin',
      active: true
    }
  })

  console.log('✅ Admin user created/updated')
  console.log('📧 Email:', adminEmail)
  console.log('🔑 Password:', adminPassword)
  console.log('⚠️  Remember to change the password after first login!')

  return user
}

async function seedSampleImages() {
  console.log('🖼️  Creating sample media items...')

  const sampleImages = [
    {
      filename: 'hero-default.jpg',
      originalName: 'hero-default.jpg',
      filePath: '/img/entrance.jpeg',
      fileType: 'image/jpeg',
      fileSize: 245000,
      altText: 'Community centre entrance',
      width: 1920,
      height: 1080
    },
    {
      filename: 'main-hall.jpg',
      originalName: 'main-hall.jpg',
      filePath: '/img/main-hall.jpeg',
      fileType: 'image/jpeg',
      fileSize: 189000,
      altText: 'Main hall interior',
      width: 1600,
      height: 900
    },
    {
      filename: 'community-event.jpg',
      originalName: 'community-event.jpg',
      filePath: '/img/community-event.jpeg',
      fileType: 'image/jpeg',
      fileSize: 210000,
      altText: 'Community event in progress',
      width: 1600,
      height: 900
    }
  ]

  // Only create if MediaItem model exists
  try {
    for (const image of sampleImages) {
      await prisma.mediaItem.upsert({
        where: {
          filename: image.filename
        },
        update: image,
        create: image
      })
    }
    console.log(`✅ Created ${sampleImages.length} sample media items`)
  } catch (error) {
    console.log('ℹ️  MediaItem model not found - skipping media seeding')
  }
}

async function main() {
  console.log('🚀 Starting Hero CMS seed...')

  try {
    // Seed hero content
    await seedHeroContent()

    // Seed admin user
    await seedAdminUser()

    // Optional: seed sample images
    await seedSampleImages()

    console.log('🎉 Hero CMS seed completed successfully!')
    console.log('')
    console.log('📌 Next steps:')
    console.log('1. Navigate to /admin/login')
    console.log('2. Login with the admin credentials above')
    console.log('3. Go to /admin/hero to manage hero content')
    console.log('4. Visit homepage to see the hero section')

  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  }
}

// Execute the seed
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

// Export for use in other seed files
export { seedHeroContent, seedAdminUser, DEFAULT_HERO_CONTENT }