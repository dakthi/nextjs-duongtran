import { Navbar1 } from "@/components/Navbar1";
import { Footer1 } from "@/components/Footer1";
import { generateMetadata as genMeta } from "@/lib/seo";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface ContactProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: ContactProps): Promise<Metadata> {
  const { locale } = params;

  const descriptions = {
    en: "Get in touch with Duong Tran for life coaching and mentoring services.",
    vi: "Liên hệ với Dương Trần để được tư vấn và đồng hành."
  };

  return genMeta({
    title: locale === 'vi' ? 'Liên hệ' : 'Contact',
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    locale,
    path: '/contact',
  });
}

const translations = {
  vi: {
    navLogo: "Dương Trần",
    navServices: "Together We Grow",
    navBlog: "Blog",
    navCTA: "Đặt lịch hẹn",
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

export default async function ContactPage({ params }: ContactProps) {
  const { locale } = params;
  const t = translations[locale as keyof typeof translations] || translations.vi;

  return (
    <>
      <Navbar1 locale={locale} translations={t} />

      {/* Main Content - Placeholder */}
      <section className="py-20 bg-white min-h-[60vh]">
        <div className="max-w-[1200px] mx-auto px-8">
          <h1 className="text-4xl font-bold text-fg mb-8">{locale === 'vi' ? 'Liên hệ' : 'Contact'}</h1>
          <p className="text-lg text-muted">Content coming soon...</p>
        </div>
      </section>

      <Footer1 locale={locale} translations={t} />
    </>
  );
}
