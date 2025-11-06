import { legacyMediaUrl } from '@/lib/media/media-client'
import type { AboutSection } from '@/types/about.types'

interface AboutBodyProps {
  sections?: AboutSection[]
  contentHtml?: string | null
  contentJson?: any | null
  locale?: string
}

// Translations for fallback sections
const fallbackSectionsTranslations = {
  en: [
    {
      id: 'section-1',
      title: 'About Me',
      image: '/img/lieu/lieu-2.jpeg',
      imagePosition: 'left' as const,
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
      imagePosition: 'right' as const,
      body: [
        "I believe accounting isn't just a service. It's a relationship built on trust and shared growth. I care deeply about the people I work with, and I take full responsibility for my clients. I don't just want to tell you what you owe in tax. I want you to understand what's really going on, and how to move forward with clarity.",
        "I'm completing the final stage of my ACCA qualification and have over three years of hands-on experience. Alongside that, I've taught myself automation using Python and APIs, built internal tools to save teams hours of work, and created documentation and training resources that scale well across growing companies.",
      ],
    },
    {
      id: 'section-3',
      title: 'What Matters Most',
      image: '/img/lieu/lieu-1.jpeg',
      imagePosition: 'left' as const,
      body: [
        "I especially love working with startups. Many founders begin with zero knowledge of tax or accounting, and that's perfectly okay. Everyone starts somewhere. I help them make those first decisions, whether it's choosing a business structure, understanding cost strategy, or getting ready for their first VAT return.",
        "For me, AI is not a threat. It's a tool. I use it to automate admin, so I can focus more on conversations, planning, and strategy. I've built scripts that pull company data, rename 500+ invoice files, and even process PDFs to Excel in seconds, all so we can spend more time on what matters.",
        "When I work inside a company, I treat it as if it were my own. I don't just do tasks. I look for systems that can improve the way the team works. That's what I love: solving real problems, creating lasting value, and building clarity into the backbone of the business.",
        "If you're a founder or small business owner and want to work with someone who truly cares about both your business and your peace of mind, I'd love to meet.",
      ],
    },
  ],
  vi: [
    {
      id: 'section-1',
      title: 'Về Tôi',
      image: '/img/lieu/lieu-2.jpeg',
      imagePosition: 'left' as const,
      body: [
        "Tôi không bắt đầu với ước mơ trở thành kế toán, nhưng giờ đây tôi yêu công việc này sâu sắc. Hôm nay, tôi giúp các nhà sáng lập và doanh nghiệp nhỏ hiểu rõ tài chính của họ, đưa ra quyết định thông minh hơn và phát triển với sự rõ ràng và tự tin.",
        "Khi còn trẻ, tôi mơ ước trở thành bác sĩ. Đó có vẻ là cách tốt nhất để giúp đỡ mọi người. Đó là lý do tôi đã học y. Nhưng trong năm đầu tiên tại đại học, tôi nhận ra điều quan trọng: mặc dù tôi ngưỡng mộ nghề này, nó không phù hợp với điểm mạnh của tôi hoặc điều tôi muốn làm mỗi ngày.",
        "Sau đó, tôi gặp ngành kế toán gần như tình cờ. Càng học, tôi càng thích. Có thể là tình yêu của tôi với con số, hoặc có thể là điều gì đó sâu sắc hơn. Tôi phát hiện ra rằng kế toán không chỉ là bảng tính hay thuế. Đó là cách hỗ trợ mọi người một cách thực sự và có tác động.",
        "Ngày nay, tôi làm việc với các nhà sáng lập và chủ doanh nghiệp nhỏ, đặc biệt là những người mới bắt đầu, và tôi tập trung vào nhiều hơn là chỉ hoàn thành công việc. Tôi đồng hành cùng họ. Tôi giải thích lý do đằng sau những con số. Tôi xây dựng hệ thống tiết kiệm thời gian. Tôi giúp họ tự tin trong các quyết định, không chỉ tuân thủ.",
      ],
    },
    {
      id: 'section-2',
      title: 'Cách Tôi Làm Việc',
      image: '/img/lieu/lieu-3.jpeg',
      imagePosition: 'right' as const,
      body: [
        "Tôi tin rằng kế toán không chỉ là dịch vụ. Đó là mối quan hệ được xây dựng dựa trên niềm tin và sự phát triển chung. Tôi quan tâm sâu sắc đến những người tôi làm việc cùng và tôi chịu trách nhiệm hoàn toàn cho khách hàng của mình. Tôi không chỉ muốn cho bạn biết bạn nợ bao nhiêu thuế. Tôi muốn bạn hiểu điều gì thực sự đang diễn ra và cách tiến về phía trước với sự rõ ràng.",
        "Tôi đang hoàn thành giai đoạn cuối cùng của bằng ACCA và có hơn ba năm kinh nghiệm thực tế. Bên cạnh đó, tôi tự học tự động hóa bằng Python và API, xây dựng công cụ nội bộ để tiết kiệm hàng giờ làm việc cho đội nhóm, và tạo tài liệu cũng như tài nguyên đào tạo mở rộng tốt cho các công ty đang phát triển.",
      ],
    },
    {
      id: 'section-3',
      title: 'Điều Quan Trọng Nhất',
      image: '/img/lieu/lieu-1.jpeg',
      imagePosition: 'left' as const,
      body: [
        "Tôi đặc biệt thích làm việc với các startup. Nhiều nhà sáng lập bắt đầu với không có kiến thức về thuế hoặc kế toán, và điều đó hoàn toàn ổn. Mọi người đều bắt đầu từ đâu đó. Tôi giúp họ đưa ra những quyết định đầu tiên, cho dù đó là chọn cấu trúc kinh doanh, hiểu chiến lược chi phí, hay chuẩn bị cho tờ khai VAT đầu tiên.",
        "Đối với tôi, AI không phải là mối đe dọa. Đó là công cụ. Tôi sử dụng nó để tự động hóa công việc hành chính, để tôi có thể tập trung nhiều hơn vào cuộc trò chuyện, kế hoạch và chiến lược. Tôi đã xây dựng các script kéo dữ liệu công ty, đổi tên 500+ tệp hóa đơn, và thậm chí xử lý PDF sang Excel trong vài giây, tất cả để chúng ta có thể dành nhiều thời gian hơn cho những điều quan trọng.",
        "Khi tôi làm việc trong một công ty, tôi coi nó như của riêng mình. Tôi không chỉ làm nhiệm vụ. Tôi tìm kiếm các hệ thống có thể cải thiện cách đội làm việc. Đó là điều tôi yêu thích: giải quyết vấn đề thực tế, tạo ra giá trị lâu dài và xây dựng sự rõ ràng vào xương sống của doanh nghiệp.",
        "Nếu bạn là nhà sáng lập hoặc chủ doanh nghiệp nhỏ và muốn làm việc với người thực sự quan tâm đến cả doanh nghiệp của bạn và sự an tâm của bạn, tôi rất muốn gặp.",
      ],
    },
  ],
}

// Get localized fallback sections with English as default
const getFallbackSections = (locale: string = 'en'): AboutSection[] => {
  return fallbackSectionsTranslations[locale as keyof typeof fallbackSectionsTranslations]
    || fallbackSectionsTranslations.en
}

const resolveImagePosition = (section: AboutSection, index: number): 'left' | 'right' => {
  if (section.imagePosition === 'left' || section.imagePosition === 'right') {
    return section.imagePosition
  }
  return index % 2 === 0 ? 'left' : 'right'
}

export const AboutBody = ({ sections, contentHtml, contentJson, locale = 'en' }: AboutBodyProps) => {
  // Use TipTap content if available, otherwise fall back to legacy sections
  const useTipTap = contentHtml || contentJson
  const content = sections && sections.length > 0 ? sections : getFallbackSections(locale)

  return (
    <>
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

export const defaultAboutSections = fallbackSectionsTranslations.en
