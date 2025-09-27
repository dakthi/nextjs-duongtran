'use client'

import { useMemo } from 'react'
import { HeroFormData, HeroPreviewData } from '@/types/hero.types'
import Image from 'next/image'

interface HeroPreviewProps {
  data: HeroFormData
  className?: string
}

const renderWithLineBreaks = (text: string) => {
  const lines = text.split('\n')

  return lines.map((line, index) => (
    <span key={index}>
      {line}
      {index < lines.length - 1 && <br />}
    </span>
  ))
}

export function HeroPreview({ data, className = "" }: HeroPreviewProps) {
  // Convert form data to preview format
  const previewData: HeroPreviewData = useMemo(() => ({
    title: (data.title as string) || "Your Title Here",
    subtitle: (data.subtitle as string | null) ?? undefined,
    description: (data.description as string | null) ?? undefined,
    image: (data.image as string | null) ?? undefined,
    ctaText: (data.ctaText as string | null) ?? undefined,
    ctaLink: (data.ctaLink as string | null) ?? "#"
  }), [data])

  return (
    <div className={`relative bg-white ${className}`}>
      {/* Preview Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-black/50 text-white text-xs px-3 py-2">
        <div className="flex items-center justify-between">
          <span>Live Preview</span>
          <span className="opacity-75">Updates as you type</span>
        </div>
      </div>

      {/* Hero Display - Mimicking the existing Hero component structure */}
      <div className="pt-8">
        <div className="flex flex-wrap items-center min-h-[400px] px-5">
          <div className="order-last xl:order-first flex items-start w-full lg:w-1/2 pl-5 pr-5 xl:pl-0 xl:pr-0">
            <div className="max-w-xl">
              <h1 className="text-lg font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight">
                {renderWithLineBreaks(previewData.title)}
              </h1>

              {previewData.subtitle && (
                <p className="text-md leading-normal text-gray-500 lg:text-xl xl:text-xl xl:mt-5 xl:mb-5 xl:pr-0">
                  {renderWithLineBreaks(previewData.subtitle)}
                </p>
              )}

              {previewData.description && (
                <p className="mb-2 text-md leading-normal text-gray-500 lg:text-xl xl:text-xl xl:mt-5 xl:mb-5 pr-5 xl:pr-0">
                  {renderWithLineBreaks(previewData.description)}
                </p>
              )}

              {previewData.ctaText && (
                <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
                  <a
                    href={previewData.ctaLink}
                    className="mt-2 px-8 py-4 text-sm font-medium text-center text-white bg-gray-600 rounded-md"
                  >
                    {previewData.ctaText}
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center w-full p-5 xl:p-0 lg:w-1/2">
            <div className="relative w-full h-[400px] overflow-hidden rounded-lg border border-white">
              {previewData.image ? (
                <Image
                  src={previewData.image}
                  alt={previewData.title}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  className="rounded-lg"
                  unoptimized={true} // For preview, don't optimize
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <div className="text-gray-500 text-center">
                    <div className="text-4xl mb-2">📸</div>
                    <p className="text-sm">No image selected</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Preview Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="bg-black/50 text-white text-xs px-3 py-2">
          <div className="flex items-center justify-between">
            <span>Desktop Preview</span>
            <div className="flex gap-2 opacity-50">
              <span>🖥️</span>
              <span>📱</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Advanced preview with device frames
export function HeroPreviewWithFrames({ data, className = "" }: HeroPreviewProps) {
  const previewData: HeroPreviewData = useMemo(() => ({
    title: (data.title as string) || "Your Title Here",
    subtitle: (data.subtitle as string | null) ?? undefined,
    description: (data.description as string | null) ?? undefined,
    image: (data.image as string | null) ?? undefined,
    ctaText: (data.ctaText as string | null) ?? undefined,
    ctaLink: (data.ctaLink as string | null) ?? "#"
  }), [data])

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Desktop Preview */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
          🖥️ Desktop Preview
        </h3>
        <div className="bg-white rounded border shadow-sm overflow-hidden">
          <HeroPreview data={data} className="rounded-none" />
        </div>
      </div>

      {/* Mobile Preview */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
          📱 Mobile Preview
        </h3>
        <div className="flex justify-center">
          <div className="bg-gray-800 rounded-lg p-2" style={{ width: '320px' }}>
            <div className="bg-white rounded overflow-hidden">
              <HeroPreview data={data} className="rounded-none h-96" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Minimal preview for quick reference
export function HeroPreviewMini({ data, className = "" }: HeroPreviewProps) {
  return (
    <div className={`relative w-full h-32 rounded overflow-hidden shadow-sm bg-gray-100 ${className}`}>
      <div className="p-4 h-full flex items-center">
        <div className="flex-1">
          <h3 className="font-bold text-sm text-gray-800 line-clamp-1">
            {(data.title as string) || "Your Title Here"}
          </h3>
          {data.subtitle && (
            <p className="text-xs text-gray-600 line-clamp-2 mt-1">
              {data.subtitle as string}
            </p>
          )}
        </div>
        {data.image && (
          <div className="relative w-16 h-16 ml-4 rounded overflow-hidden bg-gray-200">
            <Image
              src={data.image as string}
              alt="Preview"
              fill
              style={{ objectFit: 'cover' }}
              unoptimized={true}
            />
          </div>
        )}
      </div>

      <div className="absolute top-2 right-2">
        <span className="text-white text-xs bg-black/50 px-2 py-1 rounded">
          Mini Preview
        </span>
      </div>
    </div>
  )
}
