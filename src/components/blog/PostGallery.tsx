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
    <section className="space-y-12 border-2 border-slate-800 p-8 md:p-12 bg-amber-50">
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-4">
          Featured Content
        </p>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 leading-tight">
          Blog
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visiblePosts.map((post) => (
          <a
            key={post.slug}
            href={`/${locale}/blog/${post.slug}`}
            className="group bg-white border-2 border-slate-800 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[6px_6px_0px_0px_rgba(245,158,11,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex flex-col"
          >
            <div className="p-6 flex flex-col h-full border-l-4 border-amber-500">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-4">
                {post.category || 'Post'}
              </p>
              <h3 className="text-xl font-bold text-slate-900 mb-4 leading-snug group-hover:text-amber-600 transition-colors flex-grow">
                {post.title}
              </h3>
              {post.readingTime != null && (
                <p className="mt-auto pt-4 border-t border-slate-200 text-xs text-slate-600">
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
