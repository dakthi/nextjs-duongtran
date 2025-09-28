import React from 'react'

import type { PostSummary } from '@/lib/post'

interface PostGalleryProps {
  featuredPost: PostSummary
  topPosts: PostSummary[]
  chunkedPosts: PostSummary[][]
  headings?: string[]
}

export function PostGallery({
  topPosts,
}: PostGalleryProps) {
  const visiblePosts = topPosts.slice(0, 8)

  return (
    <section className="w px-4 py-10">
      <h2 className="xl:w-1/2 text-3xl font-bold text-gray-800 mb-6">Press & Interviews</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {visiblePosts.map((post) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-xl border bg-white p-5 hover:shadow-sm transition"
          >
            <p className="text-xs uppercase text-gray-500 font-medium mb-1">
              {post.category || 'Post'}
            </p>
            <h3 className="text-base font-semibold text-gray-800 group-hover:text-gray-600">
              {post.title}
            </h3>
            {post.quote && (
              <p className="mt-2 text-gray-600 text-sm font-medium">“{post.quote}”</p>
            )}
            {post.readingTime != null && (
              <p className="mt-2 text-xs text-gray-500">{post.readingTime} min read</p>
            )}
          </a>
        ))}
      </div>
    </section>
  )
}
