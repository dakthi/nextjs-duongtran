'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'

import FileUpload from '@/components/media/FileUpload'
import type { MediaLibraryItem } from '@/types/media'
import type { BlogPostRecord } from '@/types/blog.types'
import { generateSlug } from '@/lib/slug'
import { TipTapEditor } from '@/components/editor/TipTapEditor'

interface BlogFormState {
  id?: string
  slug: string
  title: string
  excerpt: string
  content: string
  contentJson?: any
  contentHtml?: string
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
  contentJson: (record as any).contentJson,
  contentHtml: (record as any).contentHtml,
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
  contentJson: state.contentJson,
  contentHtml: state.contentHtml,
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

  const handleExportBackup = () => {
    try {
      // Create backup object with timestamp
      const backup = {
        exportDate: new Date().toISOString(),
        locale: locale,
        totalPosts: posts.length,
        posts: posts,
      }

      // Convert to JSON string with formatting
      const jsonString = JSON.stringify(backup, null, 2)

      // Create blob and download
      const blob = new Blob([jsonString], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `blog-backup-${locale}-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      showStatus('success', `Exported ${posts.length} blog posts successfully`)
    } catch (error) {
      console.error('Export failed:', error)
      showStatus('error', 'Failed to export blog posts')
    }
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
          className={`border-2 p-4 ${
            status.type === 'success'
              ? 'border-green-700 bg-green-50 text-green-800'
              : 'border-red-700 bg-red-50 text-red-800'
          }`}
        >
          <span className="font-medium">{status.message}</span>
        </div>
      )}

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="lg:w-1/3 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xl font-serif font-bold text-slate-900">Posts</h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleExportBackup}
                disabled={posts.length === 0}
                className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Export all blog posts as JSON backup"
              >
                Export
              </button>
              <button
                type="button"
                onClick={handleNewPost}
                className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 text-sm font-semibold transition-colors"
              >
                New Post
              </button>
            </div>
          </div>

          <div className="border-2 border-slate-800 bg-white shadow-md">
            {loading ? (
              <div className="p-4 text-sm text-slate-600">Loading posts…</div>
            ) : posts.length === 0 ? (
              <div className="p-4 text-sm text-slate-600">No posts yet. Create your first article.</div>
            ) : (
              <ul className="divide-y-2 divide-slate-200">
                {posts.map((post) => {
                  const isActive = post.id === selectedId
                  return (
                    <li key={post.id}>
                      <button
                        type="button"
                        onClick={() => handleSelectPost(post)}
                        className={`flex w-full flex-col items-start gap-1 px-4 py-3 text-left transition ${
                          isActive ? 'bg-amber-50 border-l-4 border-l-amber-500' : 'hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-sm font-bold text-slate-900">{post.title || '(Untitled)'}</span>
                        <span className="text-xs text-slate-600">/{post.slug}</span>
                        <span className={`text-xs font-bold ${post.isPublished ? 'text-green-700' : 'text-amber-600'}`}>
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
          <div className="border-2 border-slate-800 bg-white p-6 shadow-md">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-serif font-bold text-slate-900">Blog Post Editor</h2>
                {selectedId && (
                  <p className="text-xs text-slate-600">Editing post #{selectedId.slice(0, 6)}…</p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={formState.isFeatured}
                    onChange={handleInputChange('isFeatured')}
                    className="w-4 h-4"
                  />
                  Featured
                </label>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={formState.isPublished}
                    onChange={handleInputChange('isPublished')}
                    className="w-4 h-4"
                  />
                  Published
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-900">Title</label>
                <input
                  type="text"
                  value={formState.title}
                  onChange={handleInputChange('title')}
                  className="w-full border-2 border-slate-800 px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-bold text-slate-900">Slug</label>
                  <button
                    type="button"
                    onClick={handleGenerateSlug}
                    className="text-xs font-semibold text-amber-600 hover:text-amber-500"
                  >
                    Generate from title
                  </button>
                </div>
                <input
                  type="text"
                  value={formState.slug}
                  onChange={handleInputChange('slug')}
                  className="w-full border-2 border-slate-800 px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                {formState.slug && (
                  <p className="mt-2 text-xs text-slate-600">
                    URL Preview: <span className="font-mono font-bold">/blog/{formState.slug}</span>
                  </p>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-900">Category</label>
                  <input
                    type="text"
                    value={formState.category}
                    onChange={handleInputChange('category')}
                    className="w-full border-2 border-slate-800 px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-900">Reading Time (minutes)</label>
                  <input
                    type="number"
                    min={0}
                    value={formState.readingTime}
                    onChange={handleInputChange('readingTime')}
                    className="w-full border-2 border-slate-800 px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-900">Published Date</label>
                  <input
                    type="text"
                    placeholder="YYYY-MM-DD"
                    value={formState.publishedDate}
                    onChange={handleInputChange('publishedDate')}
                    className="w-full border-2 border-slate-800 px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-900">Quote</label>
                  <input
                    type="text"
                    value={formState.quote}
                    onChange={handleInputChange('quote')}
                    className="w-full border-2 border-slate-800 px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
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
                <label className="mb-2 block text-sm font-medium text-gray-700">Content</label>
                <TipTapEditor
                  content={formState.contentJson}
                  onChange={(json, html) => {
                    setFormState(prev => ({
                      ...prev,
                      contentJson: json,
                      contentHtml: html,
                      content: html // Keep legacy field for backward compatibility
                    }))
                  }}
                  placeholder="Write your blog post content..."
                />
              </div>

              <div>
                <FileUpload
                  label="Featured Image"
                  currentImage={formState.image || null}
                  onFileSelect={handleSetImage('image')}
                  enableCrop={true}
                  cropAspectRatio={16 / 9}
                  showAspectRatioSelector={true}
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
                    className="w-full border-2 border-slate-800 px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      min={0}
                      value={formState.clientAge}
                      onChange={handleInputChange('clientAge')}
                      placeholder="Age"
                      className="w-full border-2 border-slate-800 px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <input
                      type="text"
                      value={formState.clientJob}
                      onChange={handleInputChange('clientJob')}
                      placeholder="Role"
                      className="w-full border-2 border-slate-800 px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <FileUpload
                    label="Client Image"
                    currentImage={formState.clientImage || null}
                    onFileSelect={handleSetImage('clientImage')}
                    enableCrop={true}
                    cropAspectRatio={1}
                    showAspectRatioSelector={true}
                  />
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-800">Expert Details</h3>
                  <input
                    type="text"
                    value={formState.expertName}
                    onChange={handleInputChange('expertName')}
                    placeholder="Expert name"
                    className="w-full border-2 border-slate-800 px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <input
                    type="text"
                    value={formState.expertTitle}
                    onChange={handleInputChange('expertTitle')}
                    placeholder="Expert title"
                    className="w-full border-2 border-slate-800 px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <FileUpload
                    label="Expert Image"
                    currentImage={formState.expertImage || null}
                    onFileSelect={handleSetImage('expertImage')}
                    enableCrop={true}
                    cropAspectRatio={1}
                    showAspectRatioSelector={true}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-6 border-t-2 border-slate-200">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving || !hasChanges}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-8 py-3 font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? 'Saving…' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={!hasChanges}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-900 px-6 py-3 font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Reset
                </button>
                {selectedId && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="bg-red-700 hover:bg-red-600 text-white px-6 py-3 font-semibold transition-colors"
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
