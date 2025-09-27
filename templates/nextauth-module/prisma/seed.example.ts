/**
 * NextAuth Admin User Seeding
 *
 * Copy this to your prisma/seed.ts or integrate with existing seed file
 * Creates a default admin user for authentication testing
 */

import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../lib/password'

const prisma = new PrismaClient()

/**
 * Seed admin user for NextAuth authentication
 */
export async function seedAdminUser() {
  console.log('👤 Creating NextAuth admin user...')

  // Get admin credentials from environment or use defaults
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com'
  const adminPassword = process.env.ADMIN_PASSWORD || 'changeme123'
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
        active: true,
        updatedAt: new Date()
      },
      create: {
        email: adminEmail,
        name: adminName,
        password: hashedPassword,
        role: 'admin',
        active: true
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
 * Create additional test users (optional)
 */
export async function seedTestUsers() {
  console.log('👥 Creating test users...')

  const testUsers = [
    {
      email: 'editor@example.com',
      name: 'Editor User',
      password: 'editor123',
      role: 'editor'
    },
    {
      email: 'user@example.com',
      name: 'Regular User',
      password: 'user123',
      role: 'user'
    }
  ]

  const createdUsers = []

  for (const userData of testUsers) {
    try {
      const hashedPassword = await hashPassword(userData.password)

      const user = await prisma.user.upsert({
        where: { email: userData.email },
        update: {
          name: userData.name,
          password: hashedPassword,
          role: userData.role,
          active: true,
          updatedAt: new Date()
        },
        create: {
          email: userData.email,
          name: userData.name,
          password: hashedPassword,
          role: userData.role,
          active: true
        }
      })

      createdUsers.push(user)
      console.log(`   ✓ ${userData.role}: ${userData.email}`)

    } catch (error) {
      console.error(`   ✗ Failed to create ${userData.email}:`, error)
    }
  }

  console.log(`✅ Created ${createdUsers.length} test users`)
  return createdUsers
}

/**
 * Clean up existing authentication data (use carefully!)
 */
export async function cleanAuthData() {
  console.log('🧹 Cleaning existing authentication data...')

  try {
    // Delete in order due to foreign key constraints
    await prisma.session.deleteMany()
    await prisma.account.deleteMany()
    // Note: Users are not deleted here for safety

    console.log('✅ Authentication data cleaned')
  } catch (error) {
    console.error('❌ Error cleaning auth data:', error)
    throw error
  }
}

/**
 * Main seeding function - integrate with your existing seed file
 */
async function main() {
  console.log('🔐 Starting NextAuth seeding...')

  try {
    // Optional: Clean existing auth data (uncomment if needed)
    // await cleanAuthData()

    // Create admin user
    await seedAdminUser()

    // Optional: Create test users for development
    if (process.env.NODE_ENV === 'development') {
      await seedTestUsers()
    }

    console.log('')
    console.log('🎉 NextAuth seeding completed successfully!')
    console.log('')
    console.log('📋 Summary:')
    console.log('   - Admin user created with credentials above')
    console.log('   - Test users created (development only)')
    console.log('   - Database is ready for NextAuth authentication')
    console.log('')
    console.log('🔒 Security Reminder:')
    console.log('   Remember to change default passwords after first login!')

  } catch (error) {
    console.error('❌ NextAuth seeding failed:', error)
    throw error
  }
}

// Run if this file is executed directly
if (require.main === module) {
  main()
    .catch((e) => {
      console.error(e)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
}

// Export functions for use in other seed files
export { main as seedNextAuth }