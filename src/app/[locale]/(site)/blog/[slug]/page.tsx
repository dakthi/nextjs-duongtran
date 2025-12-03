import { getPostBySlug, getPostSlugs } from '@/lib/post'
import { notFound } from 'next/navigation'
import { Container } from '@/components/Container'
import Image from 'next/image'
import { isMediaRemoteUrl } from '@/lib/media/media-client'
import { generateMetadata as genMeta, generateBlogPostingSchema, generateBreadcrumbSchema, siteConfig } from '@/lib/seo'
import { BlogContent } from '@/components/blog/BlogContent'
import type { Metadata } from 'next'

// Force dynamic rendering to always fetch fresh data
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

export default async function BlogPostPage({ params }: Params) {
  let post
  try {
    post = await getPostBySlug(params.slug, params.locale)
  } catch (error) {
    return notFound()
  }

  if (!post) return notFound()

  // Generate structured data
  const blogPostingSchema = generateBlogPostingSchema({
    title: post.title,
    description: post.excerpt || post.title,
    url: `${siteConfig.url}/${params.locale}/blog/${params.slug}`,
    image: post.image || undefined,
    datePublished: post.date || new Date().toISOString(),
    dateModified: post.date || new Date().toISOString(),
    author: post.expert?.name || 'Lieu Vo',
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
      {/* Header Section */}
      <div className="py-8 bg-white border-b-2 border-jungle-green">
        <Container>
          {/* Breadcrumbs */}
          <div className="space-y-3 mb-2 md:space-y-0 md:mb-6 xl:flex xl:items-center xl:gap-4">
            {/* Back button */}
            <div>
              <a
                href={`/${params.locale}/blog`}
                className="inline-flex items-center gap-2 px-4 py-2 md:px-6 bg-jungle-green text-white hover:bg-jungle-green-dark transition-colors"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>All blog posts</span>
              </a>
            </div>

            {/* Meta information */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-feldgrau">
              {post.category && (
                <>
                  <span className="text-slate-300">|</span>
                  <span className="whitespace-nowrap">{post.category}</span>
                </>
              )}
              {post.date && (
                <>
                  <span className="text-slate-300">|</span>
                  <span className="whitespace-nowrap">{new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </>
              )}
              {post.readingTime != null && (
                <>
                  <span className="text-slate-300">|</span>
                  <span className="whitespace-nowrap">{post.readingTime} min read</span>
                </>
              )}
            </div>
          </div>

          {/* Title */}
          <h1 className="w-full text-2xl md:text-3xl xl:text-4xl font-semibold text-outer-space leading-snug">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="mt-4 text-lg md:text-xl text-feldgrau leading-relaxed max-w-full md:max-w-[75%]">
              {post.excerpt}
            </p>
          )}

          {/* Author Info in Header */}
          {post.expert && (
            <div className="mt-6 flex items-center gap-4">
              {post.expert.image && (
                <div className="w-12 h-12 rounded-full border-2 border-jungle-green overflow-hidden flex-shrink-0">
                  <Image
                    src={post.expert.image}
                    alt={post.expert.name ?? 'Author'}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                    unoptimized={isMediaRemoteUrl(post.expert.image)}
                  />
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-outer-space">{post.expert.name ?? 'Lieu Vo'}</p>
                {post.expert.title && (
                  <p className="text-xs text-feldgrau">{post.expert.title}</p>
                )}
              </div>
            </div>
          )}
        </Container>
      </div>

      {/* Content Section */}
      <div className="py-8 md:pt-12 md:pb-20 bg-white">
        <Container>
          <div className="max-w-full md:max-w-[75%]">
            {/* Quote */}
            {post.quote && (
              <blockquote className="border-l-4 border-outer-space pl-6 italic text-lg text-feldgrau mb-12">
                <span className="text-4xl text-jungle-green mr-2">"</span>
                {post.quote}
              </blockquote>
            )}

            {/* Markdown Content */}
            <BlogContent
              content={post.content}
              className="prose prose-lg max-w-none text-lg leading-snug md:leading-normal text-outer-space"
            />
          </div>
        </Container>
      </div>

      {/* CTA Section */}
      <div className="py-12 bg-white">
        <Container>
          <div className="bg-white border-l-4 border-gray-300 hover:border-jungle-green shadow-md hover:shadow-xl transition-all rounded-tr-md max-w-3xl py-8 px-6">
            <div className="text-xs font-semibold tracking-widest uppercase mb-3 letter-spacing-wider text-jungle-green">
              let's connect
            </div>
            <h2 className="max-w-3xl text-3xl md:text-4xl font-sans font-bold leading-tight mb-6 text-outer-space">
              How can I help you?
            </h2>
            <p className="max-w-3xl text-lg leading-relaxed text-feldgrau font-medium">
              Every blog post, every insight, and every resource shared here reflects a simple belief: thoughtful numbers make powerful changes.
              <br /><br />
              If you would like to work with someone who cares about the financial side of your business - and the people behind it - I would love to hear your story.
              <br /><br />
              Let&apos;s discuss how I can support you.
            </p>
          </div>
        </Container>
      </div>
    </>
  );
}
