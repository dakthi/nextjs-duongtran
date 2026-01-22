import { Container } from '@/components/Container'
import { PageHeader } from '@/components/PageHeader'
import { CategoryScroller } from '@/components/blog/CategoryScroller'
import { BlogSearch } from '@/components/blog/BlogSearch'
import { PostImage } from '@/components/blog/PostImage'
import { getPostSummaries } from '@/lib/post'
import { legacyMediaUrl } from '@/lib/media/media-client'
import { generateMetadata as genMeta } from '@/lib/seo'
import { Metadata } from 'next'

// Force dynamic rendering to always fetch fresh data
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  return genMeta({
    title: 'Blog',
    description: 'Insights, reflections, and professional thoughts on accounting, tax, and small business finance from Duong Tran, ACCA Qualified Accountant.',
    locale: params.locale,
    path: '/blog',
  })
}

interface BlogPageProps {
  params: {
    locale: string
  }
  searchParams?: {
    category?: string
  }
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  // Validate locale - fallback to 'en' if invalid
  const validLocales = ['en', 'vi']
  const locale = validLocales.includes(params.locale) ? params.locale : 'en'

  const posts = await getPostSummaries(locale)

  // Load translations based on locale
  const messages = (await import(`@/../messages/${locale}.json`)).default
  const blogTranslations = messages.blog

  if (posts.length === 0) {
    return (
      <PageHeader
        eyebrow={blogTranslations.eyebrow}
        title={blogTranslations.title}
        description={blogTranslations.emptyDescription}
      />
    )
  }

  const fallbackImg = legacyMediaUrl('/img/post-thumbnail-fallback.png')

  // Featured post (most recent)
  const [featuredPost, ...rest] = posts

  // Group remaining posts by category
  const postsByCategory = rest.reduce((acc, post) => {
    const category = post.category || (blogTranslations.recentPosts || 'Recent Posts')
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(post)
    return acc
  }, {} as Record<string, typeof rest>)

  // Sort categories by number of posts (descending)
  const categories = Object.keys(postsByCategory).sort(
    (a, b) => postsByCategory[b].length - postsByCategory[a].length
  )

  return (
    <>
      <PageHeader
        eyebrow={blogTranslations.eyebrow}
        title={blogTranslations.title}
        description={blogTranslations.description}
      />

      {/* Search Section */}
      <BlogSearch
        posts={posts}
        locale={locale}
        fallbackImg={fallbackImg}
        minReadText={blogTranslations.minRead}
        searchPlaceholder={blogTranslations.searchPlaceholder || 'Search articles...'}
        noResultsText={blogTranslations.noResults || 'No articles found matching your search.'}
        initialCategory={searchParams?.category}
      />

      {/* Featured Post Section */}
      <div className="pt-6 pb-20 bg-white">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-widest text-feldgrau mb-6">
            {blogTranslations.featuredArticle}
          </p>
          <a
            href={`/${locale}/blog/${featuredPost.slug}`}
            className="group block bg-white border-l-4 border-gray-300 hover:border-jungle-green shadow-md hover:shadow-xl transition-all"
          >
            <div className="flex flex-col lg:flex-row">
              <PostImage
                src={featuredPost.image}
                fallbackSrc={fallbackImg}
                alt={featuredPost.title}
                imageFit={featuredPost.imageFit as 'cover' | 'contain' | 'fill' | null}
                imagePosition={featuredPost.imagePosition}
                imageZoom={featuredPost.imageZoom}
                quality={90}
                priority={true}
                className="w-full lg:w-1/2 h-80 lg:h-96 overflow-hidden rounded-r-md"
              />
              <div className="flex-1 p-8 flex flex-col justify-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-jungle-green mb-3">
                  {featuredPost.category || blogTranslations.category}
                </p>
                <h2 className="text-2xl md:text-3xl font-sans font-bold text-outer-space mb-4 leading-tight group-hover:text-jungle-green transition-colors">
                  {featuredPost.title}
                </h2>
                {featuredPost.quote && (
                  <p className="text-base text-feldgrau leading-relaxed italic mb-4">
                    "{featuredPost.quote}"
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-3 text-sm text-feldgrau">
                  {featuredPost.date && (
                    <span className="whitespace-nowrap">{new Date(featuredPost.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  )}
                  {featuredPost.date && featuredPost.readingTime != null && (
                    <span className="text-slate-300">|</span>
                  )}
                  {featuredPost.readingTime != null && (
                    <span className="whitespace-nowrap">{featuredPost.readingTime} {blogTranslations.minRead}</span>
                  )}
                </div>
              </div>
            </div>
          </a>
        </Container>
      </div>

      {/* Category Sections */}
      {categories.map((category, index) => {
        const categoryPosts = postsByCategory[category]
        const hasMoreThanThree = categoryPosts.length > 3

        return (
          <div key={category} className={`py-20 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
            <Container>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl md:text-4xl font-sans font-bold text-outer-space leading-tight">
                  {category}
                </h2>
                {hasMoreThanThree && (
                  <a
                    href={`/${locale}/blog?category=${encodeURIComponent(category)}`}
                    className="text-sm font-semibold text-jungle-green hover:text-jungle-green transition-colors whitespace-nowrap"
                  >
                    {blogTranslations.viewAll || 'View All'} →
                  </a>
                )}
              </div>

              <CategoryScroller
                posts={categoryPosts}
                category={category}
                locale={locale}
                fallbackImg={fallbackImg}
                minReadText={blogTranslations.minRead}
              />
            </Container>
          </div>
        )
      })}
    </>
  )
}
