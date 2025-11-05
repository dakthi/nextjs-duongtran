import { legacyMediaUrl } from '@/lib/media/media-client'
import type { AboutSection } from '@/types/about.types'

interface AboutBodyProps {
  headline?: string | null
  intro?: string | null
  sections?: AboutSection[]
  contentHtml?: string | null
  contentJson?: any | null
}

const fallbackSections: AboutSection[] = [
  {
    id: 'section-1',
    title: 'About Me',
    image: '/img/lieu/lieu-2.jpeg',
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
    image: '/img/lieu/lieu-3.jpeg',
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

const resolveImagePosition = (section: AboutSection, index: number): 'left' | 'right' => {
  if (section.imagePosition === 'left' || section.imagePosition === 'right') {
    return section.imagePosition
  }
  return index % 2 === 0 ? 'left' : 'right'
}

export const AboutBody = ({ headline, intro, sections, contentHtml, contentJson }: AboutBodyProps) => {
  // Use TipTap content if available, otherwise fall back to legacy sections
  const useTipTap = contentHtml || contentJson
  const content = sections && sections.length > 0 ? sections : fallbackSections

  return (
    <>
      {/* Header Section with amber background */}
      {(headline || intro) && (
        <div className="py-20 bg-amber-50 border-b-4 border-amber-500">
          <div className="container max-w-5xl mx-auto px-8 xl:px-12">
            <div className="text-center space-y-6">
              {headline && (
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
                  {headline}
                </h1>
              )}
              {intro && (
                <p className="text-lg font-medium text-slate-900 leading-relaxed">
                  {intro}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Content - TipTap HTML or Legacy Sections */}
      <div className="pt-20 pb-12 bg-white">
        <div className="container max-w-5xl mx-auto px-8 xl:px-12">
          {useTipTap ? (
            /* TipTap HTML Content */
            <div
              className="prose prose-slate prose-lg max-w-none
                prose-headings:font-serif prose-headings:font-bold prose-headings:text-slate-900 prose-headings:leading-tight
                prose-h2:text-3xl prose-h2:md:text-4xl prose-h2:mb-6
                prose-h3:text-2xl prose-h3:md:text-3xl prose-h3:mb-4
                prose-p:text-lg prose-p:font-medium prose-p:text-slate-900 prose-p:leading-relaxed prose-p:mb-6
                prose-img:w-full prose-img:h-auto prose-img:border-4 prose-img:border-slate-800 prose-img:shadow-lg prose-img:my-8
                prose-a:text-amber-600 prose-a:underline hover:prose-a:text-amber-500
                prose-strong:text-slate-900 prose-strong:font-bold
                prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2 prose-ul:text-base prose-ul:text-slate-700
                prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2 prose-ol:text-base prose-ol:text-slate-700
                prose-blockquote:border-l-4 prose-blockquote:border-amber-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-slate-700
                prose-hr:border-t-2 prose-hr:border-slate-200 prose-hr:my-8"
              dangerouslySetInnerHTML={{ __html: contentHtml || '' }}
            />
          ) : (
            /* Legacy Sections Format */
            <div className="space-y-12">
              {content.map((section, index) => {
                const image = section.image ? legacyMediaUrl(section.image) : null

                return (
                  <article key={section.id || index} className="space-y-6">
                    {section.title && (
                      <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 leading-tight">
                        {section.title}
                      </h2>
                    )}

                    {/* First paragraph(s) before image */}
                    {section.body.slice(0, 2).map((paragraph, paragraphIndex) => (
                      <p key={`${section.id}-${paragraphIndex}`} className="text-lg font-medium text-slate-900 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}

                    {/* Image in between text */}
                    {image && (
                      <figure className="my-8">
                        <img
                          src={image}
                          alt={section.title || 'About section image'}
                          className="w-full h-auto border-4 border-slate-800 shadow-lg"
                        />
                      </figure>
                    )}

                    {/* Remaining paragraphs after image */}
                    {section.body.slice(2).map((paragraph, paragraphIndex) => (
                      <p key={`${section.id}-after-${paragraphIndex}`} className="text-lg font-medium text-slate-900 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export const defaultAboutSections = fallbackSections
