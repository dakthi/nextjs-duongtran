import { getPostBySlug, getPostSlugs } from '@/lib/post'
import { notFound } from 'next/navigation'
import { Container } from '@/components/Container'
import { SectionTitle } from '@/components/SectionTitle'
import Image from 'next/image'
import { isMediaRemoteUrl } from '@/lib/media/media-client'

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

export default async function BlogPostPage({ params }: Params) {
  let post
  try {
    post = await getPostBySlug(params.slug, params.locale)
  } catch (error) {
    return notFound()
  }

  if (!post) return notFound()

  return (
    <>
      {/* Header Section */}
      <div className="py-8 bg-slate-50 border-b-4 border-slate-800">
        <Container>
          {/* Breadcrumbs */}
          <div className="flex items-center justify-start gap-4 mb-6 text-sm text-slate-600">
            <a
              href={`/${params.locale}/blog`}
              className="inline-flex items-center gap-2 px-6 py-2 bg-slate-800 text-white hover:bg-slate-700 transition-colors"
            >
              <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>All blog posts</span>
            </a>
            {post.category && (
              <>
                <span className="text-slate-300">|</span>
                <span className="whitespace-nowrap">{post.category}</span>
              </>
            )}
            {post.date && (
              <>
                <span className="text-slate-300">|</span>
                <span className="whitespace-nowrap">{new Date(post.date).getFullYear()}</span>
              </>
            )}
            {post.readingTime != null && (
              <>
                <span className="text-slate-300">|</span>
                <span className="whitespace-nowrap">{post.readingTime} min read</span>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="w-full text-2xl md:text-3xl xl:text-4xl font-semibold text-slate-900 leading-snug">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="mt-4 text-lg md:text-xl text-slate-700 leading-relaxed max-w-[75%]">
              {post.excerpt}
            </p>
          )}

          {/* Author Info in Header */}
          {post.expert && (
            <div className="mt-6 flex items-center gap-4">
              {post.expert.image && (
                <div className="w-12 h-12 rounded-full border-2 border-amber-500 overflow-hidden flex-shrink-0">
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
                <p className="text-sm font-semibold text-slate-900">{post.expert.name ?? 'Lieu Vo'}</p>
                {post.expert.title && (
                  <p className="text-xs text-slate-600">{post.expert.title}</p>
                )}
              </div>
            </div>
          )}
        </Container>
      </div>

      {/* Content Section */}
      <div className="pt-12 pb-20 bg-white">
        <Container>
          <div className="max-w-[75%]">
            {/* Quote */}
            {post.quote && (
              <blockquote className="border-l-4 border-slate-800 pl-6 italic text-lg text-slate-700 mb-12">
                <span className="text-4xl text-amber-500 mr-2">"</span>
                {post.quote}
              </blockquote>
            )}

            {/* Markdown Content */}
            <article
              className="prose prose-lg max-w-none text-lg leading-normal text-slate-900"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </Container>
      </div>

      {/* CTA Section */}
      <div className="py-12 bg-slate-50">
        <Container>
          <div className="bg-amber-50 border-l-4 border-amber-500 shadow-md max-w-3xl py-8 pl-6">
            <SectionTitle
              preTitle="let's connect"
              title="How can I help you?"
              align="left"
            >
              Every blog post, every insight, and every resource shared here reflects a simple belief: thoughtful numbers make powerful changes.
              <br /><br />
              If you would like to work with someone who cares about the financial side of your business — and the people behind it — I would love to hear your story.
              <br /><br />
              Let&apos;s discuss how I can support you.
            </SectionTitle>
          </div>
        </Container>
      </div>
    </>
  );
}
