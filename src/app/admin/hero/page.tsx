'use client'

import { useState } from 'react'
import { HeroEditor } from '@/components/hero/HeroEditor'
import { HeroData } from '@/types/hero.types'
import AdminAuth from '@/components/AdminAuth'

export default function AdminHeroPage() {
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
    <AdminAuth requiredRole="admin">
      <div className="min-h-screen bg-gray-50 py-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Hero Section Management</h1>
          <p className="mt-2 text-gray-600">
            Customize your homepage hero section content with live preview
          </p>
        </div>

        {/* Notification */}
        {notification && (
          <div className={`mb-6 p-4 rounded-md ${
            notification.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            <div className="flex items-center justify-between">
              <span>{notification.message}</span>
              <button
                onClick={() => setNotification(null)}
                className="ml-4 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Hero Editor */}
        <HeroEditor
          onSave={handleSave}
          onError={handleError}
          autoSave={false}
        />

        {/* Help Section */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tips & Guidelines</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Content Guidelines</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Keep titles concise and impactful</li>
                <li>• Use line breaks (\\n) to control text layout</li>
                <li>• Subtitles should support the main message</li>
                <li>• Test different content lengths in the preview</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Image Best Practices</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Use high-quality images (minimum 800x600)</li>
                <li>• Images are cropped to center, plan composition accordingly</li>
                <li>• Test images across different screen sizes</li>
                <li>• Relative paths start with /img/ or /images/</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      </div>
    </AdminAuth>
  )
}