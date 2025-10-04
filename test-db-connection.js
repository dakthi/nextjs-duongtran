const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('Testing database connection...');

    await prisma.$connect();
    console.log('✅ Successfully connected to database');

    const userCount = await prisma.user.count();
    console.log(`📊 Found ${userCount} users in database`);

    const result = await prisma.$queryRaw`SELECT current_database(), current_user, version()`;
    console.log('📍 Database info:', result[0]);

    console.log('✅ Database connection test completed successfully!');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();