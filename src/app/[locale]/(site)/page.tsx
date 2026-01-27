import Image from "next/image";
import Link from "next/link";
import { legacyMediaUrl } from "@/lib/media/media-client";
import { generateMetadata as genMeta } from "@/lib/seo";
import { getPostSummaries } from "@/lib/post";
import { Navbar1 } from "@/components/Navbar1";
import { Footer1 } from "@/components/Footer1";
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

const translations = {
  vi: {
    // Nav
    navLogo: "Dương Trần",
    navAbout: "Về mình",
    navServices: "Together We Grow",
    navBlog: "Blog",
    navCTA: "Đặt lịch hẹn",

    // Hero
    heroTitle: "Đồng hành với những dự định du học",
    heroText: "Mình muốn Together We Grow là một nơi an toàn để các bạn học sinh được kết nối với bản thân, từ đó tìm và apply thành công vào môi trường học tập phù hợp. Không phải về con số \"khủng\" hay trường top rank, mà về việc hiểu rõ bản thân và tự tin đưa ra lựa chọn đúng đắn cho riêng mình.",
    heroCTA1: "Đặt lịch tư vấn",
    heroCTA2: "Đọc hành trình của mình",

    // Highlight Quote
    highlightLabel: "Du học sinh về hay ở",
    highlightTitle: "Chọn cách đồng hành với các bạn trẻ sau mình là cách mình \"trở về\"",

    // Philosophy
    philoPara1: "rong quan sát của mình, nhiều người trẻ đi du học vì sự sắp đặt của cha mẹ hoặc coi đó là sự đầu tư thuần túy, thiếu mục đích rõ ràng. Khi được hỏi \"Tại sao bạn muốn đi du học?\", nhiều bạn trẻ chỉ có thể đưa ra những câu trả lời chung chung hoặc dựa trên mong muốn của người khác.",
    philoPara2: "Nhưng khi bạn hiểu mình cần gì, bạn sẽ tự tin hơn trong việc đưa ra lựa chọn. Bạn sẽ biết mình cần trường nào, môi trường như thế nào, và quan trọng nhất là bạn muốn phát triển bản thân theo hướng nào. Đó không chỉ là việc chọn một ngôi trường hay một ngành học, mà là việc chọn một hành trình phù hợp với con người thật của bạn.",
    philoPara3: "Du học không chỉ là về bằng cấp hay kiến thức, mà còn là cơ hội để bạn khám phá bản thân, thử thách giới hạn, và xây dựng tương lai mà bạn thực sự mong muốn. Khi bạn kết nối với chính mình, mọi quyết định sẽ trở nên rõ ràng và có ý nghĩa hơn rất nhiều.",

    // Mission
    missionLabel: "Mission",
    missionText: "Mình muốn Together We Grow là một nơi an toàn để các bạn học sinh được kết nối với bản thân, từ đó tìm và apply thành công vào môi trường học tập phù hợp.",

    // Blog Intro
    blogIntroTitle: "Ba yếu tố quan trọng khi \"gọi vốn\" cho bản thân",
    blogIntroPara1: "ình gọi việc apply học bổng là một cách \"gọi vốn\" cho bản thán. Các nhà cấp học bổng sẽ nhìn vào ba yếu tố: sự đam mê, năng lực bản thân, và khả năng lan tỏa năng lượng tích cực đến cộng đồng.",
    blogIntroPara2: "Mình viết về những trải nghiệm, bài học và suy ngẫm trong hành trình này. Hy vọng những chia sẻ dưới đây sẽ hữu ích cho bạn.",
    blogIntroSignature: "— Dương Trân",

    // Blog Posts
    blogFeaturedCategory: "Du học",
    blogFeaturedTitle: "Làm sao để \"kết nối với bản thân\" trước khi đi du học?",
    blogFeaturedExcerpt: "Nhiều bạn trẻ lựa chọn du học dựa trên sự sắp đặt của cha mẹ hoặc coi đó là khoản đầu tư thuần túy. Nhưng khi bạn hiểu mình thực sự cần gì, mọi quyết định sẽ trở nên rõ ràng hơn...",
    blogFeaturedCTA: "Đọc bài viết đầy đủ",
    blogPost2Title: "Ba yếu tố để \"gọi vốn\" thành công",
    blogPost3Title: "Together We Grow: Cùng lớn với thế hệ trẻ",
    blogPost4Title: "Kinh nghiệm xin visa du học Anh",
    blogPost5Title: "Tại sao nên đầu tư vào bản thân?",

    // Quote
    quoteText: "\"Chúng ta không thể trở thành người mình muốn nếu cứ giữ nguyên bản thân như hiện tại.\"",
    quoteAuthor: "Max DePree",

    // CTA
    ctaName: "Dương Trân",
    ctaDescription: "Hiện tại, mình đang làm Marketing Specialist tại University of Oxford và đồng thời điều hành Together We Grow. Để mình có thể hỗ trợ bạn tốt nhất, bạn nên đọc các bài viết trước, sau đó đặt lịch tư vấn với mình.",
    ctaReadArticles: "Đọc bài viết",
    ctaBookSession: "Đặt lịch tư vấn",

    // Footer
    footerBrand: "Dương Trân",
    footerTagline: "Life coach đồng hành cùng bạn trẻ Việt Nam",
    footerLinksTitle: "LIÊN KẾT",
    footerAbout: "Về mình",
    footerServices: "Dịch vụ",
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
    // Nav
    navLogo: "Duong Tran",
    navAbout: "About",
    navServices: "Together We Grow",
    navBlog: "Blog",
    navCTA: "Book Session",

    // Hero
    heroTitle: "Supporting Study Abroad Aspirations",
    heroText: "I want Together We Grow to be a safe space for students to connect with themselves, and from there find and successfully apply to the right learning environment. It's not about impressive numbers or top-ranked schools, but about understanding yourself and confidently making the right choices for you.",
    heroCTA1: "Book a Consultation",
    heroCTA2: "Read My Journey",

    // Rest translations...
    highlightLabel: "Study Abroad: Stay or Return",
    highlightTitle: "Choosing to support young people after me is how I \"return\"",
    philoPara1: "n my observation, many young people study abroad due to their parents' arrangements or see it as a pure investment, lacking clear purpose. When asked \"Why do you want to study abroad?\", many can only give generic answers or based on others' wishes.",
    philoPara2: "But when you understand what you need, you'll be more confident in making choices. You'll know which school you need, what kind of environment, and most importantly, how you want to develop yourself. It's not just about choosing a school or a major, but choosing a journey that fits your true self.",
    philoPara3: "Studying abroad is not just about degrees or knowledge, but also an opportunity to discover yourself, challenge limits, and build the future you truly desire. When you connect with yourself, all decisions become much clearer and more meaningful.",
    missionLabel: "Mission",
    missionText: "I want Together We Grow to be a safe space for students to connect with themselves, and from there find and successfully apply to the right learning environment.",
    blogIntroTitle: "Three Key Factors for Successful \"Fundraising\" for Yourself",
    blogIntroPara1: " call the scholarship application process a way of \"fundraising\" for yourself. Scholarship providers will look at three factors: passion, personal ability, and the ability to spread positive energy to the community.",
    blogIntroPara2: "I write about experiences, lessons, and reflections on this journey. I hope the sharing below will be useful to you.",
    blogIntroSignature: "— Dương Trân",
    blogFeaturedCategory: "Study Abroad",
    blogFeaturedTitle: "How to \"connect with yourself\" before studying abroad?",
    blogFeaturedExcerpt: "Many young people choose to study abroad based on their parents' arrangements or consider it purely as an investment. But when you understand what you really need, all decisions will become clearer...",
    blogFeaturedCTA: "Read full article",
    blogPost2Title: "Three factors for successful \"fundraising\"",
    blogPost3Title: "Together We Grow: Growing with the young generation",
    blogPost4Title: "Experience applying for UK student visa",
    blogPost5Title: "Why invest in yourself?",
    quoteText: "\"We cannot become what we want by remaining what we are.\"",
    quoteAuthor: "Max DePree",
    ctaName: "Dương Trân",
    ctaDescription: "Currently, I work as a Marketing Specialist at the University of Oxford while also running Together We Grow. For me to best support you, you should read the articles first, then book a consultation with me.",
    ctaReadArticles: "Read Articles",
    ctaBookSession: "Book Consultation",
    footerBrand: "Dương Trân",
    footerTagline: "Life coach partnering with Vietnamese youth",
    footerLinksTitle: "LINKS",
    footerAbout: "About Me",
    footerServices: "Services",
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

export default async function Home({ params }: HomeProps) {
  const { locale } = params;
  const t = translations[locale as keyof typeof translations] || translations.vi;

  // Fetch real blog posts
  const posts = await getPostSummaries(locale);
  const fallbackImg = legacyMediaUrl('/img/post-thumbnail-fallback.png');

  return (
    <>
      {/* Navigation */}
      <Navbar1 locale={locale} translations={t} />

      {/* Hero Section */}
      <section className="py-20 border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20">
            {/* Left: Main Content */}
            <div>
              <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.2] text-fg mb-8">
                {t.heroTitle}
              </h1>

              <div className="mt-10">
                <p className="text-lg leading-[1.9] text-fg mb-12">
                  {t.heroText}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={`/${locale}/contact`}
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-accent hover:bg-accent/90 rounded-full transition-all shadow-lg"
                  >
                    {t.heroCTA1}
                  </Link>
                  <Link
                    href={`/${locale}/about`}
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-accent bg-white hover:bg-gray-50 border-2 border-accent rounded-full transition-all"
                  >
                    {t.heroCTA2}
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="relative h-[400px] lg:h-auto">
              <Image
                src={legacyMediaUrl('/duong-tran-about.jpg')}
                alt="Duong Tran"
                fill
                priority
                className="object-cover rounded-2xl shadow-xl"
                sizes="(max-width: 1024px) 100vw, 40vw"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* Highlight Quote */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="max-w-[900px] mx-auto text-center">
            <p className="text-lg italic text-muted mb-4">
              {t.highlightLabel}
            </p>
            <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-bold leading-[1.4] text-accent mb-4">
              "{t.highlightTitle}"
            </h2>
          </div>
        </div>
      </section>

      {/* Philosophy with Image - Newspaper Style */}
      <section className="py-20 bg-[#F0EBE0]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="max-w-[1400px] mx-auto">
            {/* Large Featured Image */}
            <div className="mb-16">
              <Image
                src={legacyMediaUrl('/duong-tran-award-hero.webp')}
                alt="Duong Tran receiving Student of the Year award"
                width={1400}
                height={600}
                className="w-full h-auto rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] max-h-[600px] object-cover"
                sizes="100vw"
                unoptimized
              />
            </div>

            {/* 3-Column Newspaper Text */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-12 text-justify">
              <p className="text-lg leading-[1.9] text-fg mb-6 first-letter:float-left first-letter:font-serif first-letter:text-[5rem] first-letter:leading-[0.8] first-letter:mr-2 first-letter:mt-1 first-letter:text-accent-2 first-letter:font-bold">
                T{t.philoPara1}
              </p>

              <p className="text-lg leading-[1.9] text-fg mb-6">
                {t.philoPara2}
              </p>

              <p className="text-lg leading-[1.9] text-fg mb-6">
                {t.philoPara3}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-gradient-to-br from-[#F0EBE0] to-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="max-w-[1000px] mx-auto">
            <div className="bg-white border-2 border-accent rounded-2xl p-12 shadow-[0_8px_24px_rgba(30,58,95,0.08)]">
              <p className="text-2xl text-accent leading-[1.7] font-semibold text-center">
                "{t.missionText}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          {/* Blog Intro with Drop Cap */}
          <div className="max-w-[1000px] mx-auto mb-16">
            <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.25rem)] font-bold text-accent mb-8 text-center">
              {t.blogIntroTitle}
            </h2>
            <div className="md:columns-2 gap-12 text-left">
              <p className="text-lg text-fg leading-[1.8] mb-6 first-letter:float-left first-letter:font-serif first-letter:text-[4.5rem] first-letter:leading-[0.85] first-letter:mr-1 first-letter:mt-1 first-letter:text-accent first-letter:font-bold">
                M{t.blogIntroPara1}
              </p>
              <p className="text-lg text-fg leading-[1.8] mb-8">
                {t.blogIntroPara2}
              </p>
              <div className="mt-8 text-right">
                <p className="font-[cursive] text-[1.75rem] text-accent italic">
                  {t.blogIntroSignature}
                </p>
              </div>
            </div>
          </div>

          {/* Blog Grid */}
          {posts.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">
              {/* Featured Post */}
              {posts[0] && (
                <Link href={`/${locale}/blog/${posts[0].slug}`}>
                  <article className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all cursor-pointer min-h-[55vh] flex flex-col">
                    {posts[0].image && (
                      <div className="relative h-[28vh] flex-shrink-0">
                        <Image
                          src={posts[0].image}
                          alt={posts[0].title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          unoptimized
                        />
                      </div>
                    )}
                    <div className="p-10 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-sm text-muted mb-4">
                          {posts[0].date && new Date(posts[0].date).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                          {posts[0].readingTime && ` • ${posts[0].readingTime} phút đọc`}
                        </div>
                        <h3 className="font-serif text-[2rem] font-bold text-fg mb-5 leading-[1.3]">
                          {posts[0].title}
                        </h3>
                        {posts[0].excerpt && (
                          <p className="text-lg text-muted leading-[1.8] mb-6">
                            {posts[0].excerpt}
                          </p>
                        )}
                      </div>
                      <div className="inline-flex items-center gap-2 text-accent font-semibold text-base group">
                        {locale === 'vi' ? 'Đọc bài viết đầy đủ' : 'Read full article'}
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </div>
                    </div>
                  </article>
                </Link>
              )}

              {/* Right Column Posts */}
              <div className="grid grid-cols-1 gap-6">
                {posts.slice(1, 5).map((post) => (
                  <Link key={post.slug} href={`/${locale}/blog/${post.slug}`}>
                    <article className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all cursor-pointer">
                      <div className="p-8">
                        <div className="text-xs text-muted mb-3">
                          {post.date && new Date(post.date).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                          {post.readingTime && ` • ${post.readingTime} phút đọc`}
                        </div>
                        <h3 className="font-serif text-xl font-bold text-fg leading-[1.3]">
                          {post.title}
                        </h3>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Blog Carousel - Other Posts */}
          {posts.length > 5 && (
            <div className="mt-8">
              <div className="mb-6 flex justify-between items-center">
                <h3 className="font-serif text-2xl font-bold text-fg">
                  {locale === 'vi' ? 'Bài viết khác' : 'Other posts'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {posts.slice(5, 9).map((post, index) => {
                  const placeholderColors = ['bg-accent', 'bg-accent-2', 'bg-[#F0EBE0]', 'bg-gray-200'];
                  const placeholderColor = placeholderColors[index % placeholderColors.length];

                  return (
                    <Link key={post.slug} href={`/${locale}/blog/${post.slug}`}>
                      <article className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all cursor-pointer h-full flex flex-col">
                        {post.image ? (
                          <div className="relative h-[180px] overflow-hidden flex-shrink-0">
                            <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                              unoptimized
                            />
                          </div>
                        ) : (
                          <div className={`h-[180px] flex-shrink-0 ${placeholderColor}`} />
                        )}
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="text-xs text-muted mb-2">
                            {post.date && new Date(post.date).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </div>
                          <h4 className="font-serif text-lg font-bold text-fg leading-[1.3]">
                            {post.title}
                          </h4>
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* View All Link */}
          <div className="text-center mt-12">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white rounded-full font-semibold hover:bg-accent/90 transition-all"
            >
              {locale === 'vi' ? 'Xem tất cả bài viết' : 'View all posts'}
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Quote Section */}
      <section className="py-20 bg-gradient-to-br from-accent to-[#152A44]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="max-w-4xl mx-auto text-center">
            <blockquote className="text-3xl md:text-4xl font-bold text-white leading-tight mb-8">
              {t.quoteText}
            </blockquote>
            <p className="text-xl text-accent-2 font-semibold">
              {t.quoteAuthor}
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-[#F5EBE0]">
        <div className="max-w-[900px] mx-auto px-8">
          <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
            {/* Avatar */}
            <div className="relative w-44 h-44 flex-shrink-0">
              <Image
                src={legacyMediaUrl('/duong-tran-about.jpg')}
                alt="Dương Trân"
                fill
                className="object-cover rounded-full border-[6px] border-white shadow-lg"
                sizes="176px"
                unoptimized
              />
            </div>

            {/* Content */}
            <div className="flex-1 text-left">
              <h2 className="font-serif text-3xl font-bold text-black mb-4">
                {t.ctaName}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {t.ctaDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/${locale}/blog`}
                  className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-accent bg-white hover:bg-gray-50 border border-accent rounded-full transition-all"
                >
                  {t.ctaReadArticles}
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-accent hover:bg-accent/90 rounded-full transition-all"
                >
                  {t.ctaBookSession}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer1 locale={locale} translations={t} />
    </>
  );
}
