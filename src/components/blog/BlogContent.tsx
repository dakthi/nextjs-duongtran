'use client'

import { useEffect, useRef } from 'react'
import { legacyMediaUrl } from '@/lib/media/media-client'

interface BlogContentProps {
  content: string
  className?: string
}

export function BlogContent({ content, className = '' }: BlogContentProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return

    const fallbackImg = legacyMediaUrl('/img/post-thumbnail-fallback.png')

    // Find all images in the content
    const images = contentRef.current.querySelectorAll('img')

    images.forEach((img) => {
      // Add error handler to each image
      const handleError = () => {
        img.src = fallbackImg
        img.onerror = null // Prevent infinite loop
      }

      img.onerror = handleError

      // Check if image is already broken
      if (!img.complete || img.naturalHeight === 0) {
        handleError()
      }
    })
  }, [content])

  return (
    <article
      ref={contentRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
