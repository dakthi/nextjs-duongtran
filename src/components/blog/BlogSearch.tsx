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
  initialCategory?: string
}

export function BlogSearch({
  posts,
  locale,
  fallbackImg,
  minReadText,
  searchPlaceholder,
  noResultsText,
  initialCategory
}: BlogSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(!!initialCategory)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [decodeURIComponent(initialCategory)] : []
  )

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>()
    posts.forEach(post => {
      if (post.category) cats.add(post.category)
    })
    return Array.from(cats).sort()
  }, [posts])

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim() && selectedCategories.length === 0) return []

    const query = searchQuery.toLowerCase()
    return posts.filter(post => {
      const matchesSearch = !searchQuery.trim() ||
        post.title.toLowerCase().includes(query) ||
        (post.excerpt?.toLowerCase() || '').includes(query) ||
        (post.category?.toLowerCase() || '').includes(query)

      const matchesCategory = selectedCategories.length === 0 ||
        (post.category && selectedCategories.includes(post.category))

      return matchesSearch && matchesCategory
    })
  }, [posts, searchQuery, selectedCategories])

  return (
    <div className="py-4 bg-white">
      <div className="container max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
        {/* Search input */}
        <div className="mb-4 relative flex items-center gap-3">
          <div className="relative flex-1">
            <div className="absolute left-1 top-1/2 -translate-y-1/2 bg-jungle-green rounded-full p-2 pointer-events-none">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 rounded-full pl-12 pr-4 py-2 text-base focus:border-jungle-green focus:outline-none focus:ring-2 focus:ring-jungle-green"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-jungle-green text-white rounded-full px-6 py-2 flex items-center gap-2 hover:bg-jungle-green-dark transition-colors whitespace-nowrap"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              <span>Filter</span>
              {selectedCategories.length > 0 && (
                <span className="bg-white text-jungle-green rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {selectedCategories.length}
                </span>
              )}
            </button>

            {/* Dropdown */}
            {showFilters && (
              <div className="absolute right-0 top-full mt-2 bg-white border-2 border-outer-space shadow-brutalist rounded-lg p-4 w-64 z-10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-outer-space">Filters</h3>
                  {selectedCategories.length > 0 && (
                    <button
                      onClick={() => setSelectedCategories([])}
                      className="text-xs text-jungle-green hover:text-jungle-green-dark font-semibold"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-widest text-feldgrau mb-2">Category</p>
                  {categories.map((category) => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer hover:bg-mint-green p-2 rounded">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="w-4 h-4 text-jungle-green focus:ring-jungle-green rounded"
                      />
                      <span className="text-sm text-outer-space">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search results */}
        {(searchQuery.trim() || selectedCategories.length > 0) && (
          <div>
            {filteredPosts.length === 0 ? (
              <p className="text-center text-feldgrau py-8">{noResultsText}</p>
            ) : (
              <>
                <p className="text-sm text-feldgrau mb-6">
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'result' : 'results'} found
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post) => (
                    <a
                      key={post.slug}
                      href={`/${locale}/blog/${post.slug}`}
                      className="group bg-white border-l-4 border-gray-300 hover:border-jungle-green shadow-md hover:shadow-xl transition-all flex flex-col"
                    >
                      <div className="relative w-full h-56 overflow-hidden rounded-r-md">
                        <Image
                          src={post.image || fallbackImg}
                          alt={post.title}
                          fill
                          style={{
                            objectFit: 'cover'
                          }}
                          quality={85}
                          unoptimized={isMediaRemoteUrl(post.image || fallbackImg)}
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        {post.category && (
                          <p className="text-xs font-semibold uppercase tracking-widest text-jungle-green mb-3">
                            {post.category}
                          </p>
                        )}
                        <h3 className="text-lg font-bold text-outer-space mb-3 leading-snug group-hover:text-jungle-green transition-colors">
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="text-sm text-feldgrau leading-relaxed mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                        )}
                        <div className="mt-auto flex flex-wrap items-center gap-2 text-xs text-feldgrau">
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
