/**
 * Hero Admin Page - Uses existing project patterns
 *
 * This component should be placed at: src/app/admin/hero/page.tsx
 * It follows the existing admin structure with AdminLayout and AdminAuth
 */

"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import AdminLayout from "@/components/AdminLayout" // Uses existing AdminLayout
import AdminAuth from "@/components/AdminAuth"     // Uses existing AdminAuth
import FileUpload from "@/components/FileUpload"   // Uses existing FileUpload

// Hero settings interface - matches existing SiteSetting structure
interface HeroSettings {
  // Main content
  hero_title: string
  hero_subtitle: string
  hero_background_image: string

  // CTA buttons
  hero_cta_button_text: string
  hero_cta_button_link: string
  hero_secondary_button_text: string
  hero_secondary_button_link: string

  // Statistics (matches existing Hero component)
  residents_served: string
  weekly_programs: string
  opening_hours_text: string
  main_hall_capacity: string
}

// Default values match existing Hero component fallbacks
const defaultHeroSettings: HeroSettings = {
  hero_title: 'West Acton Community Centre',
  hero_subtitle: 'Your local hub bringing together 2,000+ residents through education, leisure, and recreational programs',
  hero_background_image: '/img/entrance.jpeg',
  hero_cta_button_text: 'Explore Programs',
  hero_cta_button_link: '/programs',
  hero_secondary_button_text: 'Book Facilities',
  hero_secondary_button_link: '/facilities',
  residents_served: '2,000+',
  weekly_programs: '15+',
  opening_hours_text: '7 Days',
  main_hall_capacity: '120'
}

export default function HeroAdminPage() {
  const { data: session } = useSession()
  const [settings, setSettings] = useState<HeroSettings>(defaultHeroSettings)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetchHeroSettings()
  }, [])

  const fetchHeroSettings = async () => {
    try {
      const response = await fetch('/api/settings')
      if (!response.ok) throw new Error('Failed to fetch settings')

      const data = await response.json()

      // Convert array of settings to object
      const settingsMap = data.reduce((acc: any, setting: any) => {
        acc[setting.key] = setting.value
        return acc
      }, {})

      // Merge with defaults
      setSettings({
        hero_title: settingsMap.hero_title || defaultHeroSettings.hero_title,
        hero_subtitle: settingsMap.hero_subtitle || defaultHeroSettings.hero_subtitle,
        hero_background_image: settingsMap.hero_background_image || defaultHeroSettings.hero_background_image,
        hero_cta_button_text: settingsMap.hero_cta_button_text || defaultHeroSettings.hero_cta_button_text,
        hero_cta_button_link: settingsMap.hero_cta_button_link || defaultHeroSettings.hero_cta_button_link,
        hero_secondary_button_text: settingsMap.hero_secondary_button_text || defaultHeroSettings.hero_secondary_button_text,
        hero_secondary_button_link: settingsMap.hero_secondary_button_link || defaultHeroSettings.hero_secondary_button_link,
        residents_served: settingsMap.residents_served || defaultHeroSettings.residents_served,
        weekly_programs: settingsMap.weekly_programs || defaultHeroSettings.weekly_programs,
        opening_hours_text: settingsMap.opening_hours_text || defaultHeroSettings.opening_hours_text,
        main_hall_capacity: settingsMap.main_hall_capacity || defaultHeroSettings.main_hall_capacity
      })
    } catch (error) {
      console.error('Error fetching hero settings:', error)
      setMessage("Error loading settings. Using defaults.")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof HeroSettings, value: string) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage("")

    try {
      // Convert settings to array format expected by API
      const settingsToUpdate = Object.entries(settings).map(([key, value]) => ({
        key,
        value,
        type: key.includes('image') ? 'image' : 'text',
        category: 'hero',
        description: `Hero CMS - ${key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`
      }))

      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ settings: settingsToUpdate })
      })

      if (!response.ok) throw new Error('Failed to save settings')

      setMessage("Hero settings saved successfully!")
      setTimeout(() => setMessage(""), 3000)
    } catch (error) {
      setMessage("Error saving settings. Please try again.")
      console.error('Error saving hero settings:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminAuth>
      <AdminLayout>
        <div className="flex-1 overflow-auto">
          <div className="p-4 md:p-6">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900">Hero Section Management</h1>
                  <p className="mt-2 text-sm md:text-base text-gray-600">
                    Customize your homepage hero section content, images, and call-to-action buttons.
                  </p>
                </div>
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Live
                </a>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                <span className="ml-3">Loading hero settings...</span>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Main Content */}
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-lg font-semibold mb-4">Main Content</h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hero Title
                      </label>
                      <input
                        type="text"
                        value={settings.hero_title}
                        onChange={(e) => handleInputChange('hero_title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="West Acton Community Centre"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hero Subtitle
                      </label>
                      <textarea
                        value={settings.hero_subtitle}
                        onChange={(e) => handleInputChange('hero_subtitle', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Your local hub bringing together residents..."
                      />
                    </div>

                    <div>
                      <FileUpload
                        onFileSelect={(mediaItem) => {
                          if (mediaItem.filePath) {
                            handleInputChange('hero_background_image', mediaItem.filePath)
                          }
                        }}
                        currentImage={settings.hero_background_image}
                        label="Hero Background Image"
                        accept="image/*"
                      />
                    </div>
                  </div>
                </div>

                {/* Call-to-Action Buttons */}
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-lg font-semibold mb-4">Call-to-Action Buttons</h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">Primary Button</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Button Text
                        </label>
                        <input
                          type="text"
                          value={settings.hero_cta_button_text}
                          onChange={(e) => handleInputChange('hero_cta_button_text', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Button Link
                        </label>
                        <input
                          type="text"
                          value={settings.hero_cta_button_link}
                          onChange={(e) => handleInputChange('hero_cta_button_link', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">Secondary Button</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Button Text
                        </label>
                        <input
                          type="text"
                          value={settings.hero_secondary_button_text}
                          onChange={(e) => handleInputChange('hero_secondary_button_text', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Button Link
                        </label>
                        <input
                          type="text"
                          value={settings.hero_secondary_button_link}
                          onChange={(e) => handleInputChange('hero_secondary_button_link', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-lg font-semibold mb-4">Hero Statistics</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Statistics displayed in the hero section grid.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Residents Served
                      </label>
                      <input
                        type="text"
                        value={settings.residents_served}
                        onChange={(e) => handleInputChange('residents_served', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="2,000+"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Weekly Programs
                      </label>
                      <input
                        type="text"
                        value={settings.weekly_programs}
                        onChange={(e) => handleInputChange('weekly_programs', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="15+"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Opening Hours
                      </label>
                      <input
                        type="text"
                        value={settings.opening_hours_text}
                        onChange={(e) => handleInputChange('opening_hours_text', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="7 Days"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Main Hall Capacity
                      </label>
                      <input
                        type="text"
                        value={settings.main_hall_capacity}
                        onChange={(e) => handleInputChange('main_hall_capacity', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="120"
                      />
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="space-y-3">
                  {message && (
                    <div className={`p-4 rounded-md ${
                      message.includes('Error')
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-green-50 text-green-700 border border-green-200'
                    }`}>
                      {message}
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed uppercase"
                    >
                      {saving ? 'Saving...' : 'Save Hero Settings'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </AdminLayout>
    </AdminAuth>
  )
}