'use client'

import Link from 'next/link'
import { useState } from 'react'

const sections = [
  {
    label: 'Hero Content',
    href: '/admin/hero',
    description: 'Manage homepage hero section and featured image'
  },
  {
    label: 'Blog Posts',
    href: '/admin/blog',
    description: 'Create and edit blog articles with rich text editor'
  },
  {
    label: 'About Page',
    href: '/admin/about',
    description: 'Update about page content and sections'
  },
  {
    label: 'Testimonials',
    href: '/admin/testimonials',
    description: 'Curate client testimonials and reviews'
  },
  {
    label: 'Media Library',
    href: '/admin/media',
    description: 'Upload and manage images and media files'
  },
  {
    label: 'FAQ',
    href: '/admin/faq',
    description: 'Manage frequently asked questions'
  },
]

export default function AdminDashboard() {
  const [exporting, setExporting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleExportDatabase = async () => {
    setExporting(true)
    setMessage(null)

    try {
      const response = await fetch('/api/admin/export-db')

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Export failed')
      }

      // Get the SQL dump as blob
      const blob = await response.blob()

      // Extract filename from Content-Disposition header
      const contentDisposition = response.headers.get('Content-Disposition')
      const filenameMatch = contentDisposition?.match(/filename="(.+)"/)
      const filename = filenameMatch ? filenameMatch[1] : `database-backup-${new Date().toISOString().split('T')[0]}.sql`

      // Create download link
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      setMessage({ type: 'success', text: 'Database exported successfully!' })
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
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-3">
          Admin Dashboard
        </p>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 leading-tight mb-4">
          Content Management
        </h1>
        <p className="text-lg font-medium text-slate-700 leading-relaxed max-w-3xl">
          Manage your website content, media, and settings. Select a section below to get started.
        </p>
      </div>

      {/* CMS Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="bg-white border-2 border-slate-800 p-6 shadow-md hover:shadow-xl transition-shadow border-l-4 border-l-amber-500"
          >
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {section.label}
            </h3>
            <p className="text-base text-slate-700 leading-relaxed">
              {section.description}
            </p>
          </Link>
        ))}
      </div>

      {/* Export Section */}
      <div className="bg-amber-50 border-2 border-slate-800 p-8 shadow-md">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h2 className="text-2xl font-serif font-bold text-slate-900 leading-tight">
            Database Backup
          </h2>
          <p className="text-base text-slate-700 leading-relaxed">
            Export a complete SQL dump of your database for backup or migration purposes.
          </p>

          <button
            onClick={handleExportDatabase}
            disabled={exporting}
            className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-8 py-3 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {exporting ? 'Exporting Database...' : 'Export Full Database (SQL)'}
          </button>

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
