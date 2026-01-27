import Link from 'next/link'
import Image from 'next/image'
import { Navbar1 } from '@/components/Navbar1'
import { Footer1 } from '@/components/Footer1'
import { CategoryFilters } from '@/components/blog/CategoryFilters'
import { getPostSummaries } from '@/lib/post'
import { legacyMediaUrl } from '@/lib/media/media-client'
import { generateMetadata as genMeta } from '@/lib/seo'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

interface BlogPageProps {
  params: {
    locale: string
  }
  searchParams?: {
    category?: string | string[]
    search?: string
    page?: string
  }
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  return genMeta({
    title: 'Blog',
    description: 'Stories, insights, and reflections on education, personal growth, and student success from Duong Tran.',
    locale: params.locale,
    path: '/blog',
  })
}

const translations = {
  vi: {
    navLogo: "Dương Trần",
    navServices: "Together We Grow",
    navBlog: "Blog",
    navCTA: "Đặt lịch hẹn",

    pageTitle: "Blog",
    pageSubtitle: "Câu chuyện, kiến thức và suy ngẫm về giáo dục, phát triển bản thân và thành công của học sinh",
    featuredPost: "Bài viết nổi bật",
    allPosts: "Tất cả bài viết",
    readMore: "Đọc tiếp",
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

    pageTitle: "Blog",
    pageSubtitle: "Stories, insights, and reflections on education, personal growth, and student success",
    featuredPost: "Featured post",
    allPosts: "All posts",
    readMore: "Read more",
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

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const validLocales = ['en', 'vi']
  const locale = validLocales.includes(params.locale) ? params.locale : 'en'

  const posts = await getPostSummaries(locale)
  const t = translations[locale as keyof typeof translations] || translations.vi

  const fallbackImg = legacyMediaUrl('/img/post-thumbnail-fallback.png')

  // Featured and carousel posts (always show all)
  const [featuredPost, ...allOtherPosts] = posts

  // Filter posts for list view only
  let filteredListPosts = posts.slice(8) // Only list view posts (after featured + carousel)

  if (searchParams?.category) {
    const selectedCategories = Array.isArray(searchParams.category)
      ? searchParams.category
      : [searchParams.category]
    filteredListPosts = filteredListPosts.filter(post =>
      post.category && selectedCategories.includes(post.category)
    )
  }

  if (searchParams?.search) {
    const searchLower = searchParams.search.toLowerCase()
    filteredListPosts = filteredListPosts.filter(post =>
      post.title.toLowerCase().includes(searchLower) ||
      post.excerpt?.toLowerCase().includes(searchLower) ||
      post.category?.toLowerCase().includes(searchLower)
    )
  }

  // Pagination for list view only
  const POSTS_PER_PAGE = 10
  const currentPage = parseInt(searchParams?.page || '1')
  const totalPosts = filteredListPosts.length
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const paginatedListPosts = filteredListPosts.slice(startIndex, endIndex)

  // Get all unique categories
  const categories = Array.from(new Set(posts.map(p => p.category).filter(Boolean))) as string[]

  // Get selected categories as array
  const selectedCategories = searchParams?.category
    ? Array.isArray(searchParams.category)
      ? searchParams.category
      : [searchParams.category]
    : []

  // Build pagination URL
  const buildPaginationUrl = (page: number) => {
    const params = new URLSearchParams()
    if (searchParams?.category) {
      const cats = Array.isArray(searchParams.category) ? searchParams.category : [searchParams.category]
      cats.forEach(cat => params.append('category', cat))
    }
    if (searchParams?.search) params.set('search', searchParams.search)
    if (page > 1) params.set('page', page.toString())
    const query = params.toString()
    return `/${locale}/blog${query ? '?' + query : ''}`
  }

  return (
    <>
      <Navbar1 locale={locale} translations={t} />

      {/* Thin Hero Banner */}
      <section className="py-12 bg-[#F0EBE0] border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-8 text-center">
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold text-fg mb-2">
            {t.pageTitle}
          </h1>
          <p className="text-base text-muted max-w-2xl mx-auto">
            {t.pageSubtitle}
          </p>
        </div>
      </section>

      {/* Blog Grid - Homepage Style */}
      {posts.length > 0 && (
        <section className="pt-8 pb-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">
              {/* Featured Post */}
              {featuredPost && (
                <Link href={`/${locale}/blog/${featuredPost.slug}`}>
                  <article className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all cursor-pointer min-h-[55vh] flex flex-col">
                    {featuredPost.image && (
                      <div className="relative h-[28vh] flex-shrink-0">
                        <Image
                          src={featuredPost.image}
                          alt={featuredPost.title}
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
                          {featuredPost.date && new Date(featuredPost.date).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                          {featuredPost.readingTime && ` • ${featuredPost.readingTime} ${t.minRead}`}
                        </div>
                        <h3 className="font-serif text-[2rem] font-bold text-fg mb-5 leading-[1.3]">
                          {featuredPost.title}
                        </h3>
                        {featuredPost.excerpt && (
                          <p className="text-lg text-muted leading-[1.8] mb-6">
                            {featuredPost.excerpt}
                          </p>
                        )}
                      </div>
                      <div className="inline-flex items-center gap-2 text-accent font-semibold text-base group">
                        {t.readMore}
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </div>
                    </div>
                  </article>
                </Link>
              )}

              {/* Right Column Posts */}
              <div className="grid grid-cols-1 gap-6">
                {allOtherPosts.slice(0, 4).map((post) => (
                  <Link key={post.slug} href={`/${locale}/blog/${post.slug}`}>
                    <article className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all cursor-pointer">
                      <div className="p-8">
                        <div className="text-xs text-muted mb-3">
                          {post.date && new Date(post.date).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                          {post.readingTime && ` • ${post.readingTime} ${t.minRead}`}
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
          </div>
        </section>
      )}

      {/* Blog Carousel - Other Posts */}
      {allOtherPosts.length > 4 && (
        <section className="pb-12 bg-white">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="mb-6">
              <h3 className="font-serif text-2xl font-bold text-fg">
                {locale === 'vi' ? 'Bài viết khác' : 'Other posts'}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {allOtherPosts.slice(4, 8).map((post, index) => {
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
        </section>
      )}

      {/* All Posts List View with Sidebar Filters */}
      {posts.length > 8 && (
        <section className="pb-20 bg-white border-t border-gray-200 pt-12">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
              {/* Sidebar Filters */}
              <aside className="lg:sticky lg:top-24 h-fit">
                {/* Search Box */}
                <form action={`/${locale}/blog`} method="get" className="mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      name="search"
                      placeholder={locale === 'vi' ? 'Tìm kiếm...' : 'Search...'}
                      defaultValue={searchParams?.search}
                      className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-accent transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                  {selectedCategories.map((cat) => (
                    <input key={cat} type="hidden" name="category" value={cat} />
                  ))}
                </form>

                <h4 className="text-sm font-semibold text-fg mb-4 uppercase tracking-wider">
                  {locale === 'vi' ? 'Lọc theo chủ đề' : 'Filter by topic'}
                </h4>
                <CategoryFilters
                  categories={categories}
                  selectedCategories={selectedCategories}
                  locale={locale}
                />
              </aside>

              {/* Posts List */}
              <div className="space-y-16 border-l border-gray-200 pl-8">
                {/* Pagination Top */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 mb-8 border-b border-gray-200">
                    {/* Results Info */}
                    <div className="text-sm text-muted">
                      {locale === 'vi'
                        ? `Hiển thị ${startIndex + 1}-${Math.min(endIndex, totalPosts)} trong ${totalPosts} bài viết`
                        : `Showing ${startIndex + 1}-${Math.min(endIndex, totalPosts)} of ${totalPosts} posts`
                      }
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                        const showPage =
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)

                        if (!showPage) {
                          if (page === currentPage - 2 || page === currentPage + 2) {
                            return <span key={page} className="px-2 text-muted">...</span>
                          }
                          return null
                        }

                        return (
                          <Link
                            key={page}
                            href={buildPaginationUrl(page)}
                            className={`px-4 py-2 text-sm font-medium transition-colors ${
                              page === currentPage
                                ? 'text-accent font-semibold'
                                : 'text-muted hover:text-accent'
                            }`}
                          >
                            {page}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )}

                {paginatedListPosts.map((post, index) => {
                  const placeholderColors = ['bg-accent', 'bg-accent-2', 'bg-[#F0EBE0]', 'bg-gray-200'];
                  const placeholderColor = placeholderColors[index % placeholderColors.length];

                  return (
                    <Link key={post.slug} href={`/${locale}/blog/${post.slug}`}>
                      <article className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer mb-6">
                        <div className="flex flex-col sm:flex-row gap-0">
                          {/* Thumbnail */}
                          {post.image ? (
                            <div className="relative w-full sm:w-[280px] h-[200px] sm:h-auto flex-shrink-0">
                              <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 100vw, 280px"
                                unoptimized
                              />
                            </div>
                          ) : (
                            <div className={`w-full sm:w-[280px] h-[200px] sm:h-auto flex-shrink-0 ${placeholderColor}`} />
                          )}

                          {/* Content */}
                          <div className="p-8 flex-1 flex flex-col justify-center">
                            {post.category && (
                              <div className="mb-3">
                                <span className="inline-block px-3 py-1 bg-gray-100 text-accent text-xs font-semibold uppercase tracking-wider rounded-full">
                                  {post.category}
                                </span>
                              </div>
                            )}
                            <h3 className="font-serif text-2xl font-bold text-fg mb-3 leading-[1.3]">
                              {post.title}
                            </h3>
                            {post.excerpt && (
                              <p className="text-base text-muted leading-relaxed mb-4 line-clamp-2">
                                {post.excerpt}
                              </p>
                            )}
                            <div className="flex items-center gap-3 text-sm text-muted">
                              {post.date && (
                                <span>{new Date(post.date).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                              )}
                              {post.date && post.readingTime && <span>•</span>}
                              {post.readingTime && (
                                <span>{post.readingTime} {t.minRead}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  );
                })}

                {/* Pagination Bottom */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 mt-8 border-t border-gray-200">
                    {/* Results Info */}
                    <div className="text-sm text-muted">
                      {locale === 'vi'
                        ? `Hiển thị ${startIndex + 1}-${Math.min(endIndex, totalPosts)} trong ${totalPosts} bài viết`
                        : `Showing ${startIndex + 1}-${Math.min(endIndex, totalPosts)} of ${totalPosts} posts`
                      }
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                        const showPage =
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)

                        if (!showPage) {
                          if (page === currentPage - 2 || page === currentPage + 2) {
                            return <span key={page} className="px-2 text-muted">...</span>
                          }
                          return null
                        }

                        return (
                          <Link
                            key={page}
                            href={buildPaginationUrl(page)}
                            className={`px-4 py-2 text-sm font-medium transition-colors ${
                              page === currentPage
                                ? 'text-accent font-semibold'
                                : 'text-muted hover:text-accent'
                            }`}
                          >
                            {page}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer1 locale={locale} translations={t} />
    </>
  )
}
