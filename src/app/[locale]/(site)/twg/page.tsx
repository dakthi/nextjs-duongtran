import { Navbar1 } from "@/components/Navbar1";
import { Footer1 } from "@/components/Footer1";
import { generateMetadata as genMeta } from "@/lib/seo";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface TWGProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: TWGProps): Promise<Metadata> {
  const { locale } = params;

  const descriptions = {
    en: "Together We Grow - Life coaching and mentoring for students pursuing their study abroad dreams.",
    vi: "Together We Grow - Coaching và đồng hành cùng học sinh theo đuổi ước mơ du học."
  };

  return genMeta({
    title: locale === 'vi' ? 'Together We Grow' : 'Together We Grow',
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    locale,
    path: '/twg',
  });
}

const translations = {
  vi: {
    navLogo: "Dương Trần",
    navServices: "Together We Grow",
    navBlog: "Blog",
    navCTA: "Đặt lịch hẹn",

    // TWG Content
    title: "Together We Grow",
    subtitle: "Đồng hành với những dự định du học",
    missionTitle: "Sứ mệnh",
    mission: "Mình muốn Together We Grow là một nơi an toàn để các bạn học sinh được kết nối với bản thân, từ đó tìm và apply thành công vào môi trường học tập phù hợp. Không phải về con số \"khủng\" hay trường top rank, mà về việc hiểu rõ bản thân và tự tin đưa ra lựa chọn đúng đắn cho riêng mình.",

    philosophyTitle: "Triết lý",
    philoPara1: "Trong quan sát của mình, nhiều người trẻ đi du học vì sự sắp đặt của cha mẹ hoặc coi đó là sự đầu tư thuần túy, thiếu mục đích rõ ràng. Khi được hỏi \"Tại sao bạn muốn đi du học?\", nhiều bạn trẻ chỉ có thể đưa ra những câu trả lời chung chung hoặc dựa trên mong muốn của người khác.",
    philoPara2: "Nhưng khi bạn hiểu mình cần gì, bạn sẽ tự tin hơn trong việc đưa ra lựa chọn. Bạn sẽ biết mình cần trường nào, môi trường như thế nào, và quan trọng nhất là bạn muốn phát triển bản thân theo hướng nào. Đó không chỉ là việc chọn một ngôi trường hay một ngành học, mà là việc chọn một hành trình phù hợp với con người thật của bạn.",
    philoPara3: "Du học không chỉ là về bằng cấp hay kiến thức, mà còn là cơ hội để bạn khám phá bản thân, thử thách giới hạn, và xây dựng tương lai mà bạn thực sự mong muốn. Khi bạn kết nối với chính mình, mọi quyết định sẽ trở nên rõ ràng và có ý nghĩa hơn rất nhiều.",

    approachTitle: "Ba yếu tố quan trọng khi \"gọi vốn\" cho bản thân",
    approachIntro: "Mình gọi việc apply học bổng là một cách \"gọi vốn\" cho bản thân. Các nhà cấp học bổng sẽ nhìn vào ba yếu tố: sự đam mê, năng lực bản thân, và khả năng lan tỏa năng lượng tích cực đến cộng đồng.",

    footerBrand: "Dương Trân",
    footerTagline: "Life coach đồng hành cùng bạn trẻ Việt Nam",
    footerLinksTitle: "LIÊN KẾT",
    footerBlog: "Blog",
    footerContact: "Liên hệ",
    footerResourcesTitle: "TÀI LIỆU THAM KHẢO",
    footerScholarship: "Xin học bổng",
    footerStudyAbroad: "Du học",
    footerCareer: "Sự nghiệp",
    footerFAQ: "FAQ",
    footerCopyright: "© Dương Trân. All rights reserved.",
    footerPrivacy: "Chính sách bảo mật",
    footerTerms: "Điều khoản sử dụng",
  },
  en: {
    navLogo: "Duong Tran",
    navServices: "Together We Grow",
    navBlog: "Blog",
    navCTA: "Book Session",

    // TWG Content
    title: "Together We Grow",
    subtitle: "Supporting your study abroad journey",
    missionTitle: "Mission",
    mission: "I want Together We Grow to be a safe space for students to connect with themselves, and from there find and successfully apply to the right learning environment. It's not about impressive numbers or top-ranked schools, but about understanding yourself and confidently making the right choices for you.",

    philosophyTitle: "Philosophy",
    philoPara1: "In my observation, many young people study abroad due to their parents' arrangements or see it as a pure investment, lacking clear purpose. When asked \"Why do you want to study abroad?\", many can only give generic answers or based on others' wishes.",
    philoPara2: "But when you understand what you need, you'll be more confident in making choices. You'll know which school you need, what kind of environment, and most importantly, how you want to develop yourself. It's not just about choosing a school or a major, but choosing a journey that fits your true self.",
    philoPara3: "Studying abroad is not just about degrees or knowledge, but also an opportunity to discover yourself, challenge limits, and build the future you truly desire. When you connect with yourself, all decisions become much clearer and more meaningful.",

    approachTitle: "Three key factors for successful \"fundraising\" for yourself",
    approachIntro: "I call the scholarship application process a way of \"fundraising\" for yourself. Scholarship providers will look at three factors: passion, personal ability, and the ability to spread positive energy to the community.",

    footerBrand: "Dương Trân",
    footerTagline: "Life coach partnering with Vietnamese youth",
    footerLinksTitle: "LINKS",
    footerBlog: "Blog",
    footerContact: "Contact",
    footerResourcesTitle: "REFERENCE MATERIALS",
    footerScholarship: "Scholarships",
    footerStudyAbroad: "Study Abroad",
    footerCareer: "Career",
    footerFAQ: "FAQ",
    footerCopyright: "© Dương Trân. All rights reserved.",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms of Use",
  }
};

export default async function TWGPage({ params }: TWGProps) {
  const { locale } = params;
  const t = translations[locale as keyof typeof translations] || translations.vi;

  return (
    <>
      <Navbar1 locale={locale} translations={t} />

      {/* Hero Section */}
      <section className="py-20 bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-8 text-center">
          <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-fg mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-muted mb-12 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-br from-[#F0EBE0] to-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="max-w-[1000px] mx-auto">
            <div className="bg-white border-2 border-accent rounded-2xl p-12 shadow-[0_8px_24px_rgba(30,58,95,0.08)]">
              <h2 className="text-2xl font-bold text-accent mb-6 text-center">{t.missionTitle}</h2>
              <p className="text-xl text-fg leading-[1.7] text-center">
                "{t.mission}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-3xl font-bold text-fg mb-12 text-center">{t.philosophyTitle}</h2>
            <div className="space-y-6 text-lg leading-[1.9] text-fg text-justify">
              <p>{t.philoPara1}</p>
              <p>{t.philoPara2}</p>
              <p>{t.philoPara3}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-20 bg-[#F0EBE0]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-3xl font-bold text-accent mb-8 text-center">{t.approachTitle}</h2>
            <p className="text-lg leading-[1.8] text-fg text-center">
              {t.approachIntro}
            </p>
          </div>
        </div>
      </section>

      <Footer1 locale={locale} translations={t} />
    </>
  );
}
