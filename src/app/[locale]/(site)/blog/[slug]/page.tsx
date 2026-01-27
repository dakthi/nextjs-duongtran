import { getPostBySlug, getPostSlugs } from '@/lib/post'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { isMediaRemoteUrl } from '@/lib/media/media-client'
import { generateMetadata as genMeta, generateBlogPostingSchema, generateBreadcrumbSchema, siteConfig } from '@/lib/seo'
import { BlogContent } from '@/components/blog/BlogContent'
import { Navbar1 } from '@/components/Navbar1'
import { Footer1 } from '@/components/Footer1'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

type Params = {
  params: { slug: string; locale: string };
};

export async function generateStaticParams(): Promise<{ slug: string; locale: string }[]> {
  const slugs = await getPostSlugs()
  return slugs.flatMap((slug) => [
    { slug, locale: 'en' },
    { slug, locale: 'vi' }
  ])
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  let post
  try {
    post = await getPostBySlug(params.slug, params.locale)
  } catch (error) {
    return genMeta({
      title: 'Post Not Found',
      locale: params.locale,
      noIndex: true,
    })
  }

  if (!post) {
    return genMeta({
      title: 'Post Not Found',
      locale: params.locale,
      noIndex: true,
    })
  }

  return genMeta({
    title: post.title,
    description: post.excerpt || post.title,
    image: post.image || undefined,
    locale: params.locale,
    path: `/blog/${params.slug}`,
  })
}

const translations = {
  vi: {
    navLogo: "Dương Trần",
    navServices: "Together We Grow",
    navBlog: "Blog",
    navCTA: "Đặt lịch hẹn",
    backToBlog: "← Quay lại Blog",
    minRead: "phút đọc",

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
    backToBlog: "← Back to Blog",
    minRead: "min read",

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
}

export default async function BlogPostPage({ params }: Params) {
  let post
  try {
    post = await getPostBySlug(params.slug, params.locale)
  } catch (error) {
    return notFound()
  }

  if (!post) return notFound()

  const validLocales = ['en', 'vi']
  const locale = validLocales.includes(params.locale) ? params.locale : 'en'
  const t = translations[locale as keyof typeof translations] || translations.vi

  // Generate structured data
  const blogPostingSchema = generateBlogPostingSchema({
    title: post.title,
    description: post.excerpt || post.title,
    url: `${siteConfig.url}/${params.locale}/blog/${params.slug}`,
    image: post.image || undefined,
    datePublished: post.date || new Date().toISOString(),
    dateModified: post.date || new Date().toISOString(),
    author: post.expert?.name || 'Duong Tran',
    category: post.category || undefined,
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: `${siteConfig.url}/${params.locale}` },
    { name: 'Blog', url: `${siteConfig.url}/${params.locale}/blog` },
    { name: post.title, url: `${siteConfig.url}/${params.locale}/blog/${params.slug}` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <Navbar1 locale={locale} translations={t} />

      {/* Back to Blog */}
      <section className="py-6 bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-8">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
          >
            {t.backToBlog}
          </Link>
        </div>
      </section>

      {/* Hero Image */}
      {post.image && (
        <section className="bg-white">
          <div className="max-w-[1200px] mx-auto">
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="1200px"
                unoptimized={isMediaRemoteUrl(post.image)}
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* Article Header */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="max-w-[900px]">
          {/* Category Badge */}
          {post.category && (
            <div className="mb-6">
              <span className="inline-block px-4 py-1 bg-accent-2 text-white text-xs font-semibold uppercase tracking-wider rounded-full">
                {post.category}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] font-bold text-fg mb-6 leading-[1.2]">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-muted leading-[1.8] mb-8">
              {post.excerpt}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-muted">
            {post.date && (
              <span>
                {new Date(post.date).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            )}
            {post.date && post.readingTime && <span>•</span>}
            {post.readingTime && (
              <span>{post.readingTime} {t.minRead}</span>
            )}
          </div>

          {/* Author */}
          {post.expert && (
            <div className="mt-8 pt-8 border-t border-gray-200 flex items-center gap-4">
              {post.expert.image && (
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-accent">
                  <Image
                    src={post.expert.image}
                    alt={post.expert.name ?? 'Author'}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                    unoptimized={isMediaRemoteUrl(post.expert.image)}
                  />
                </div>
              )}
              <div>
                <p className="font-semibold text-fg">{post.expert.name ?? 'Duong Tran'}</p>
                {post.expert.title && (
                  <p className="text-sm text-muted">{post.expert.title}</p>
                )}
              </div>
            </div>
          )}
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-[#F0EBE0]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="max-w-[900px]">
          <div className="bg-white rounded-xl p-8 md:p-12 shadow-sm">
            {/* Quote */}
            {post.quote && (
              <blockquote className="border-l-4 border-accent pl-8 italic text-xl text-fg mb-12 leading-[1.8]">
                <span className="text-4xl text-accent-2 mr-2">"</span>
                {post.quote}
              </blockquote>
            )}

            {/* Markdown Content */}
            <BlogContent
              content={post.content}
              className="prose prose-lg max-w-none text-lg leading-[1.8] text-fg prose-headings:font-serif prose-headings:font-bold prose-headings:text-fg prose-h2:text-3xl prose-h3:text-2xl prose-p:mb-6 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-fg prose-ul:my-6 prose-li:mb-2"
            />
          </div>
          </div>
        </div>
      </section>

      <Footer1 locale={locale} translations={t} />
    </>
  );
}
