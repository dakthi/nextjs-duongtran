'use client'

import { useEffect, useState } from 'react'

import FileUpload from '@/components/media/FileUpload'
import type { MediaLibraryItem } from '@/types/media'
import { formatFileSize } from '@/lib/media/image-utils'

export const dynamic = 'force-dynamic'

export default function AdminMediaPage() {
  const [mediaItems, setMediaItems] = useState<MediaLibraryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const loadMediaItems = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/media', { cache: 'no-store' })
      if (!response.ok) {
        const payload = await response.json().catch(() => ({}))
        throw new Error(payload?.error || 'Unable to load media items')
      }

      const items = (await response.json()) as MediaLibraryItem[]
      setMediaItems(items)
    } catch (err) {
      console.error('[AdminMediaPage] Error loading media library', err)
      setError(err instanceof Error ? err.message : 'Failed to load media library')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMediaItems()
  }, [])

  const handleUpload = (item: MediaLibraryItem | null) => {
    if (!item) {
      // Clear selection
      return
    }

    setMediaItems((prev) => [item, ...prev])
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this media item? This action cannot be undone.')) return

    setDeletingId(id)
    try {
      const response = await fetch(`/api/media/${id}`, { method: 'DELETE' })
      if (!response.ok) {
        const payload = await response.json().catch(() => ({}))
        throw new Error(payload?.error || 'Failed to delete media item')
      }
      setMediaItems((prev) => prev.filter((item) => item.id !== id))
    } catch (err) {
      console.error('[AdminMediaPage] Error deleting media item', err)
      alert(err instanceof Error ? err.message : 'Failed to delete media item')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="pb-12">
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-feldgrau mb-3">
          Content Management
        </p>
        <h1 className="text-3xl md:text-4xl font-sans font-bold text-outer-space leading-tight mb-4">
          Media Library
        </h1>
        <p className="text-lg font-medium text-feldgrau leading-relaxed max-w-3xl">
          Upload new imagery and manage the assets used across the site. Files are stored securely in Cloudflare R2.
        </p>
      </header>

      <section className="bg-white border-2 border-outer-space p-6 shadow-md mb-8">
        <h2 className="text-xl font-sans font-bold text-outer-space mb-2">Upload a new image</h2>
        <p className="text-base text-feldgrau mb-6">
          Images are optimised automatically after upload. Use descriptive filenames to keep the library searchable.
        </p>
        <div className="max-w-xl">
          <FileUpload onFileSelect={handleUpload} currentImage={null} showMediaLibrary={false} />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-sans font-bold text-outer-space">All media</h2>
          <button
            onClick={loadMediaItems}
            className="bg-feldgrau hover:bg-slate-700 text-white px-4 py-2 font-medium transition-colors"
          >
            Refresh
          </button>
        </div>

        {error && (
          <div className="border-2 border-red-700 bg-red-50 p-4 text-red-800">
            <p className="font-bold">Unable to load the media library</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {loading && mediaItems.length === 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="h-40 animate-pulse rounded-lg bg-gray-100" />
            ))}
          </div>
        ) : mediaItems.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-200 p-12 text-center text-gray-500">
            No media uploaded yet. Use the uploader above to add your first image.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {mediaItems.map((item) => (
              <article key={item.id} className="overflow-hidden border-2 border-outer-space shadow-md hover:shadow-xl transition-shadow">
                <div className="relative aspect-video bg-slate-100">
                  <img src={item.url} alt={item.alt || item.originalName} className="h-full w-full object-cover" />
                </div>
                <div className="space-y-2 p-4 bg-white">
                  <p className="truncate text-sm font-bold text-outer-space" title={item.originalName}>
                    {item.originalName}
                  </p>
                  <p className="text-xs text-feldgrau">
                    Uploaded {new Date(item.createdAt).toLocaleDateString()} • {(item.mimeType || '').toUpperCase()}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-feldgrau">{formatFileSize(item.size)}</p>
                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={deletingId === item.id}
                      className="text-xs font-bold text-red-700 hover:text-red-600 disabled:opacity-50"
                    >
                      {deletingId === item.id ? 'Deleting…' : 'Delete'}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
