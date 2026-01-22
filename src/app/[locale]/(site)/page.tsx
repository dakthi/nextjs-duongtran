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
    en: "Expert chartered accountant helping SMEs and independent professionals with accounting, tax, payroll, and VAT services in London, UK. ACCA qualified with personalized support.",
    vi: "Kế toán chuyên nghiệp giúp doanh nghiệp nhỏ và chuyên gia độc lập với dịch vụ kế toán, thuế, lương và VAT tại London, UK. Được ACCA công nhận."
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
    title: "It's okay not to know where to start",
    description: "If you're a small business owner or an independent professional, I understand how hard it can be to make sense of the numbers. Most accountants are always rushing from one tax return to another, which means less time to explain things properly. As a result, you hesitate to ask because you don't want to bother them, and cross your fingers that they do things right, blindly. That's the usual way things go, but it doesn't have to be.",
    hearFromDuongPreTitle: "Having said all that",
    hearFromDuongTitle: "Let me help you",
    hearFromDuongDescription: "Spend hours perfecting your recipe, not going through invoices or fighting with tax returns. I've got that covered.",
    testimonialsPreTitle: "Testimonials",
    testimonialsTitle: "What my clients and colleagues say about me",
    testimonialsDescription: "Strong work ethics with exceptionally high commitment to client's success. That's what sets her apart.",
    faqPreTitle: "FAQ",
    faqTitle: "Frequently asked questions",
    faqDescription: "If these answers spark more questions, feel free to send an email, leave a message, or book a chat. Duong is always happy to help."
  },
  vi: {
    preTitle: "Duong Tran",
    title: "Không sao nếu bạn không biết bắt đầu từ đâu",
    description: "Nếu bạn là chủ doanh nghiệp nhỏ hoặc chuyên gia độc lập, tôi hiểu việc hiểu rõ các con số có thể khó khăn như thế nào. Hầu hết kế toán luôn vội vã từ tờ khai thuế này sang tờ khai thuế khác, có nghĩa là ít thời gian giải thích mọi thứ đúng cách. Kết quả là, bạn ngại hỏi vì không muốn làm phiền họ, và chỉ có thể hy vọng họ làm đúng một cách mù quáng. Đó là cách thông thường mọi thứ diễn ra, nhưng không nhất thiết phải như vậy.",
    hearFromDuongPreTitle: "nghe từ lieu",
    hearFromDuongTitle: "hỗ trợ con người, hỗ trợ doanh nghiệp",
    hearFromDuongDescription: "Duong tin rằng kế toán không chỉ là về con số. Đó là về việc giúp mọi người tập trung vào những gì quan trọng. Hệ thống và công cụ nên làm việc cho chúng ta, giúp doanh nghiệp và gia đình phát triển.",
    testimonialsPreTitle: "nhận xét",
    testimonialsTitle: "khách hàng và đồng nghiệp nói gì",
    testimonialsDescription: "Cách tiếp cận phù hợp, sự quan tâm chân thành và cam kết mạnh mẽ với thành công của mỗi khách hàng. Đó là điều làm cho việc làm việc với Duong đáng nhớ.",
    faqPreTitle: "hỏi đáp",
    faqTitle: "câu hỏi thường gặp",
    faqDescription: "Nếu những câu trả lời này khơi gợi thêm câu hỏi, hãy gửi email, để lại tin nhắn hoặc đặt lịch trò chuyện. Duong luôn sẵn sàng giúp đỡ."
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
