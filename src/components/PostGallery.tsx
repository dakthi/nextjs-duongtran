'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { Container } from '@/components/Container'
import { isMediaRemoteUrl, legacyMediaUrl } from '@/lib/media/media-client'

import type { PostSummary } from '@/lib/post'

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
  const fallbackImg = legacyMediaUrl('/img/post-thumbnail-fallback.png')
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
    <section className="border-l-4 border-gray-300 bg-mint-green shadow-md">
      <Container>
        <div className="py-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-jungle-green mb-2">
                Featured Content
              </p>
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-outer-space leading-tight">
                Blog
              </h2>
            </div>
            <a
              href={`/${locale}/blog`}
              className="text-sm font-semibold text-jungle-green hover:text-jungle-green-dark transition-colors whitespace-nowrap"
            >
              View All →
            </a>
          </div>

          <div className="relative">
            {/* Navigation Buttons */}
            {canScrollLeft && (
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-feldgrau text-white p-3 shadow-lg hover:bg-slate-700 transition-colors"
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
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-feldgrau text-white p-3 shadow-lg hover:bg-slate-700 transition-colors"
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
              className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
        {visiblePosts.map((post) => (
          <a
            key={post.slug}
            href={`/${locale}/blog/${post.slug}`}
            className="group bg-white border-l-4 border-gray-300 hover:border-jungle-green shadow-md hover:shadow-xl transition-all flex flex-col flex-shrink-0"
            style={{ width: '320px' }}
          >
            <div className="relative w-full h-56 overflow-hidden rounded-r-md flex-shrink-0">
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
            <div className="p-6 flex flex-col flex-grow min-h-0">
              <p className="text-xs font-semibold uppercase tracking-widest text-jungle-green mb-3">
                {post.category || 'Post'}
              </p>
              <h3 className="text-lg font-bold text-outer-space mb-3 leading-snug group-hover:text-jungle-green transition-colors">
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

            <style jsx>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>
        </div>
      </Container>
    </section>
  )
}
