import Image from 'next/image'

import { Container } from '@/components/Container'
import { PageHeader } from '@/components/PageHeader'
import { CategoryScroller } from '@/components/blog/CategoryScroller'
import { getPostSummaries } from '@/lib/post'
import { legacyMediaUrl, isMediaRemoteUrl } from '@/lib/media/media-client'
import { generateMetadata as genMeta } from '@/lib/seo'
import { Metadata } from 'next'

// Force dynamic rendering to always fetch fresh data
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  return genMeta({
    title: 'Blog',
    description: 'Insights, reflections, and professional thoughts on accounting, tax, and small business finance from Lieu Vo, ACCA Qualified Accountant.',
    locale: params.locale,
    path: '/blog',
  })
}

interface BlogPageProps {
  params: {
    locale: string
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
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

  const fallbackImg = legacyMediaUrl('/img/Portrait_Placeholder.png')

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

      {/* Featured Post Section */}
      <div className="py-20 bg-white">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-6">
            {blogTranslations.featuredArticle}
          </p>
          <a
            href={`/${locale}/blog/${featuredPost.slug}`}
            className="group block bg-white border-l-4 border-amber-500 shadow-md hover:shadow-xl transition-shadow"
          >
            <div className="flex flex-col lg:flex-row">
              <div className="relative w-full lg:w-1/2 h-80 lg:h-96">
                <Image
                  src={featuredPost.image || fallbackImg}
                  alt={featuredPost.title}
                  fill
                  style={{
                    objectFit: (featuredPost.imageFit as 'cover' | 'contain' | 'fill') || 'cover',
                    objectPosition: featuredPost.imagePosition || 'center',
                    transform: `scale(${(featuredPost.imageZoom || 100) / 100})`
                  }}
                  className="border-4 border-slate-800"
                  quality={90}
                  unoptimized={isMediaRemoteUrl(featuredPost.image || fallbackImg)}
                />
              </div>
              <div className="flex-1 p-8 flex flex-col justify-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-3">
                  {featuredPost.category || blogTranslations.category}
                </p>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-4 leading-tight group-hover:text-amber-600 transition-colors">
                  {featuredPost.title}
                </h2>
                {featuredPost.quote && (
                  <p className="text-base text-slate-700 leading-relaxed italic mb-4">
                    "{featuredPost.quote}"
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
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
          <div key={category} className={`py-20 ${index % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
            <Container>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 leading-tight">
                  {category}
                </h2>
                {hasMoreThanThree && (
                  <a
                    href={`/${locale}/blog?category=${encodeURIComponent(category)}`}
                    className="text-sm font-semibold text-amber-600 hover:text-amber-500 transition-colors whitespace-nowrap"
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
