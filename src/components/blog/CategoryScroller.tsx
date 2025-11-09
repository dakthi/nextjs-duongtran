'use client'

import { useRef, useState, useEffect } from 'react'
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

interface CategoryScrollerProps {
  posts: Post[]
  category: string
  locale: string
  fallbackImg: string
  minReadText: string
}

export function CategoryScroller({ posts, category, locale, fallbackImg, minReadText }: CategoryScrollerProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScroll = () => {
    const container = scrollContainerRef.current
    if (!container) return

    setCanScrollLeft(container.scrollLeft > 0)
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    )
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = container.clientWidth * 0.8
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })
  }

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-slate-800 text-white p-3 shadow-lg hover:bg-slate-700 transition-colors"
          aria-label="Scroll left"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-slate-800 text-white p-3 shadow-lg hover:bg-slate-700 transition-colors"
          aria-label="Scroll right"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {posts.map((post) => (
          <a
            key={post.slug}
            href={`/${locale}/blog/${post.slug}`}
            className="group bg-white border-l-4 border-amber-500 shadow-md hover:shadow-xl transition-shadow flex flex-col flex-shrink-0"
            style={{ width: '320px' }}
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
                {post.category || category}
              </p>
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
                  <span className="whitespace-nowrap">{new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
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

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
