import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const fallbackSections = [
  {
    id: 'section-1',
    title: 'About Me',
    imagePosition: 'left',
    body: [
      "I didn't start out wanting to be an accountant, but I've come to love this work deeply. Today, I help founders and small businesses understand their finances, make smarter decisions, and grow with clarity and confidence.",
      "When I was younger, I dreamed of becoming a doctor. It felt like the best way to help people. That's what led me to study medicine. But during my first year at university, I realised something important: even though I admired the profession, it didn't align with my strengths or what I wanted to do every day.",
      "Later on, I came across accounting, almost by chance. The more I studied it, the more I enjoyed it. Maybe it was my love for numbers, or maybe it was something deeper. I discovered that accounting wasn't just about spreadsheets or tax. It was a way to support people in a very real, impactful way.",
      "Today, I work with founders and small business owners, especially those just starting out, and I focus on more than just getting the job done. I walk alongside them. I explain the why behind the numbers. I build systems that save time. I help them feel confident in decisions, not just compliant.",
    ],
  },
  {
    id: 'section-2',
    title: 'How I Work',
    imagePosition: 'right',
    body: [
      "I believe accounting isn't just a service. It's a relationship built on trust and shared growth. I care deeply about the people I work with, and I take full responsibility for my clients. I don't just want to tell you what you owe in tax. I want you to understand what's really going on, and how to move forward with clarity.",
      "I'm completing the final stage of my ACCA qualification and have over three years of hands-on experience. Alongside that, I've taught myself automation using Python and APIs, built internal tools to save teams hours of work, and created documentation and training resources that scale well across growing companies.",
    ],
  },
  {
    id: 'section-3',
    title: 'What Matters Most',
    image: '/img/lieu/lieu-1.jpeg',
    imagePosition: 'left',
    body: [
      "I especially love working with startups. Many founders begin with zero knowledge of tax or accounting, and that's perfectly okay. Everyone starts somewhere. I help them make those first decisions, whether it's choosing a business structure, understanding cost strategy, or getting ready for their first VAT return.",
      "For me, AI is not a threat. It's a tool. I use it to automate admin, so I can focus more on conversations, planning, and strategy. I've built scripts that pull company data, rename 500+ invoice files, and even process PDFs to Excel in seconds, all so we can spend more time on what matters.",
      "When I work inside a company, I treat it as if it were my own. I don't just do tasks. I look for systems that can improve the way the team works. That's what I love: solving real problems, creating lasting value, and building clarity into the backbone of the business.",
      "If you're a founder or small business owner and want to work with someone who truly cares about both your business and your peace of mind, I'd love to meet.",
    ],
  },
]

// Convert sections to TipTap JSON format
function convertToTipTapJson() {
  const content: any[] = []

  fallbackSections.forEach((section) => {
    // Add heading
    content.push({
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: section.title }],
    })

    // Add paragraphs
    section.body.forEach((paragraph) => {
      content.push({
        type: 'paragraph',
        content: [{ type: 'text', text: paragraph }],
      })
    })

    // Add image if exists
    if (section.image) {
      content.push({
        type: 'paragraph',
        content: [
          {
            type: 'image',
            attrs: {
              src: section.image,
              alt: section.title || 'About section image',
              title: null,
            },
          },
        ],
      })
    }
  })

  return {
    type: 'doc',
    content,
  }
}

// Convert TipTap JSON to HTML
function convertToHtml(json: any): string {
  const content = json.content || []
  let html = ''

  content.forEach((node: any) => {
    if (node.type === 'heading') {
      const level = node.attrs?.level || 2
      const text = node.content?.map((c: any) => c.text || '').join('') || ''
      html += `<h${level}>${text}</h${level}>`
    } else if (node.type === 'paragraph') {
      const content = node.content || []
      let paragraphHtml = ''

      content.forEach((item: any) => {
        if (item.type === 'text') {
          paragraphHtml += item.text || ''
        } else if (item.type === 'image') {
          const src = item.attrs?.src || ''
          const alt = item.attrs?.alt || ''
          paragraphHtml += `<img src="${src}" alt="${alt}" class="w-full h-auto border-4 border-slate-800 shadow-lg my-8" />`
        }
      })

      html += `<p>${paragraphHtml}</p>`
    }
  })

  return html
}

async function migrateAboutContent() {
  try {
    console.log('Converting static content to TipTap format...')

    const contentJson = convertToTipTapJson()
    const contentHtml = convertToHtml(contentJson)

    console.log('Upserting content into database...')

    const result = await prisma.aboutContent.upsert({
      where: {
        locale_slug: {
          locale: 'en',
          slug: 'default',
        },
      },
      update: {
        headline: 'About Me',
        intro: 'Accountant, Problem Solver, and Founder Advocate',
        contentJson,
        contentHtml,
        isActive: true,
      },
      create: {
        locale: 'en',
        slug: 'default',
        headline: 'About Me',
        intro: 'Accountant, Problem Solver, and Founder Advocate',
        contentJson,
        contentHtml,
        isActive: true,
      },
    })

    console.log('✅ Successfully migrated about content!')
    console.log('Result:', result.id)
  } catch (error) {
    console.error('❌ Error migrating content:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

migrateAboutContent()
