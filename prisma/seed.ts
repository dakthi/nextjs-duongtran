/**
 * Prisma Seed Script
 *
 * Seeds the database with initial data including admin user for NextAuth
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

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
 * Seed initial hero content for multiple locales
 */
async function seedHeroContent() {
  console.log('🦸 Creating initial hero content for EN and VI...')

  const heroContentData = [
    {
      locale: 'en',
      title: 'Welcome to LieuVo',
      subtitle: 'Tax & Business Finance Consultancy',
      description: 'Helping the Vietnamese community in the UK understand taxes and business finances with expert guidance and support.',
      ctaText: 'Get Started',
      ctaLink: '/contact',
      isActive: true
    },
    {
      locale: 'vi',
      title: 'Chào Mừng Đến LieuVo',
      subtitle: 'Tư Vấn Thuế & Tài Chính Doanh Nghiệp',
      description: 'Giúp cộng đồng người Việt tại Anh hiểu về thuế và tài chính doanh nghiệp với sự hướng dẫn và hỗ trợ chuyên nghiệp.',
      ctaText: 'Bắt Đầu',
      ctaLink: '/contact',
      isActive: true
    }
  ]

  try {
    for (const data of heroContentData) {
      await prisma.heroContent.upsert({
        where: { locale: data.locale },
        update: data,
        create: data
      })
    }

    console.log('✅ Hero content created/updated for both EN and VI!')
    return heroContentData
  } catch (error) {
    console.error('❌ Error creating hero content:', error)
    throw error
  }
}

/**
 * Seed blog posts from markdown content directory
 */
async function seedBlogPosts() {
  console.log('📝 Importing blog posts from markdown...')

  const postsDirectory = path.join(process.cwd(), 'src', 'content', 'posts')

  if (!fs.existsSync(postsDirectory)) {
    console.warn('⚠️  No markdown posts found, skipping blog post seeding')
    return
  }

  try {
    const files = fs.readdirSync(postsDirectory).filter(file => file.endsWith('.md'))

    for (const file of files) {
      const slug = file.replace(/\.md$/, '')
      const filePath = path.join(postsDirectory, file)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)

      const readingTime = typeof data.readingTime === 'number'
        ? data.readingTime
        : data.readingTime
          ? parseInt(String(data.readingTime), 10) || null
          : null

      const client = data.client ?? {}
      const expert = data.expert ?? {}

      await prisma.blogPost.upsert({
        where: {
          locale_slug: {
            locale: 'en', // Default to English
            slug
          }
        },
        update: {
          locale: 'en', // Default to English
          title: String(data.title ?? slug),
          excerpt: data.excerpt ? String(data.excerpt) : null,
          content,
          image: data.image ? String(data.image) : null,
          category: data.category ? String(data.category) : null,
          quote: data.quote ? String(data.quote) : null,
          readingTime: readingTime ?? undefined,
          publishedDate: data.date ? String(data.date) : null,
          clientName: client?.name ? String(client.name) : null,
          clientAge: typeof client?.age === 'number'
            ? client.age
            : client?.age
              ? parseInt(String(client.age), 10) || null
              : null,
          clientJob: client?.job ? String(client.job) : null,
          clientImage: client?.image ? String(client.image) : null,
          expertName: expert?.name ? String(expert.name) : null,
          expertTitle: expert?.title ? String(expert.title) : null,
          expertImage: expert?.image ? String(expert.image) : null,
          isPublished: data.isPublished === false ? false : true,
          isFeatured: data.isFeatured === true,
        },
        create: {
          locale: 'en', // Default to English
          slug,
          title: String(data.title ?? slug),
          excerpt: data.excerpt ? String(data.excerpt) : null,
          content,
          image: data.image ? String(data.image) : null,
          category: data.category ? String(data.category) : null,
          quote: data.quote ? String(data.quote) : null,
          readingTime: readingTime ?? undefined,
          publishedDate: data.date ? String(data.date) : null,
          clientName: client?.name ? String(client.name) : null,
          clientAge: typeof client?.age === 'number'
            ? client.age
            : client?.age
              ? parseInt(String(client.age), 10) || null
              : null,
          clientJob: client?.job ? String(client.job) : null,
          clientImage: client?.image ? String(client.image) : null,
          expertName: expert?.name ? String(expert.name) : null,
          expertTitle: expert?.title ? String(expert.title) : null,
          expertImage: expert?.image ? String(expert.image) : null,
          isPublished: data.isPublished === false ? false : true,
          isFeatured: data.isFeatured === true,
        }
      })
    }

    console.log(`✅ Seeded ${files.length} blog posts`)
  } catch (error) {
    console.error('❌ Error seeding blog posts:', error)
    throw error
  }
}

/**
 * Seed About page content with structured sections
 */
async function seedAboutContent() {
  console.log('ℹ️  Creating default about page content...')

  const aboutSections = [
    {
      id: 'section-1',
      title: 'About Me',
      image: '/img/lieu/lieu-2.jpeg',
      imagePosition: 'left',
      body: [
        'I didn’t start out wanting to be an accountant — but I’ve come to love this work deeply. Today, I help founders and small businesses understand their finances, make smarter decisions, and grow with clarity and confidence.',
        'When I was younger, I dreamed of becoming a doctor — it felt like the best way to help people. That’s what led me to study medicine. But during my first year at university, I realised something important: even though I admired the profession, it didn’t align with my strengths or what I wanted to do every day.',
        'Later on, I came across accounting — almost by chance. The more I studied it, the more I enjoyed it. Maybe it was my love for numbers, or maybe it was something deeper. I discovered that accounting wasn’t just about spreadsheets or tax — it was a way to support people in a very real, impactful way.',
        'Today, I work with founders and small business owners — especially those just starting out — and I focus on more than just getting the job done. I walk alongside them. I explain the why behind the numbers. I build systems that save time. I help them feel confident in decisions, not just compliant.'
      ]
    },
    {
      id: 'section-2',
      title: 'How I Work',
      image: '/img/lieu/lieu-3.jpeg',
      imagePosition: 'right',
      body: [
        'I believe accounting isn’t just a service. It’s a relationship built on trust and shared growth. I care deeply about the people I work with, and I take full responsibility for my clients. I don’t just want to tell you what you owe in tax — I want you to understand what’s really going on, and how to move forward with clarity.',
        'I’m completing the final stage of my ACCA qualification and have over three years of hands-on experience. Alongside that, I’ve taught myself automation using Python and APIs, built internal tools to save teams hours of work, and created documentation and training resources that scale well across growing companies.'
      ]
    },
    {
      id: 'section-3',
      title: 'What Matters Most',
      image: '/img/lieu/lieu-1.jpeg',
      imagePosition: 'left',
      body: [
        'I especially love working with startups. Many founders begin with zero knowledge of tax or accounting, and that’s perfectly okay. Everyone starts somewhere. I help them make those first decisions — whether it’s choosing a business structure, understanding cost strategy, or getting ready for their first VAT return.',
        'For me, AI is not a threat — it’s a tool. I use it to automate admin, so I can focus more on conversations, planning, and strategy. I’ve built scripts that pull company data, rename 500+ invoice files, and even process PDFs to Excel in seconds — all so we can spend more time on what matters.',
        'When I work inside a company, I treat it as if it were my own. I don’t just do tasks — I look for systems that can improve the way the team works. That’s what I love: solving real problems, creating lasting value, and building clarity into the backbone of the business.',
        'If you’re a founder or small business owner and want to work with someone who truly cares — about both your business and your peace of mind — I’d love to meet.'
      ]
    }
  ]

  try {
    await prisma.aboutContent.upsert({
      where: {
        locale_slug: {
          locale: 'en',
          slug: 'default'
        }
      },
      update: {
        locale: 'en',
        headline: 'Here to make your numbers human',
        intro: 'A compassionate accountant helping founders and families build stronger businesses with clarity and care.',
        sections: aboutSections,
        isActive: true,
      },
      create: {
        locale: 'en',
        slug: 'default',
        headline: 'Here to make your numbers human',
        intro: 'A compassionate accountant helping founders and families build stronger businesses with clarity and care.',
        sections: aboutSections,
        isActive: true,
      }
    })

    console.log('✅ About content seeded')
  } catch (error) {
    console.error('❌ Error seeding about content:', error)
    throw error
  }
}

/**
 * Seed testimonials with starter content for multiple locales
 */
async function seedTestimonials() {
  console.log('💬 Seeding testimonials for EN and VI...')

  const testimonialsData = [
    // English testimonials
    {
      locale: 'en',
      slug: 'james-price-en',
      name: 'James Price',
      role: 'Creative Industries Accounts Assistant',
      dateLabel: 'June 2025',
      relationship: 'Worked with Lieu on the same team',
      image: '/img/testimonials/james-price.jpeg',
      body: [
        `Lieu is a talented and ambitious woman with a range of skills spanning the full spectrum of accountancy. During my time working alongside her, I benefited greatly from her guidance - especially in developing my technical knowledge.`,
        `She is kind, helpful, and extremely skilled. Her attention to detail is exceptional, and she consistently produces work of the highest standard. Lieu communicates complex information clearly to both internal teams and external clients - even those with no background in finance.`,
        `She's always learning, always improving, and actively drives positive change in the workplace. I've seen firsthand how her programming and automation skills have saved time and made our processes far more efficient.`,
        `I would not hesitate to recommend her to any future employer. She's a brilliant asset to any team.`
      ]
    },
    {
      locale: 'en',
      slug: 'duc-nguyen-en',
      name: 'Duc Nguyen',
      role: "Accounts Assistant, MSc FinTech '24",
      dateLabel: 'May 2025',
      relationship: 'Reported directly to Lieu',
      image: '/img/testimonials/duc-nguyen.jpeg',
      body: [
        `I've learned so much from working with Lieu. She has excellent technical knowledge - especially around tax - and her work is always detailed, organised, and deeply trusted by clients.`,
        `What stands out most is her supportive nature and calm, practical problem-solving. No matter how busy things get, she always takes time to help the team.`,
        `On top of that, she's built automation tools that save us a huge amount of time. Her ability to combine deep expertise with efficiency is rare - she's someone you can learn a lot from, and she's a true asset to any team.`
      ]
    },
    // Vietnamese testimonials
    {
      locale: 'vi',
      slug: 'james-price-vi',
      name: 'James Price',
      role: 'Trợ Lý Kế Toán Ngành Sáng Tạo',
      dateLabel: 'Tháng 6 2025',
      relationship: 'Đã làm việc cùng Lieu trong cùng một đội',
      image: '/img/testimonials/james-price.jpeg',
      body: [
        `Lieu là một người phụ nữ tài năng và có tham vọng với nhiều kỹ năng trải dài toàn bộ phạm vi kế toán. Trong thời gian làm việc cùng cô ấy, tôi đã được hưởng lợi rất nhiều từ sự hướng dẫn của cô - đặc biệt trong việc phát triển kiến thức chuyên môn.`,
        `Cô ấy tốt bụng, hữu ích và cực kỳ có kỹ năng. Sự chú ý đến chi tiết của cô ấy là đặc biệt, và cô ấy luôn tạo ra công việc có tiêu chuẩn cao nhất. Lieu giao tiếp thông tin phức tạp một cách rõ ràng với cả đội ngũ nội bộ và khách hàng bên ngoài.`,
        `Cô ấy luôn học hỏi, luôn cải thiện và tích cực thúc đẩy thay đổi tích cực tại nơi làm việc. Tôi đã chứng kiến tận mắt cách kỹ năng lập trình và tự động hóa của cô ấy đã tiết kiệm thời gian và làm cho quy trình của chúng tôi hiệu quả hơn nhiều.`,
        `Tôi sẽ không ngần ngại giới thiệu cô ấy cho bất kỳ nhà tuyển dụng nào trong tương lai. Cô ấy là một tài sản tuyệt vời cho bất kỳ đội nào.`
      ]
    },
    {
      locale: 'vi',
      slug: 'duc-nguyen-vi',
      name: 'Duc Nguyen',
      role: "Trợ Lý Kế Toán, Thạc Sĩ FinTech '24",
      dateLabel: 'Tháng 5 2025',
      relationship: 'Báo cáo trực tiếp với Lieu',
      image: '/img/testimonials/duc-nguyen.jpeg',
      body: [
        `Tôi đã học được rất nhiều từ việc làm việc với Lieu. Cô ấy có kiến thức kỹ thuật tuyệt vời - đặc biệt về thuế - và công việc của cô ấy luôn chi tiết, có tổ chức và được khách hàng tin tưởng sâu sắc.`,
        `Điều nổi bật nhất là bản chất hỗ trợ và giải quyết vấn đề thực tế, bình tĩnh của cô ấy. Dù bận rộn đến đâu, cô ấy luôn dành thời gian để giúp đỡ đội.`,
        `Hơn thế nữa, cô ấy đã xây dựng các công cụ tự động hóa giúp chúng tôi tiết kiệm rất nhiều thời gian. Khả năng kết hợp chuyên môn sâu với hiệu quả của cô ấy là hiếm có - cô ấy là người mà bạn có thể học hỏi được nhiều điều.`
      ]
    }
  ]

  try {
    for (let index = 0; index < testimonialsData.length; index++) {
      const testimonial = testimonialsData[index]
      await prisma.testimonial.upsert({
        where: { id: testimonial.slug },
        update: {
          locale: testimonial.locale,
          name: testimonial.name,
          role: testimonial.role,
          relationship: testimonial.relationship,
          dateLabel: testimonial.dateLabel,
          content: testimonial.body.join('\n\n'),
          image: testimonial.image,
          order: index,
          isActive: true,
        },
        create: {
          id: testimonial.slug,
          locale: testimonial.locale,
          name: testimonial.name,
          role: testimonial.role,
          relationship: testimonial.relationship,
          dateLabel: testimonial.dateLabel,
          content: testimonial.body.join('\n\n'),
          image: testimonial.image,
          order: index,
          isActive: true,
        }
      })
    }

    console.log(`✅ Seeded ${testimonialsData.length} testimonials for both EN and VI`)
  } catch (error) {
    console.error('❌ Error seeding testimonials:', error)
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
    await seedBlogPosts()
    await seedAboutContent()
    await seedTestimonials()

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
