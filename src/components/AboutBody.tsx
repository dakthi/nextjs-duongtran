import { legacyMediaUrl } from '@/lib/media/media-client'
import type { AboutSection } from '@/types/about.types'
import { Container } from '@/components/Container'

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
      title: 'My Story',
      image: '/img/duong-tran-about.jpg',
      imagePosition: 'left' as const,
      body: [
        "I believe every young person has unlimited potential waiting to be unlocked. My journey as a mentor began when I realized how many students struggle not because they lack ability, but because they lack guidance and direction.",
        "Growing up, I experienced firsthand the challenges of navigating education and career choices without proper support. That struggle shaped who I am today and fuels my passion for helping others avoid the same uncertainties.",
        "Today, I dedicate myself to guiding students through their most important decisions — from choosing the right university to crafting applications that truly represent who they are. I've helped countless students achieve their dreams of studying abroad, winning scholarships, and building successful careers.",
        "What makes my approach different is that I don't just give advice — I walk alongside you on your journey. I take the time to understand your unique strengths, dreams, and circumstances to create a path that's right for you.",
      ],
    },
    {
      id: 'section-2',
      title: 'My Approach',
      image: '/img/duong-tran-hero.jpg',
      imagePosition: 'right' as const,
      body: [
        "I believe in practical guidance over empty motivation. While inspiration matters, what truly transforms lives is actionable advice combined with consistent support. That's what I provide to every student I work with.",
        "My mentoring goes beyond just applications and deadlines. I help you develop the soft skills, confidence, and mindset needed to thrive not just in university, but throughout your career. We work on communication, goal-setting, time management, and building genuine self-belief.",
      ],
    },
    {
      id: 'section-3',
      title: 'Why I Do This',
      image: '/img/duong-tran-about.jpg',
      imagePosition: 'left' as const,
      body: [
        "Nothing brings me more joy than seeing a student's face light up when they receive an acceptance letter or scholarship offer they once thought was impossible. These moments remind me why I chose this path.",
        "I especially love working with students who feel lost or unsure about their future. Many young people start with no clear direction, and that's perfectly okay. Everyone starts somewhere. My role is to help you discover your potential and create a roadmap to achieve it.",
        "Education has the power to transform lives and open doors that once seemed closed. I've seen it happen countless times, and I want to be part of making it happen for you.",
        "If you're ready to take the next step in your journey — whether it's applying to university, seeking scholarships, or figuring out your career path — I'd love to connect and explore how I can help.",
      ],
    },
  ],
  vi: [
    {
      id: 'section-1',
      title: 'Câu Chuyện Của Tôi',
      image: '/img/duong-tran-about.jpg',
      imagePosition: 'left' as const,
      body: [
        "Tôi tin rằng mỗi bạn trẻ đều có tiềm năng vô hạn đang chờ được khai phá. Hành trình làm mentor của tôi bắt đầu khi tôi nhận ra có bao nhiêu sinh viên gặp khó khăn không phải vì thiếu khả năng, mà vì thiếu sự hướng dẫn và định hướng.",
        "Khi lớn lên, tôi đã trải nghiệm trực tiếp những thách thức của việc định hướng giáo dục và lựa chọn nghề nghiệp mà không có sự hỗ trợ phù hợp. Cuộc đấu tranh đó đã định hình con người tôi ngày hôm nay và thúc đẩy niềm đam mê giúp người khác tránh những bất định tương tự.",
        "Ngày nay, tôi dành trọn tâm huyết để hướng dẫn sinh viên qua những quyết định quan trọng nhất — từ chọn đúng trường đại học đến viết hồ sơ thực sự đại diện cho con người họ. Tôi đã giúp vô số sinh viên đạt được ước mơ du học, giành học bổng và xây dựng sự nghiệp thành công.",
        "Điều khiến cách tiếp cận của tôi khác biệt là tôi không chỉ đưa ra lời khuyên — tôi đồng hành cùng bạn trên hành trình. Tôi dành thời gian để hiểu điểm mạnh, ước mơ và hoàn cảnh riêng của bạn để tạo ra con đường phù hợp với bạn.",
      ],
    },
    {
      id: 'section-2',
      title: 'Phương Pháp Của Tôi',
      image: '/img/duong-tran-hero.jpg',
      imagePosition: 'right' as const,
      body: [
        "Tôi tin vào hướng dẫn thực tế hơn là động viên suông. Trong khi cảm hứng quan trọng, điều thực sự thay đổi cuộc sống là lời khuyên có thể hành động kết hợp với sự hỗ trợ nhất quán. Đó là điều tôi cung cấp cho mỗi sinh viên tôi làm việc cùng.",
        "Mentoring của tôi vượt ra ngoài chỉ hồ sơ và thời hạn. Tôi giúp bạn phát triển kỹ năng mềm, sự tự tin và tư duy cần thiết để thành công không chỉ ở đại học mà trong suốt sự nghiệp. Chúng ta làm việc về giao tiếp, đặt mục tiêu, quản lý thời gian và xây dựng niềm tin vào bản thân.",
      ],
    },
    {
      id: 'section-3',
      title: 'Tại Sao Tôi Làm Điều Này',
      image: '/img/duong-tran-about.jpg',
      imagePosition: 'left' as const,
      body: [
        "Không gì mang lại cho tôi niềm vui hơn khi thấy khuôn mặt sinh viên sáng lên khi họ nhận được thư nhập học hoặc học bổng mà họ từng nghĩ là không thể. Những khoảnh khắc này nhắc tôi tại sao tôi chọn con đường này.",
        "Tôi đặc biệt thích làm việc với sinh viên cảm thấy lạc lõng hoặc không chắc chắn về tương lai. Nhiều bạn trẻ bắt đầu mà không có hướng đi rõ ràng, và điều đó hoàn toàn ổn. Mọi người đều bắt đầu từ đâu đó. Vai trò của tôi là giúp bạn khám phá tiềm năng và tạo lộ trình để đạt được nó.",
        "Giáo dục có sức mạnh thay đổi cuộc sống và mở ra những cánh cửa từng tưởng như đóng kín. Tôi đã chứng kiến điều đó xảy ra vô số lần, và tôi muốn là một phần giúp điều đó xảy ra cho bạn.",
        "Nếu bạn sẵn sàng bước tiếp trên hành trình của mình — cho dù đó là nộp đơn vào đại học, tìm kiếm học bổng, hay tìm ra con đường sự nghiệp — tôi rất muốn kết nối và khám phá cách tôi có thể giúp.",
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
        <Container>
          {useTipTap ? (
            /* TipTap HTML Content */
            <div
              className="prose prose-slate prose-lg max-w-none
                prose-headings:font-sans prose-headings:font-bold prose-headings:text-outer-space prose-headings:leading-tight
                prose-h2:text-3xl prose-h2:md:text-4xl prose-h2:mb-6
                prose-h3:text-2xl prose-h3:md:text-3xl prose-h3:mb-4
                prose-p:text-lg prose-p:font-medium prose-p:text-feldgrau prose-p:leading-relaxed prose-p:mb-6
                prose-img:w-full prose-img:h-auto prose-img:border-4 prose-img:border-outer-space prose-img:shadow-brutalist prose-img:my-8
                prose-a:text-jungle-green prose-a:underline hover:prose-a:text-jungle-green-dark
                prose-strong:text-outer-space prose-strong:font-bold
                prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2 prose-ul:text-base prose-ul:text-feldgrau
                prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2 prose-ol:text-base prose-ol:text-feldgrau
                prose-blockquote:border-l-4 prose-blockquote:border-jungle-green prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-feldgrau
                prose-hr:border-t-2 prose-hr:border-mint-green prose-hr:my-8"
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
                      <h2 className="text-3xl md:text-4xl font-sans font-bold text-outer-space leading-tight">
                        {section.title}
                      </h2>
                    )}

                    {/* First paragraph(s) before image */}
                    {section.body.slice(0, 2).map((paragraph, paragraphIndex) => (
                      <p key={`${section.id}-${paragraphIndex}`} className="text-lg font-medium text-feldgrau leading-relaxed">
                        {paragraph}
                      </p>
                    ))}

                    {/* Image in between text */}
                    {image && (
                      <figure className="my-8">
                        <img
                          src={image}
                          alt={section.title || 'About section image'}
                          className="w-full h-auto border-4 border-outer-space shadow-brutalist"
                        />
                      </figure>
                    )}

                    {/* Remaining paragraphs after image */}
                    {section.body.slice(2).map((paragraph, paragraphIndex) => (
                      <p key={`${section.id}-after-${paragraphIndex}`} className="text-lg font-medium text-feldgrau leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </article>
                )
              })}
            </div>
          )}
        </Container>
      </div>
    </>
  )
}

export const defaultAboutSections = fallbackSectionsTranslations.en
