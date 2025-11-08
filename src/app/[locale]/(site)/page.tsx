import { Hero } from "@/components/Hero";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { Benefits } from "@/components/Benefits";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { benefitOne, benefitTwo } from "@/components/data";

export const dynamic = "force-dynamic";

interface HomeProps {
  params: { locale: string };
}

const homeTranslations = {
  en: {
    preTitle: "Lieu Vo",
    title: "It's okay not to know where to start",
    description: "If you're a small business owner or an independent professional, I understand how hard it can be to make sense of the numbers. Most accountants are always rushing from one tax return to another, which means less time to explain things properly. As a result, you hesitate to ask because you don't want to bother them, and cross your fingers that they do things right, blindly. That's the usual way things go, but it doesn't have to be.",
    hearFromLieuPreTitle: "Having said all that",
    hearFromLieuTitle: "Let me help you",
    hearFromLieuDescription: "Spend hours perfecting your recipe, not going through invoices or fighting with tax returns. I've got that covered.",
    testimonialsPreTitle: "Testimonials",
    testimonialsTitle: "What my clients and colleagues say about me",
    testimonialsDescription: "Strong work ethics with exceptionally high commitment to client's success. That's what sets her apart.",
    faqPreTitle: "FAQ",
    faqTitle: "Frequently asked questions",
    faqDescription: "If these answers spark more questions, feel free to send an email, leave a message, or book a chat. Lieu is always happy to help."
  },
  vi: {
    preTitle: "Lieu Vo",
    title: "Không sao nếu bạn không biết bắt đầu từ đâu",
    description: "Nếu bạn là chủ doanh nghiệp nhỏ hoặc chuyên gia độc lập, tôi hiểu việc hiểu rõ các con số có thể khó khăn như thế nào. Hầu hết kế toán luôn vội vã từ tờ khai thuế này sang tờ khai thuế khác, có nghĩa là ít thời gian giải thích mọi thứ đúng cách. Kết quả là, bạn ngại hỏi vì không muốn làm phiền họ, và chỉ có thể hy vọng họ làm đúng một cách mù quáng. Đó là cách thông thường mọi thứ diễn ra, nhưng không nhất thiết phải như vậy.",
    hearFromLieuPreTitle: "nghe từ lieu",
    hearFromLieuTitle: "hỗ trợ con người, hỗ trợ doanh nghiệp",
    hearFromLieuDescription: "Lieu tin rằng kế toán không chỉ là về con số. Đó là về việc giúp mọi người tập trung vào những gì quan trọng. Hệ thống và công cụ nên làm việc cho chúng ta, giúp doanh nghiệp và gia đình phát triển.",
    testimonialsPreTitle: "nhận xét",
    testimonialsTitle: "khách hàng và đồng nghiệp nói gì",
    testimonialsDescription: "Cách tiếp cận phù hợp, sự quan tâm chân thành và cam kết mạnh mẽ với thành công của mỗi khách hàng. Đó là điều làm cho việc làm việc với Lieu đáng nhớ.",
    faqPreTitle: "hỏi đáp",
    faqTitle: "câu hỏi thường gặp",
    faqDescription: "Nếu những câu trả lời này khơi gợi thêm câu hỏi, hãy gửi email, để lại tin nhắn hoặc đặt lịch trò chuyện. Lieu luôn sẵn sàng giúp đỡ."
  }
}

export default async function Home({ params }: HomeProps) {
  const { locale } = params
  const t = homeTranslations[locale as keyof typeof homeTranslations] || homeTranslations.en

  return (
    <>
      <Hero params={params} />

      <div className="py-20">
        <SectionTitle
          preTitle={t.preTitle}
          title={t.title}
        >
          {t.description}
        </SectionTitle>
      </div>

      <div className="py-20 bg-slate-50">
        <Benefits imgPos="left" data={benefitOne} />
      </div>

      <div className="py-20">
        <Benefits imgPos="right" size="large" data={benefitTwo} />
      </div>

      <div className="py-20 bg-slate-50">
        <SectionTitle
          preTitle={t.hearFromLieuPreTitle}
          title={t.hearFromLieuTitle}
        >
          {t.hearFromLieuDescription}
        </SectionTitle>
      </div>

      <div className="py-20 bg-slate-800">
        <Container className="text-center">
          <div className="text-xs font-semibold tracking-widest mb-3 text-amber-400">
            {t.testimonialsPreTitle}
          </div>
          <h2 className="max-w-3xl mx-auto text-3xl md:text-4xl font-serif font-bold leading-tight mb-6 text-white">
            {t.testimonialsTitle}
          </h2>
          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-slate-200 font-medium mb-12">
            {t.testimonialsDescription}
          </p>
        </Container>

        <Testimonials locale={locale} />
      </div>

      <div className="py-20">
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
