'use client'

import { useState } from 'react'
import Image from 'next/image'
import { isMediaRemoteUrl } from '@/lib/media/media-client'

interface PostImageProps {
  src: string | null | undefined
  fallbackSrc: string
  alt: string
  imageFit?: 'cover' | 'contain' | 'fill' | null
  imagePosition?: string | null
  imageZoom?: number | null
  quality?: number
  priority?: boolean
  className?: string
}

export function PostImage({
  src,
  fallbackSrc,
  alt,
  imageFit,
  imagePosition,
  imageZoom,
  quality = 85,
  priority = false,
  className = ''
}: PostImageProps) {
  const [hasError, setHasError] = useState(false)
  const imageSrc = hasError || !src ? fallbackSrc : src

  return (
    <div className={`relative ${className}`}>
      <Image
        src={imageSrc}
        alt={alt}
        fill
        style={{
          objectFit: (imageFit as 'cover' | 'contain' | 'fill') || 'cover',
          objectPosition: imagePosition || 'center',
          transform: `scale(${(imageZoom || 100) / 100})`
        }}
        quality={quality}
        priority={priority}
        unoptimized={isMediaRemoteUrl(imageSrc)}
        onError={() => setHasError(true)}
      />
    </div>
  )
}
