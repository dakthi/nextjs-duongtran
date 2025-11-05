'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'

import FileUpload from '@/components/media/FileUpload'
import type { MediaLibraryItem } from '@/types/media'
import { ImageControlSettings } from '@/components/media/ImagePositionControl'
import type { BlogPostRecord } from '@/types/blog.types'
import { generateSlug } from '@/lib/slug'

interface BlogFormState {
  id?: string
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  imagePosition?: string
  imageZoom?: number
  imageFit?: 'cover' | 'contain' | 'fill'
  category: string
  quote: string
  readingTime: string
  publishedDate: string
  clientName: string
  clientAge: string
  clientJob: string
  clientImage: string
  clientImagePosition?: string
  clientImageZoom?: number
  clientImageFit?: 'cover' | 'contain' | 'fill'
  expertName: string
  expertTitle: string
  expertImage: string
  expertImagePosition?: string
  expertImageZoom?: number
  expertImageFit?: 'cover' | 'contain' | 'fill'
  isFeatured: boolean
  isPublished: boolean
}

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  errors?: Record<string, string>
}

const emptyForm: BlogFormState = {
  slug: '',
  title: '',
  excerpt: '',
  content: '',
  image: '',
  imagePosition: 'center',
  imageZoom: 100,
  imageFit: 'cover',
  category: '',
  quote: '',
  readingTime: '',
  publishedDate: '',
  clientName: '',
  clientAge: '',
  clientJob: '',
  clientImage: '',
  clientImagePosition: 'center',
  clientImageZoom: 100,
  clientImageFit: 'cover',
  expertName: '',
  expertTitle: '',
  expertImage: '',
  expertImagePosition: 'center',
  expertImageZoom: 100,
  expertImageFit: 'cover',
  isFeatured: false,
  isPublished: true,
}

const recordToFormState = (record: BlogPostRecord): BlogFormState => ({
  id: record.id,
  slug: record.slug,
  title: record.title,
  excerpt: record.excerpt ?? '',
  content: record.content,
  image: record.image ?? '',
  imagePosition: record.imagePosition ?? 'center',
  imageZoom: record.imageZoom ?? 100,
  imageFit: (record.imageFit as 'cover' | 'contain' | 'fill') ?? 'cover',
  category: record.category ?? '',
  quote: record.quote ?? '',
  readingTime: record.readingTime != null ? String(record.readingTime) : '',
  publishedDate: record.publishedDate ?? '',
  clientName: record.clientName ?? '',
  clientAge: record.clientAge != null ? String(record.clientAge) : '',
  clientJob: record.clientJob ?? '',
  clientImage: record.clientImage ?? '',
  clientImagePosition: record.clientImagePosition ?? 'center',
  clientImageZoom: record.clientImageZoom ?? 100,
  clientImageFit: (record.clientImageFit as 'cover' | 'contain' | 'fill') ?? 'cover',
  expertName: record.expertName ?? '',
  expertTitle: record.expertTitle ?? '',
  expertImage: record.expertImage ?? '',
  expertImagePosition: record.expertImagePosition ?? 'center',
  expertImageZoom: record.expertImageZoom ?? 100,
  expertImageFit: (record.expertImageFit as 'cover' | 'contain' | 'fill') ?? 'cover',
  isFeatured: record.isFeatured,
  isPublished: record.isPublished,
})

const formStateToPayload = (state: BlogFormState) => ({
  id: state.id,
  slug: state.slug,
  title: state.title,
  excerpt: state.excerpt || null,
  content: state.content,
  image: state.image || null,
  imagePosition: state.imagePosition || 'center',
  imageZoom: state.imageZoom || 100,
  imageFit: state.imageFit || 'cover',
  category: state.category || null,
  quote: state.quote || null,
  readingTime: state.readingTime ? Number(state.readingTime) || null : null,
  publishedDate: state.publishedDate || null,
  clientName: state.clientName || null,
  clientAge: state.clientAge ? Number(state.clientAge) || null : null,
  clientJob: state.clientJob || null,
  clientImage: state.clientImage || null,
  clientImagePosition: state.clientImagePosition || 'center',
  clientImageZoom: state.clientImageZoom || 100,
  clientImageFit: state.clientImageFit || 'cover',
  expertName: state.expertName || null,
  expertTitle: state.expertTitle || null,
  expertImage: state.expertImage || null,
  expertImagePosition: state.expertImagePosition || 'center',
  expertImageZoom: state.expertImageZoom || 100,
  expertImageFit: state.expertImageFit || 'cover',
  isFeatured: state.isFeatured,
  isPublished: state.isPublished,
})

// Use our improved slug generation that handles Vietnamese characters
const slugify = generateSlug

const isEqual = (a: BlogFormState, b: BlogFormState) => JSON.stringify(a) === JSON.stringify(b)

export default function BlogManager() {
  const pathname = usePathname()
  // Extract locale from pathname
  const locale = pathname.split('/')[1] || 'en'

  const [posts, setPosts] = useState<BlogPostRecord[]>([])
  const [formState, setFormState] = useState<BlogFormState>(emptyForm)
  const [originalState, setOriginalState] = useState<BlogFormState>(emptyForm)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  })

  const selectedId = formState.id ?? null
  const hasChanges = useMemo(() => !isEqual(formState, originalState), [formState, originalState])

  const showStatus = useCallback((type: 'success' | 'error', message: string) => {
    setStatus({ type, message })
    setTimeout(() => setStatus({ type: null, message: '' }), 5000)
  }, [])

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    try {
      const url = `/api/blog?locale=${locale}`
      const response = await fetch(url, { cache: 'no-store' })
      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        throw new Error(payload?.error || 'Failed to load posts')
      }
      const payload = (await response.json()) as ApiResponse<BlogPostRecord[]>
      const data = payload.data ?? []
      setPosts(data)
      if (data.length > 0) {
        const first = recordToFormState(data[0])
        setFormState(first)
        setOriginalState(first)
      } else {
        setFormState({ ...emptyForm })
        setOriginalState({ ...emptyForm })
      }
    } catch (error) {
      console.error('Failed to fetch posts', error)
      showStatus('error', error instanceof Error ? error.message : 'Failed to load posts')
      setPosts([])
      setFormState({ ...emptyForm })
      setOriginalState({ ...emptyForm })
    } finally {
      setLoading(false)
    }
  }, [showStatus, locale])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const handleSelectPost = (post: BlogPostRecord) => {
    const nextState = recordToFormState(post)
    setFormState(nextState)
    setOriginalState(nextState)
  }

  const handleNewPost = () => {
    const nextState: BlogFormState = {
      ...emptyForm,
      slug: '',
      title: '',
      isPublished: false,
    }
    setFormState(nextState)
    setOriginalState(nextState)
  }

  const handleInputChange = (field: keyof BlogFormState) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value = event.target.type === 'checkbox'
      ? (event.target as HTMLInputElement).checked
      : event.target.value

    setFormState(prev => {
      const updated = {
        ...prev,
        [field]: value
      }

      // Auto-generate slug when title changes (only for new posts or if slug is empty)
      if (field === 'title' && typeof value === 'string' && (!prev.id || !prev.slug)) {
        updated.slug = slugify(value)
      }

      return updated
    })
  }

  const handleSetImage = (field: keyof BlogFormState) => (media: MediaLibraryItem | null) => {
    setFormState(prev => ({
      ...prev,
      [field]: media?.url ?? ''
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const payload = formStateToPayload(formState)
      const endpoint = selectedId ? `/api/blog/${selectedId}?locale=${locale}` : `/api/blog?locale=${locale}`
      const method = selectedId ? 'PUT' : 'POST'
      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => null)
        if (errorPayload?.errors) {
          const firstError = Object.values(errorPayload.errors)[0]
          throw new Error(firstError || errorPayload.error || 'Validation failed')
        }
        throw new Error(errorPayload?.error || 'Failed to save post')
      }

      const result = (await response.json()) as ApiResponse<BlogPostRecord>
      if (!result.data) {
        throw new Error('No post returned from server')
      }

      const updatedPost = result.data
      setPosts(prev => {
        const existingIndex = prev.findIndex(item => item.id === updatedPost.id)
        if (existingIndex >= 0) {
          const clone = [...prev]
          clone[existingIndex] = updatedPost
          return clone
        }
        return [updatedPost, ...prev]
      })

      const nextState = recordToFormState(updatedPost)
      setFormState(nextState)
      setOriginalState(nextState)
      showStatus('success', 'Blog post saved successfully')
    } catch (error) {
      console.error('Failed to save post', error)
      showStatus('error', error instanceof Error ? error.message : 'Failed to save post')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedId) {
      showStatus('error', 'Select a post before deleting')
      return
    }

    if (!window.confirm('Delete this post? This cannot be undone.')) {
      return
    }

    try {
      const remaining = posts.filter(post => post.id !== selectedId)
      const response = await fetch(`/api/blog/${selectedId}`, { method: 'DELETE' })
      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        throw new Error(payload?.error || 'Failed to delete post')
      }

      showStatus('success', 'Post deleted')
      setPosts(remaining)

      if (remaining.length > 0) {
        const nextState = recordToFormState(remaining[0])
        setFormState(nextState)
        setOriginalState(nextState)
      } else {
        handleNewPost()
      }
    } catch (error) {
      console.error('Failed to delete post', error)
      showStatus('error', error instanceof Error ? error.message : 'Failed to delete post')
    }
  }

  const handleGenerateSlug = () => {
    if (!formState.title) return
    const generatedSlug = slugify(formState.title)
    setFormState(prev => ({ ...prev, slug: generatedSlug }))
  }

  const resetForm = () => {
    setFormState(originalState)
  }

  return (
    <div className="space-y-6">
      {status.type && (
        <div
          className={`rounded-md border p-3 ${
            status.type === 'success'
              ? 'border-green-200 bg-green-50 text-green-700'
              : 'border-red-200 bg-red-50 text-red-700'
          }`}
        >
          {status.message}
        </div>
      )}

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="lg:w-1/3 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Posts</h2>
            <button
              type="button"
              onClick={handleNewPost}
              className="rounded-md bg-blue-600 px-3 py-1 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              New Post
            </button>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white">
            {loading ? (
              <div className="p-4 text-sm text-gray-500">Loading posts…</div>
            ) : posts.length === 0 ? (
              <div className="p-4 text-sm text-gray-500">No posts yet. Create your first article.</div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {posts.map((post) => {
                  const isActive = post.id === selectedId
                  return (
                    <li key={post.id}>
                      <button
                        type="button"
                        onClick={() => handleSelectPost(post)}
                        className={`flex w-full flex-col items-start gap-1 px-4 py-3 text-left transition ${
                          isActive ? 'bg-blue-50 text-blue-900' : 'hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-sm font-semibold">{post.title || '(Untitled)'}</span>
                        <span className="text-xs text-gray-500">/{post.slug}</span>
                        <span className={`text-xs font-medium ${post.isPublished ? 'text-green-600' : 'text-amber-600'}`}>
                          {post.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>

        <div className="lg:w-2/3">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Blog Post Editor</h2>
                {selectedId && (
                  <p className="text-xs text-gray-500">Editing post #{selectedId.slice(0, 6)}…</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={formState.isFeatured}
                    onChange={handleInputChange('isFeatured')}
                  />
                  Featured
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={formState.isPublished}
                    onChange={handleInputChange('isPublished')}
                  />
                  Published
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={formState.title}
                  onChange={handleInputChange('title')}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="mb-1 block text-sm font-medium text-gray-700">Slug</label>
                  <button
                    type="button"
                    onClick={handleGenerateSlug}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Generate from title
                  </button>
                </div>
                <input
                  type="text"
                  value={formState.slug}
                  onChange={handleInputChange('slug')}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {formState.slug && (
                  <p className="mt-1 text-xs text-gray-500">
                    URL Preview: <span className="font-mono">/blog/{formState.slug}</span>
                  </p>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Category</label>
                  <input
                    type="text"
                    value={formState.category}
                    onChange={handleInputChange('category')}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Reading Time (minutes)</label>
                  <input
                    type="number"
                    min={0}
                    value={formState.readingTime}
                    onChange={handleInputChange('readingTime')}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Published Date</label>
                  <input
                    type="text"
                    placeholder="YYYY-MM-DD"
                    value={formState.publishedDate}
                    onChange={handleInputChange('publishedDate')}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Quote</label>
                  <input
                    type="text"
                    value={formState.quote}
                    onChange={handleInputChange('quote')}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Excerpt</label>
                <textarea
                  rows={3}
                  value={formState.excerpt}
                  onChange={handleInputChange('excerpt')}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Content (Markdown)</label>
                <textarea
                  rows={12}
                  value={formState.content}
                  onChange={handleInputChange('content')}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm"
                />
              </div>

              <div>
                <FileUpload
                  label="Featured Image"
                  currentImage={formState.image || null}
                  onFileSelect={handleSetImage('image')}
                  showImageControls={!!formState.image}
                  imagePosition={formState.imagePosition || 'center'}
                  imageZoom={formState.imageZoom || 100}
                  imageFit={formState.imageFit || 'cover'}
                  onImageSettingsChange={(settings: ImageControlSettings) => {
                    setFormState(prev => ({
                      ...prev,
                      imagePosition: settings.position,
                      imageZoom: settings.zoom,
                      imageFit: settings.fit
                    }))
                  }}
                  containerAspectRatio={16 / 9}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-800">Client Details</h3>
                  <input
                    type="text"
                    value={formState.clientName}
                    onChange={handleInputChange('clientName')}
                    placeholder="Client name"
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      min={0}
                      value={formState.clientAge}
                      onChange={handleInputChange('clientAge')}
                      placeholder="Age"
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                    <input
                      type="text"
                      value={formState.clientJob}
                      onChange={handleInputChange('clientJob')}
                      placeholder="Role"
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                  </div>
                  <FileUpload
                    label="Client Image"
                    currentImage={formState.clientImage || null}
                    onFileSelect={handleSetImage('clientImage')}
                    showImageControls={!!formState.clientImage}
                    imagePosition={formState.clientImagePosition || 'center'}
                    imageZoom={formState.clientImageZoom || 100}
                    imageFit={formState.clientImageFit || 'cover'}
                    onImageSettingsChange={(settings: ImageControlSettings) => {
                      setFormState(prev => ({
                        ...prev,
                        clientImagePosition: settings.position,
                        clientImageZoom: settings.zoom,
                        clientImageFit: settings.fit
                      }))
                    }}
                    containerAspectRatio={1}
                  />
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-800">Expert Details</h3>
                  <input
                    type="text"
                    value={formState.expertName}
                    onChange={handleInputChange('expertName')}
                    placeholder="Expert name"
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                  <input
                    type="text"
                    value={formState.expertTitle}
                    onChange={handleInputChange('expertTitle')}
                    placeholder="Expert title"
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                  <FileUpload
                    label="Expert Image"
                    currentImage={formState.expertImage || null}
                    onFileSelect={handleSetImage('expertImage')}
                    showImageControls={!!formState.expertImage}
                    imagePosition={formState.expertImagePosition || 'center'}
                    imageZoom={formState.expertImageZoom || 100}
                    imageFit={formState.expertImageFit || 'cover'}
                    onImageSettingsChange={(settings: ImageControlSettings) => {
                      setFormState(prev => ({
                        ...prev,
                        expertImagePosition: settings.position,
                        expertImageZoom: settings.zoom,
                        expertImageFit: settings.fit
                      }))
                    }}
                    containerAspectRatio={1}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving || !hasChanges}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? 'Saving…' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={!hasChanges}
                  className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Reset
                </button>
                {selectedId && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
