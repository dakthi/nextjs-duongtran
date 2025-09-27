// Hero Display Component - Public-facing hero section

'use client'

import { useState, useEffect } from 'react'
import OptimizedImage from '@/components/OptimizedImage'
import { HeroPreviewData } from '../../types/hero.types'

interface HeroDisplayProps extends Partial<HeroPreviewData> {
  className?: string
}

export function HeroDisplay({
  title = "Your Organization Name",
  subtitle = "Serving the community with excellence",
  description,
  backgroundImage = "/img/hero-bg.jpg",
  primaryButton,
  secondaryButton,
  stats,
  className = ""
}: HeroDisplayProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className={`relative w-full h-screen overflow-hidden ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        {!imageError ? (
          <OptimizedImage
            src={backgroundImage}
            alt={`${title} Hero Background`}
            fill
            className="object-cover"
            priority
            onError={() => setImageError(true)}
          />
        ) : (
          // Fallback gradient background
          <div className="w-full h-full bg-gradient-to-r from-blue-600 to-purple-700" />
        )}
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight">
            <span className="block text-white drop-shadow-2xl">
              {title}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 text-gray-100 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            {subtitle}
          </p>

          {/* Description (optional) */}
          {description && (
            <p className="text-base sm:text-lg mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          )}

          {/* Stats Grid */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
              <div className="text-center bg-black/20 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-400 mb-1">
                  {stats.residentsServed}
                </div>
                <div className="text-xs sm:text-sm text-gray-200 font-medium">
                  Residents Served
                </div>
              </div>
              <div className="text-center bg-black/20 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-400 mb-1">
                  {stats.weeklyPrograms}
                </div>
                <div className="text-xs sm:text-sm text-gray-200 font-medium">
                  Weekly Programs
                </div>
              </div>
              <div className="text-center bg-black/20 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-400 mb-1">
                  {stats.openingHours}
                </div>
                <div className="text-xs sm:text-sm text-gray-200 font-medium">
                  Days a Week
                </div>
              </div>
              <div className="text-center bg-black/20 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-400 mb-1">
                  {stats.mainHallCapacity}
                </div>
                <div className="text-xs sm:text-sm text-gray-200 font-medium">
                  Main Hall Capacity
                </div>
              </div>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            {primaryButton && (
              <a
                href={primaryButton.link}
                className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-lg text-base sm:text-lg uppercase tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {primaryButton.text}
              </a>
            )}
            {secondaryButton && (
              <a
                href={secondaryButton.link}
                className="inline-block bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-lg text-base sm:text-lg uppercase tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg border border-white/30"
              >
                {secondaryButton.text}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Hook for fetching hero data
export function useHeroData() {
  const [heroData, setHeroData] = useState<HeroPreviewData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch('/api/hero')
        const result = await response.json()

        if (result.success) {
          // Convert settings to preview format
          const settings = result.data
          const previewData: HeroPreviewData = {
            title: settings.hero_title || 'Your Organization Name',
            subtitle: settings.hero_subtitle || 'Serving the community',
            description: settings.hero_description,
            backgroundImage: settings.hero_background_image,
            primaryButton: settings.hero_cta_button_text ? {
              text: settings.hero_cta_button_text,
              link: settings.hero_cta_button_link || '#'
            } : undefined,
            secondaryButton: settings.hero_secondary_button_text ? {
              text: settings.hero_secondary_button_text,
              link: settings.hero_secondary_button_link || '#'
            } : undefined,
            stats: {
              residentsServed: settings.residents_served || '2,000+',
              weeklyPrograms: settings.weekly_programs || '15+',
              openingHours: settings.opening_hours_text || '7 days',
              mainHallCapacity: settings.main_hall_capacity || '120'
            }
          }
          setHeroData(previewData)
        } else {
          setError(result.error || 'Failed to fetch hero data')
        }
      } catch (err) {
        setError('Network error')
        console.error('Error fetching hero data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchHeroData()
  }, [])

  return { heroData, loading, error }
}