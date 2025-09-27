/**
 * Prisma Seed Script
 *
 * Seeds the database with initial data including admin user for NextAuth
 */

import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../src/lib/password'

const prisma = new PrismaClient()

/**
 * Seed admin user for NextAuth authentication
 */
async function seedAdminUser() {
  console.log('👤 Creating NextAuth admin user...')

  // Get admin credentials from environment or use defaults
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@lieuvo.com'
  const adminPassword = process.env.ADMIN_PASSWORD || 'LieuVoAdmin123!'
  const adminName = process.env.ADMIN_NAME || 'Admin User'

  try {
    // Hash the password
    const hashedPassword = await hashPassword(adminPassword)

    // Create or update admin user
    const adminUser = await prisma.user.upsert({
      where: {
        email: adminEmail
      },
      update: {
        name: adminName,
        password: hashedPassword,
        role: 'admin',
        updatedAt: new Date()
      },
      create: {
        email: adminEmail,
        name: adminName,
        password: hashedPassword,
        role: 'admin'
      }
    })

    console.log('✅ Admin user created/updated successfully!')
    console.log('')
    console.log('🔑 Admin Login Credentials:')
    console.log(`   📧 Email: ${adminEmail}`)
    console.log(`   🔐 Password: ${adminPassword}`)
    console.log(`   👤 Role: ${adminUser.role}`)
    console.log(`   📅 Created: ${adminUser.createdAt}`)
    console.log('')
    console.log('⚠️  IMPORTANT SECURITY NOTES:')
    console.log('   1. Change the admin password after first login!')
    console.log('   2. Set strong ADMIN_EMAIL and ADMIN_PASSWORD environment variables')
    console.log('   3. Never commit default credentials to version control')
    console.log('   4. Use strong passwords in production')
    console.log('')
    console.log('🚀 Next Steps:')
    console.log('   1. Navigate to /admin/login')
    console.log('   2. Sign in with the credentials above')
    console.log('   3. Change your password in user settings')

    return adminUser

  } catch (error) {
    console.error('❌ Error creating admin user:', error)
    throw error
  }
}

/**
 * Seed initial hero content
 */
async function seedHeroContent() {
  console.log('🦸 Creating initial hero content...')

  try {
    const heroContent = await prisma.heroContent.upsert({
      where: { id: 'default' },
      update: {},
      create: {
        id: 'default',
        title: 'Welcome to LieuVo',
        subtitle: 'Tax & Business Finance Consultancy',
        description: 'Helping the Vietnamese community in the UK understand taxes and business finances with expert guidance and support.',
        ctaText: 'Get Started',
        ctaLink: '/contact',
        isActive: true
      }
    })

    console.log('✅ Hero content created/updated successfully!')
    return heroContent
  } catch (error) {
    console.error('❌ Error creating hero content:', error)
    throw error
  }
}

/**
 * Main seeding function
 */
async function main() {
  console.log('🌱 Starting database seeding...')

  try {
    // Seed admin user for authentication
    await seedAdminUser()

    // Seed initial content
    await seedHeroContent()

    console.log('')
    console.log('🎉 Database seeding completed successfully!')
    console.log('')
    console.log('📋 Summary:')
    console.log('   - Admin user created for authentication')
    console.log('   - Initial hero content created')
    console.log('   - Database is ready for use')
    console.log('')
    console.log('🔒 Security Reminder:')
    console.log('   Remember to change default passwords after first login!')

  } catch (error) {
    console.error('❌ Database seeding failed:', error)
    throw error
  }
}

// Run the seeding
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })