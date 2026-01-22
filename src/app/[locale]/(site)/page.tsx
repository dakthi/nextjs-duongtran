import { Hero } from "@/components/Hero";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { Benefits } from "@/components/Benefits";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { benefitOne, benefitTwo } from "@/components/data";
import { generateMetadata as genMeta } from "@/lib/seo";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface HomeProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: HomeProps): Promise<Metadata> {
  const { locale } = params;

  const descriptions = {
    en: "Life Coach & Student Mentor helping young people achieve their dreams through university guidance, scholarship consulting, and personal development coaching.",
    vi: "Life Coach & Mentor Sinh Viên giúp bạn trẻ đạt được ước mơ qua hướng dẫn đại học, tư vấn học bổng và coaching phát triển bản thân."
  };

  return genMeta({
    title: locale === 'vi' ? 'Trang chủ' : 'Home',
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    locale,
    path: '',
  });
}

const homeTranslations = {
  en: {
    preTitle: "Duong Tran",
    title: "Your Journey to Success Starts Here",
    description: "Whether you're a student dreaming of studying abroad, preparing for university applications, or a young professional seeking direction — I'm here to guide you. With years of experience mentoring students and helping them achieve their dreams, I believe everyone has the potential to succeed. Let me help you unlock yours.",
    hearFromDuongPreTitle: "My Approach",
    hearFromDuongTitle: "Empowering Your Potential",
    hearFromDuongDescription: "I believe in practical guidance, not just motivation. Through personalized mentoring, I help you build real skills, craft compelling applications, and develop the confidence to pursue your dreams.",
    testimonialsPreTitle: "Testimonials",
    testimonialsTitle: "Success Stories",
    testimonialsDescription: "Hear from students and young professionals who have transformed their futures with the right guidance and support.",
    faqPreTitle: "FAQ",
    faqTitle: "Frequently Asked Questions",
    faqDescription: "Have questions about mentoring, university applications, or career guidance? Find answers here or reach out directly."
  },
  vi: {
    preTitle: "Duong Tran",
    title: "Hành Trình Thành Công Bắt Đầu Từ Đây",
    description: "Dù bạn là sinh viên mơ ước du học, đang chuẩn bị hồ sơ đại học, hay là người trẻ đang tìm kiếm hướng đi — tôi sẵn sàng đồng hành cùng bạn. Với nhiều năm kinh nghiệm hướng dẫn sinh viên đạt được ước mơ, tôi tin rằng ai cũng có tiềm năng để thành công. Hãy để tôi giúp bạn khám phá tiềm năng của chính mình.",
    hearFromDuongPreTitle: "Phương Pháp",
    hearFromDuongTitle: "Khai Phá Tiềm Năng Của Bạn",
    hearFromDuongDescription: "Tôi tin vào hướng dẫn thực tế, không chỉ động viên suông. Qua mentoring cá nhân hóa, tôi giúp bạn xây dựng kỹ năng thực sự, viết hồ sơ ấn tượng và phát triển sự tự tin để theo đuổi ước mơ.",
    testimonialsPreTitle: "Nhận Xét",
    testimonialsTitle: "Câu Chuyện Thành Công",
    testimonialsDescription: "Lắng nghe từ các bạn sinh viên và người trẻ đã thay đổi tương lai của họ với sự hướng dẫn và hỗ trợ phù hợp.",
    faqPreTitle: "Hỏi Đáp",
    faqTitle: "Câu Hỏi Thường Gặp",
    faqDescription: "Có câu hỏi về mentoring, hồ sơ đại học, hay hướng nghiệp? Tìm câu trả lời ở đây hoặc liên hệ trực tiếp."
  }
}

export default async function Home({ params }: HomeProps) {
  const { locale } = params
  const t = homeTranslations[locale as keyof typeof homeTranslations] || homeTranslations.en

  return (
    <>
      <Hero params={params} />

      <div className="relative py-8 overflow-hidden bg-mint-green">
        {/* Content */}
        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold tracking-widest uppercase text-white bg-jungle-green px-3 py-1 inline-block mb-4 border-2 border-jungle-green shadow-[2px_2px_0px_0px_rgba(64,178,145,1)]">
              {t.preTitle}
            </p>
            <h2 className="text-2xl md:text-4xl font-sans font-bold text-outer-space leading-tight mb-6">
              {t.title}
            </h2>
            <p className="text-lg font-normal text-outer-space leading-relaxed bg-white/95 backdrop-blur-sm p-6 rounded-lg">
              {t.description}
            </p>
          </div>
        </Container>
      </div>

      <div className="py-20 bg-white">
        <Benefits imgPos="left" data={benefitOne} />
      </div>

      <div className="py-20 bg-mint-green">
        <Benefits imgPos="right" size="large" data={benefitTwo} />
      </div>

      <div className="py-20 bg-white">
        <SectionTitle
          preTitle={t.hearFromDuongPreTitle}
          title={t.hearFromDuongTitle}
        >
          {t.hearFromDuongDescription}
        </SectionTitle>
      </div>

      <div className="py-20 bg-feldgrau">
        <Container className="text-center">
          <div className="text-xs font-semibold tracking-widest uppercase mb-3 text-jungle-green-light">
            {t.testimonialsPreTitle}
          </div>
          <h2 className="max-w-3xl mx-auto text-3xl md:text-4xl font-sans font-bold leading-tight mb-6 text-white">
            {t.testimonialsTitle}
          </h2>
          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-mint-green font-medium mb-12">
            {t.testimonialsDescription}
          </p>
        </Container>

        <Testimonials locale={locale} />
      </div>

      <div className="py-20 bg-white">
        <SectionTitle preTitle={t.faqPreTitle} title={t.faqTitle}>
          {t.faqDescription}
        </SectionTitle>

        <div className="mt-12">
          <Faq />
        </div>
      </div>
    </>
  );
}
