// Hero Preview Component - Live preview for the hero editor

'use client'

import { useMemo } from 'react'
import { HeroDisplay } from './HeroDisplay'
import { HeroFormData, HeroPreviewData } from '../../types/hero.types'

interface HeroPreviewProps {
  data: HeroFormData
  className?: string
  height?: string
}

export function HeroPreview({ data, className = "", height = "400px" }: HeroPreviewProps) {
  // Convert form data to preview format
  const previewData: HeroPreviewData = useMemo(() => ({
    title: (data.hero_title as string) || "Your Organization Name",
    subtitle: (data.hero_subtitle as string) || "Serving the community with excellence",
    description: data.hero_description as string,
    backgroundImage: (data.hero_background_image as string) || "/img/hero-bg.jpg",
    primaryButton: data.hero_cta_button_text ? {
      text: data.hero_cta_button_text as string,
      link: (data.hero_cta_button_link as string) || "#"
    } : undefined,
    secondaryButton: data.hero_secondary_button_text ? {
      text: data.hero_secondary_button_text as string,
      link: (data.hero_secondary_button_link as string) || "#"
    } : undefined,
    stats: {
      residentsServed: (data.residents_served as string) || "2,000+",
      weeklyPrograms: (data.weekly_programs as string) || "15+",
      openingHours: (data.opening_hours_text as string) || "7 days",
      mainHallCapacity: (data.main_hall_capacity as string) || "120"
    }
  }), [data])

  return (
    <div className={`relative ${className}`} style={{ height }}>
      {/* Preview Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-black/50 text-white text-xs px-3 py-2">
        <div className="flex items-center justify-between">
          <span>Live Preview</span>
          <span className="opacity-75">Updates as you type</span>
        </div>
      </div>

      {/* Hero Display */}
      <div className="w-full h-full">
        <HeroDisplay
          {...previewData}
          className="rounded-none"
        />
      </div>

      {/* Preview Overlay for Scale Indication */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="bg-black/50 text-white text-xs px-3 py-2">
          <div className="flex items-center justify-between">
            <span>Desktop Preview</span>
            <div className="flex gap-2">
              <button
                className="px-2 py-1 bg-white/20 rounded hover:bg-white/30 transition-colors"
                title="Desktop view"
              >
                🖥️
              </button>
              <button
                className="px-2 py-1 bg-white/20 rounded hover:bg-white/30 transition-colors"
                title="Mobile view"
              >
                📱
              </button>
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
    title: (data.hero_title as string) || "Your Organization Name",
    subtitle: (data.hero_subtitle as string) || "Serving the community with excellence",
    description: data.hero_description as string,
    backgroundImage: (data.hero_background_image as string) || "/img/hero-bg.jpg",
    primaryButton: data.hero_cta_button_text ? {
      text: data.hero_cta_button_text as string,
      link: (data.hero_cta_button_link as string) || "#"
    } : undefined,
    secondaryButton: data.hero_secondary_button_text ? {
      text: data.hero_secondary_button_text as string,
      link: (data.hero_secondary_button_link as string) || "#"
    } : undefined,
    stats: {
      residentsServed: (data.residents_served as string) || "2,000+",
      weeklyPrograms: (data.weekly_programs as string) || "15+",
      openingHours: (data.opening_hours_text as string) || "7 days",
      mainHallCapacity: (data.main_hall_capacity as string) || "120"
    }
  }), [data])

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Desktop Preview */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
          🖥️ Desktop Preview
        </h3>
        <div className="bg-white rounded border shadow-sm overflow-hidden">
          <div className="w-full aspect-[16/9]">
            <HeroDisplay {...previewData} className="rounded-none" />
          </div>
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
              <div className="w-full aspect-[9/16]">
                <HeroDisplay {...previewData} className="rounded-none" />
              </div>
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
    <div className={`relative w-full h-32 rounded overflow-hidden shadow-sm ${className}`}>
      <HeroDisplay
        title={(data.hero_title as string) || "Your Organization Name"}
        subtitle={(data.hero_subtitle as string) || "Serving the community"}
        backgroundImage={(data.hero_background_image as string) || "/img/hero-bg.jpg"}
        className="rounded-none"
      />
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
        <span className="text-white text-xs bg-black/50 px-2 py-1 rounded">
          Mini Preview
        </span>
      </div>
    </div>
  )
}