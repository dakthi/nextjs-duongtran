'use client'

import { useState } from 'react'
import { HeroEditor } from '@/components/hero/HeroEditor'
import { HeroData } from '@/types/hero.types'

export const dynamic = 'force-dynamic'

export default function AdminHeroPage() {
  const [selectedLocale, setSelectedLocale] = useState<'en' | 'vi'>('en')
  const [notification, setNotification] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)

  const handleSave = (_data: HeroData) => {
    setNotification({
      type: 'success',
      message: 'Hero content saved successfully!'
    })

    // Auto-hide notification after 5 seconds
    setTimeout(() => setNotification(null), 5000)
  }

  const handleError = (error: string) => {
    setNotification({
      type: 'error',
      message: error
    })

    // Auto-hide notification after 5 seconds
    setTimeout(() => setNotification(null), 5000)
  }

  return (
    <div className="pb-12">
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-feldgrau mb-4">
              Content Management
            </p>
            <h1 className="text-3xl md:text-4xl font-sans font-bold text-outer-space leading-tight mb-6">
              Hero Section
            </h1>
            <p className="text-lg font-medium text-outer-space leading-relaxed max-w-3xl">
              Customize your homepage hero section content with live preview
            </p>
          </div>

          {/* Language Selector */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-outer-space">Language:</label>
            <select
              value={selectedLocale}
              onChange={(e) => setSelectedLocale(e.target.value as 'en' | 'vi')}
              className="border-2 border-outer-space shadow-sm focus:border-jungle-green focus:ring-2 focus:ring-amber-500 text-sm px-3 py-2 text-outer-space"
            >
              <option value="en">English</option>
              <option value="vi">Tiếng Việt</option>
            </select>
          </div>
        </div>
      </div>

      {notification && (
        <div
          className={`border-2 p-4 mb-6 ${
            notification.type === 'success'
              ? 'border-green-700 bg-green-50 text-green-800'
              : 'border-red-700 bg-red-50 text-red-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-medium">{notification.message}</span>
            <button
              onClick={() => setNotification(null)}
              className="ml-4 text-outer-space transition-colors hover:text-jungle-green"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <HeroEditor
        key={selectedLocale}
        locale={selectedLocale}
        onSave={handleSave}
        onError={handleError}
        autoSave={false}
        showPreview={false}
      />

      <div className="bg-mint-green border-l-4 border-jungle-green shadow-md p-8 mt-8">
        <h3 className="text-2xl font-sans font-bold text-outer-space mb-6">Tips &amp; Guidelines</h3>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h4 className="text-lg font-bold text-outer-space mb-3">Content Guidelines</h4>
            <ul className="space-y-2 text-base text-feldgrau leading-relaxed">
              <li>• Keep titles concise and impactful</li>
              <li>• Use line breaks (\\n) to control text layout</li>
              <li>• Subtitles should support the main message</li>
              <li>• Test different content lengths in the preview</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold text-outer-space mb-3">Image Best Practices</h4>
            <ul className="space-y-2 text-base text-feldgrau leading-relaxed">
              <li>• Use high-quality images (minimum 800x600)</li>
              <li>• Images are cropped to center, plan composition accordingly</li>
              <li>• Test images across different screen sizes</li>
              <li>• Relative paths start with /img/ or /images/</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
