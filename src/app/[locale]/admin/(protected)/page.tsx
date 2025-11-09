'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

const sections = [
  {
    label: 'Hero Content',
    href: 'hero',
    description: 'Manage homepage hero section and featured image'
  },
  {
    label: 'Blog Posts',
    href: 'blog',
    description: 'Create and edit blog articles with rich text editor'
  },
  {
    label: 'About Page',
    href: 'about',
    description: 'Update about page content and sections'
  },
  {
    label: 'Testimonials',
    href: 'testimonials',
    description: 'Curate client testimonials and reviews'
  },
  {
    label: 'Media Library',
    href: 'media',
    description: 'Upload and manage images and media files'
  },
  {
    label: 'FAQ',
    href: 'faq',
    description: 'Manage frequently asked questions'
  },
]

export default function AdminDashboard() {
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'en'
  const [exporting, setExporting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleExportDatabase = async (format: 'json' | 'csv' | 'txt') => {
    setExporting(true)
    setMessage(null)

    try {
      const response = await fetch(`/api/admin/export-db?format=${format}`)

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Export failed')
      }

      // Get the export as blob
      const blob = await response.blob()

      // Extract filename from Content-Disposition header
      const contentDisposition = response.headers.get('Content-Disposition')
      const filenameMatch = contentDisposition?.match(/filename="(.+)"/)
      const filename = filenameMatch ? filenameMatch[1] : `database-backup-${new Date().toISOString().split('T')[0]}.${format}`

      // Create download link
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      setMessage({ type: 'success', text: `Database exported as ${format.toUpperCase()} successfully!` })
    } catch (error) {
      console.error('Export error:', error)
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to export database'
      })
    } finally {
      setExporting(false)
      setTimeout(() => setMessage(null), 5000)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-8 xl:px-12 py-12">
      {/* Header */}
      <div className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-feldgrau mb-4">
          Admin Dashboard
        </p>
        <h1 className="text-3xl md:text-4xl font-sans font-bold text-outer-space leading-tight mb-6">
          Content Management
        </h1>
        <p className="text-lg font-medium text-outer-space leading-relaxed max-w-3xl">
          Manage your website content, media, and settings. Select a section below to get started.
        </p>
      </div>

      {/* CMS Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={`/${locale}/admin/${section.href}`}
            className="bg-white border-2 border-outer-space p-6 shadow-md hover:shadow-xl transition-shadow border-l-4 border-l-amber-500"
          >
            <h3 className="text-lg font-bold text-outer-space mb-2">
              {section.label}
            </h3>
            <p className="text-base text-feldgrau leading-relaxed">
              {section.description}
            </p>
          </Link>
        ))}
      </div>

      {/* Export Section */}
      <div className="bg-mint-green border-l-4 border-jungle-green shadow-md p-8">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-2xl font-sans font-bold text-outer-space leading-tight">
            Database Backup
          </h2>
          <p className="text-base text-feldgrau leading-relaxed">
            Export your complete database in multiple formats for backup or migration purposes.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => handleExportDatabase('json')}
              disabled={exporting}
              className="bg-mint-green0 hover:bg-jungle-green text-outer-space px-6 py-3 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {exporting ? 'Exporting...' : 'Export as JSON'}
            </button>

            <button
              onClick={() => handleExportDatabase('txt')}
              disabled={exporting}
              className="bg-feldgrau hover:bg-slate-700 text-white px-6 py-3 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {exporting ? 'Exporting...' : 'Export as Text'}
            </button>

            <button
              onClick={() => handleExportDatabase('csv')}
              disabled={exporting}
              className="bg-feldgrau hover:bg-slate-700 text-white px-6 py-3 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {exporting ? 'Exporting...' : 'Export as CSV'}
            </button>
          </div>

          <div className="text-xs text-feldgrau space-y-1">
            <p><strong>JSON</strong>: Complete structured data, easy to import</p>
            <p><strong>Text</strong>: Human-readable format for review</p>
            <p><strong>CSV</strong>: Summary view with table counts</p>
          </div>

          {message && (
            <p className={`text-sm font-medium ${message.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
              {message.text}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
