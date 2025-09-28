'use client'

import { useState } from 'react'
import { HeroEditor } from '@/components/hero/HeroEditor'
import { HeroData } from '@/types/hero.types'

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
    <div className="space-y-8 pb-12">
      <div>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hero Section Management</h1>
            <p className="mt-2 text-gray-600">
              Customize your homepage hero section content with live preview
            </p>
          </div>

          {/* Language Selector */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Language:</label>
            <select
              value={selectedLocale}
              onChange={(e) => setSelectedLocale(e.target.value as 'en' | 'vi')}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
            >
              <option value="en">English</option>
              <option value="vi">Tiếng Việt</option>
            </select>
          </div>
        </div>
      </div>

      {notification && (
        <div
          className={`rounded-md border p-4 ${
            notification.type === 'success'
              ? 'border-green-200 bg-green-50 text-green-800'
              : 'border-red-200 bg-red-50 text-red-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <span>{notification.message}</span>
            <button
              onClick={() => setNotification(null)}
              className="ml-4 text-gray-400 transition-colors hover:text-gray-600"
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

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tips &amp; Guidelines</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Content Guidelines</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Keep titles concise and impactful</li>
              <li>• Use line breaks (\\n) to control text layout</li>
              <li>• Subtitles should support the main message</li>
              <li>• Test different content lengths in the preview</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Image Best Practices</h4>
            <ul className="space-y-1 text-sm text-gray-600">
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
