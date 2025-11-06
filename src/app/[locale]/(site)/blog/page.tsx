import Image from 'next/image'

import { Container } from '@/components/Container'
import { PageHeader } from '@/components/PageHeader'
import { getPostSummaries } from '@/lib/post'
import { legacyMediaUrl, isMediaRemoteUrl } from '@/lib/media/media-client'
import { generateMetadata as genMeta } from '@/lib/seo'
import { Metadata } from 'next'

// Force dynamic rendering to always fetch fresh data
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  return genMeta({
    title: 'Blog',
    description: 'Insights, reflections, and professional thoughts on accounting, tax, and small business finance from Lieu Vo, ACCA Affiliate accountant.',
    locale: params.locale,
    path: '/blog',
  })
}

function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}

interface BlogPageProps {
  params: {
    locale: string
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const posts = await getPostSummaries(params.locale)

  if (posts.length === 0) {
    return (
      <PageHeader
        eyebrow="Insights & Reflections"
        title="Blog"
        description="Blog posts will appear here once they are published."
      />
    )
  }

  const fallbackImg = legacyMediaUrl('/img/Portrait_Placeholder.png')

  const [featuredPost, ...rest] = posts
  const top5Posts = rest.slice(0, 5)
  const morePosts = rest.slice(5)
  const chunked = chunkArray(morePosts, 6)
  const headings = ['Recent Insights', 'More Articles', 'Further Reflections', 'Latest Updates', 'New Reads']

  return (
    <>
      <PageHeader
        eyebrow="Insights & Reflections"
        title="Blog"
        description="True expertise is built over time. Beyond qualifications and certifications, it's the quiet lessons, the real-world challenges, and the continuous improvement that define my journey. Here, you can find some reflections, lessons learned, and professional thoughts, captured candidly along the way."
      />

      {/* Featured Post Section */}
      <div className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-8 xl:px-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-6">
            Featured Article
          </p>
          <a
            href={`/${params.locale}/blog/${featuredPost.slug}`}
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
                  {featuredPost.category || 'Article'}
                </p>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-4 leading-tight group-hover:text-amber-600 transition-colors">
                  {featuredPost.title}
                </h2>
                {featuredPost.quote && (
                  <p className="text-base text-slate-700 leading-relaxed italic mb-4">
                    "{featuredPost.quote}"
                  </p>
                )}
                {featuredPost.readingTime != null && (
                  <p className="text-sm text-slate-600">
                    {featuredPost.readingTime} min read
                  </p>
                )}
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Recent Posts Section */}
      {top5Posts.length > 0 && (
        <div className="py-20 bg-slate-50">
          <div className="max-w-5xl mx-auto px-8 xl:px-12">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-4">
                Recent Posts
              </p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 leading-tight">
                Latest Articles
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {top5Posts.map((post) => (
                <a
                  key={post.slug}
                  href={`/${params.locale}/blog/${post.slug}`}
                  className="group bg-white border-l-4 border-amber-500 shadow-md hover:shadow-xl transition-shadow flex flex-col"
                >
                  <div className="relative w-full h-56">
                    <Image
                      src={post.image || fallbackImg}
                      alt={post.title}
                      fill
                      style={{
                        objectFit: 'cover'
                      }}
                      className="border-4 border-slate-800"
                      quality={85}
                      unoptimized={isMediaRemoteUrl(post.image || fallbackImg)}
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-3">
                      {post.category || 'Article'}
                    </p>
                    <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug group-hover:text-amber-600 transition-colors">
                      {post.title}
                    </h3>
                    {post.readingTime != null && (
                      <p className="mt-auto text-xs text-slate-600">
                        {post.readingTime} min read
                      </p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* More Posts Sections */}
      {chunked.map((chunk, index) => (
        <div key={index} className={`py-20 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
          <div className="max-w-5xl mx-auto px-8 xl:px-12">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 leading-tight">
                {headings[index] || 'More Articles'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {chunk.map((post) => (
                <a
                  key={post.slug}
                  href={`/${params.locale}/blog/${post.slug}`}
                  className="group bg-white border-l-4 border-amber-500 shadow-md hover:shadow-xl transition-shadow flex flex-col"
                >
                  <div className="relative w-full h-56">
                    <Image
                      src={post.image || fallbackImg}
                      alt={post.title}
                      fill
                      style={{
                        objectFit: 'cover'
                      }}
                      className="border-4 border-slate-800"
                      quality={85}
                      unoptimized={isMediaRemoteUrl(post.image || fallbackImg)}
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-3">
                      {post.category || 'Article'}
                    </p>
                    <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug group-hover:text-amber-600 transition-colors">
                      {post.title}
                    </h3>
                    {post.quote && (
                      <p className="text-sm text-slate-700 leading-relaxed italic mb-4">
                        "{post.quote}"
                      </p>
                    )}
                    {post.readingTime != null && (
                      <p className="mt-auto text-xs text-slate-600">
                        {post.readingTime} min read
                      </p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
