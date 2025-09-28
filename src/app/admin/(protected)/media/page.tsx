'use client'

import { useEffect, useState } from 'react'

import FileUpload from '@/components/media/FileUpload'
import type { MediaLibraryItem } from '@/types/media'
import { formatFileSize } from '@/lib/media/image-utils'

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
    <div className="space-y-10 pb-12">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-gray-400">LieuVo Admin</p>
        <h1 className="text-3xl font-bold text-gray-900">Media Library</h1>
        <p className="text-gray-600">
          Upload new imagery and manage the assets used across the site. Files are stored securely in
          Cloudflare R2.
        </p>
      </header>

      <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">Upload a new image</h2>
        <p className="mt-1 text-sm text-gray-600">
          Images are optimised automatically after upload. Use descriptive filenames to keep the
          library searchable.
        </p>
        <div className="mt-6 max-w-xl">
          <FileUpload onFileSelect={handleUpload} currentImage={null} showMediaLibrary={false} />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">All media</h2>
          <button
            onClick={loadMediaItems}
            className="rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            Refresh
          </button>
        </div>

        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700">
            <p className="font-semibold">Unable to load the media library</p>
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
              <article key={item.id} className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                <div className="relative aspect-video bg-gray-100">
                  <img src={item.url} alt={item.alt || item.originalName} className="h-full w-full object-cover" />
                </div>
                <div className="space-y-2 p-4">
                  <p className="truncate text-sm font-medium text-gray-900" title={item.originalName}>
                    {item.originalName}
                  </p>
                  <p className="text-xs text-gray-500">
                    Uploaded {new Date(item.createdAt).toLocaleDateString()} • {(item.mimeType || '').toUpperCase()}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">{formatFileSize(item.size)}</p>
                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={deletingId === item.id}
                      className="text-xs font-medium text-red-600 hover:text-red-500 disabled:opacity-50"
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
