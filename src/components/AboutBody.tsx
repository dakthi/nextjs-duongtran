import { legacyMediaUrl } from '@/lib/media/media-client'
import type { AboutSection } from '@/types/about.types'

interface AboutBodyProps {
  headline?: string | null
  intro?: string | null
  sections?: AboutSection[]
}

const fallbackSections: AboutSection[] = [
  {
    id: 'section-1',
    title: 'About Me',
    image: '/img/lieu/lieu-2.jpeg',
    imagePosition: 'left',
    body: [
      'I didn’t start out wanting to be an accountant — but I’ve come to love this work deeply. Today, I help founders and small businesses understand their finances, make smarter decisions, and grow with clarity and confidence.',
      'When I was younger, I dreamed of becoming a doctor — it felt like the best way to help people. That’s what led me to study medicine. But during my first year at university, I realised something important: even though I admired the profession, it didn’t align with my strengths or what I wanted to do every day.',
      'Later on, I came across accounting — almost by chance. The more I studied it, the more I enjoyed it. Maybe it was my love for numbers, or maybe it was something deeper. I discovered that accounting wasn’t just about spreadsheets or tax — it was a way to support people in a very real, impactful way.',
      'Today, I work with founders and small business owners — especially those just starting out — and I focus on more than just getting the job done. I walk alongside them. I explain the why behind the numbers. I build systems that save time. I help them feel confident in decisions, not just compliant.',
    ],
  },
  {
    id: 'section-2',
    title: 'How I Work',
    image: '/img/lieu/lieu-3.jpeg',
    imagePosition: 'right',
    body: [
      'I believe accounting isn’t just a service. It’s a relationship built on trust and shared growth. I care deeply about the people I work with, and I take full responsibility for my clients. I don’t just want to tell you what you owe in tax — I want you to understand what’s really going on, and how to move forward with clarity.',
      'I’m completing the final stage of my ACCA qualification and have over three years of hands-on experience. Alongside that, I’ve taught myself automation using Python and APIs, built internal tools to save teams hours of work, and created documentation and training resources that scale well across growing companies.',
    ],
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
      'If you’re a founder or small business owner and want to work with someone who truly cares — about both your business and your peace of mind — I’d love to meet.',
    ],
  },
]

const resolveImagePosition = (section: AboutSection, index: number): 'left' | 'right' => {
  if (section.imagePosition === 'left' || section.imagePosition === 'right') {
    return section.imagePosition
  }
  return index % 2 === 0 ? 'left' : 'right'
}

export const AboutBody = ({ headline, intro, sections }: AboutBodyProps) => {
  const content = sections && sections.length > 0 ? sections : fallbackSections

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 space-y-20">
      {(headline || intro) && (
        <div className="max-w-3xl space-y-4 text-gray-800">
          {headline && <h2 className="text-3xl font-bold text-gray-900">{headline}</h2>}
          {intro && <p className="text-lg leading-relaxed text-gray-700">{intro}</p>}
        </div>
      )}

      {content.map((section, index) => {
        const imagePosition = resolveImagePosition(section, index)
        const image = section.image ? legacyMediaUrl(section.image) : null
        const imageElement = image ? (
          <img
            src={image}
            alt={section.title || 'About section image'}
            className="w-full h-auto rounded-xl shadow-lg"
          />
        ) : null

        const textContent = (
          <div className="space-y-5 text-gray-800 text-base leading-relaxed md:text-lg">
            {section.title && (
              <h3 className="text-2xl font-semibold text-gray-900">{section.title}</h3>
            )}
            {section.body.map((paragraph, paragraphIndex) => (
              <p key={paragraphIndex}>{paragraph}</p>
            ))}
          </div>
        )

        return (
          <div
            key={section.id || index}
            className="grid md:grid-cols-2 gap-10 items-start"
          >
            {imagePosition === 'left' ? (
              <>
                {imageElement && <div>{imageElement}</div>}
                {textContent}
              </>
            ) : (
              <>
                {textContent}
                {imageElement && <div>{imageElement}</div>}
              </>
            )}
          </div>
        )
      })}
    </section>
  )
}

export const defaultAboutSections = fallbackSections
