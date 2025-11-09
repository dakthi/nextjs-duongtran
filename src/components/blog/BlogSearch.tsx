'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { isMediaRemoteUrl } from '@/lib/media/media-client'

interface Post {
  slug: string
  title: string
  excerpt?: string | null
  image?: string | null
  category?: string | null
  date?: string | null
  readingTime?: number | null
  quote?: string | null
}

interface BlogSearchProps {
  posts: Post[]
  locale: string
  fallbackImg: string
  minReadText: string
  searchPlaceholder: string
  noResultsText: string
}

export function BlogSearch({
  posts,
  locale,
  fallbackImg,
  minReadText,
  searchPlaceholder,
  noResultsText
}: BlogSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return []

    const query = searchQuery.toLowerCase()
    return posts.filter(post =>
      post.title.toLowerCase().includes(query) ||
      (post.excerpt?.toLowerCase() || '').includes(query) ||
      (post.category?.toLowerCase() || '').includes(query)
    )
  }, [posts, searchQuery])

  return (
    <div className="py-12 bg-white">
      <div className="container max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
        {/* Search input */}
        <div className="mb-8">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border-2 border-slate-300 px-4 py-3 text-base focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Search results */}
        {searchQuery.trim() && (
          <div>
            {filteredPosts.length === 0 ? (
              <p className="text-center text-slate-600 py-8">{noResultsText}</p>
            ) : (
              <>
                <p className="text-sm text-slate-600 mb-6">
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'result' : 'results'} found
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post) => (
                    <a
                      key={post.slug}
                      href={`/${locale}/blog/${post.slug}`}
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
                        {post.category && (
                          <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-3">
                            {post.category}
                          </p>
                        )}
                        <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug group-hover:text-amber-600 transition-colors">
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="text-sm text-slate-700 leading-relaxed mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                        )}
                        <div className="mt-auto flex flex-wrap items-center gap-2 text-xs text-slate-600">
                          {post.date && (
                            <span className="whitespace-nowrap">
                              {new Date(post.date).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </span>
                          )}
                          {post.date && post.readingTime != null && (
                            <span className="text-slate-300">|</span>
                          )}
                          {post.readingTime != null && (
                            <span className="whitespace-nowrap">{post.readingTime} {minReadText}</span>
                          )}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
