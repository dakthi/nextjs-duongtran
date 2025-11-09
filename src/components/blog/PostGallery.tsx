import React from 'react'

import type { PostSummary } from '@/lib/services/post'

interface PostGalleryProps {
  featuredPost: PostSummary
  topPosts: PostSummary[]
  chunkedPosts: PostSummary[][]
  headings?: string[]
  locale: string
}

export function PostGallery({
  topPosts,
  locale,
}: PostGalleryProps) {
  const visiblePosts = topPosts.slice(0, 8)

  return (
    <section className="space-y-12 border-2 border-outer-space p-8 md:p-12 bg-mint-green">
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-feldgrau mb-4">
          Featured Content
        </p>
        <h2 className="text-3xl md:text-4xl font-sans font-bold text-outer-space leading-tight">
          Blog
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visiblePosts.map((post) => (
          <a
            key={post.slug}
            href={`/${locale}/blog/${post.slug}`}
            className="group bg-white border-2 border-outer-space shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[6px_6px_0px_0px_rgba(245,158,11,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex flex-col"
          >
            <div className="p-6 flex flex-col h-full border-l-4 border-jungle-green">
              <p className="text-xs font-semibold uppercase tracking-widest text-feldgrau mb-4">
                {post.category || 'Post'}
              </p>
              <h3 className="text-xl font-bold text-outer-space mb-4 leading-snug group-hover:text-jungle-green transition-colors flex-grow">
                {post.title}
              </h3>
              {post.readingTime != null && (
                <p className="mt-auto pt-4 border-t border-mint-green text-xs text-feldgrau">
                  {post.readingTime} min read
                </p>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
