'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

import FileUpload from '@/components/media/FileUpload'
import type { MediaLibraryItem } from '@/types/media'
import type { TestimonialRecord } from '@/types/testimonial.types'
import { TipTapEditor } from '@/components/editor/TipTapEditor'

interface TestimonialFormState {
  id?: string
  name: string
  role: string
  relationship: string
  dateLabel: string
  content: string
  contentJson?: any
  contentHtml?: string
  image: string
  imagePosition?: string
  imageZoom?: number
  imageFit?: 'cover' | 'contain' | 'fill'
  order: string
  isActive: boolean
}

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  errors?: Record<string, string>
}

const emptyForm: TestimonialFormState = {
  name: '',
  role: '',
  relationship: '',
  dateLabel: '',
  content: '',
  image: '',
  imagePosition: 'center',
  imageZoom: 100,
  imageFit: 'cover',
  order: '0',
  isActive: true,
}

const recordToFormState = (record: TestimonialRecord): TestimonialFormState => ({
  id: record.id,
  name: record.name,
  role: record.role ?? '',
  relationship: record.relationship ?? '',
  dateLabel: record.dateLabel ?? '',
  content: record.content,
  contentJson: (record as any).contentJson,
  contentHtml: (record as any).contentHtml,
  image: record.image ?? '',
  imagePosition: record.imagePosition ?? 'center',
  imageZoom: record.imageZoom ?? 100,
  imageFit: (record.imageFit as 'cover' | 'contain' | 'fill') ?? 'cover',
  order: String(record.order ?? 0),
  isActive: record.isActive,
})

const formStateToPayload = (state: TestimonialFormState) => ({
  id: state.id,
  name: state.name,
  role: state.role || null,
  relationship: state.relationship || null,
  dateLabel: state.dateLabel || null,
  content: state.content,
  contentJson: state.contentJson,
  contentHtml: state.contentHtml,
  image: state.image || null,
  imagePosition: state.imagePosition || 'center',
  imageZoom: state.imageZoom || 100,
  imageFit: state.imageFit || 'cover',
  order: state.order ? Number(state.order) || 0 : 0,
  isActive: state.isActive,
})

const isEqual = (a: TestimonialFormState, b: TestimonialFormState) => JSON.stringify(a) === JSON.stringify(b)

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<TestimonialRecord[]>([])
  const [formState, setFormState] = useState<TestimonialFormState>(emptyForm)
  const [originalState, setOriginalState] = useState<TestimonialFormState>(emptyForm)
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

  const fetchTestimonials = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/testimonials', { cache: 'no-store' })
      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        throw new Error(payload?.error || 'Failed to load testimonials')
      }
      const payload = (await response.json()) as ApiResponse<TestimonialRecord[]>
      const data = payload.data ?? []
      setTestimonials(data)
      if (data.length > 0) {
        const first = recordToFormState(data[0])
        setFormState(first)
        setOriginalState(first)
      } else {
        setFormState(emptyForm)
        setOriginalState(emptyForm)
      }
    } catch (error) {
      console.error('Failed to fetch testimonials', error)
      showStatus('error', error instanceof Error ? error.message : 'Failed to load testimonials')
      setTestimonials([])
      setFormState(emptyForm)
      setOriginalState(emptyForm)
    } finally {
      setLoading(false)
    }
  }, [showStatus])

  useEffect(() => {
    fetchTestimonials()
  }, [fetchTestimonials])

  const handleSelect = (record: TestimonialRecord) => {
    const nextState = recordToFormState(record)
    setFormState(nextState)
    setOriginalState(nextState)
  }

  const handleNew = () => {
    setFormState({ ...emptyForm })
    setOriginalState({ ...emptyForm })
  }

  const handleInputChange = (field: keyof TestimonialFormState) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value = event.target.type === 'checkbox'
      ? (event.target as HTMLInputElement).checked
      : event.target.value
    setFormState(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleImageSelect = (media: MediaLibraryItem | null) => {
    setFormState(prev => ({
      ...prev,
      image: media?.url ?? ''
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const payload = formStateToPayload(formState)
      const endpoint = selectedId ? `/api/testimonials/${selectedId}` : '/api/testimonials'
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
        throw new Error(errorPayload?.error || 'Failed to save testimonial')
      }

      const result = (await response.json()) as ApiResponse<TestimonialRecord>
      if (!result.data) {
        throw new Error('No testimonial returned from server')
      }

      const updated = result.data
      setTestimonials(prev => {
        const index = prev.findIndex(item => item.id === updated.id)
        if (index >= 0) {
          const clone = [...prev]
          clone[index] = updated
          return clone
        }
        return [updated, ...prev]
      })

      const nextState = recordToFormState(updated)
      setFormState(nextState)
      setOriginalState(nextState)
      showStatus('success', 'Testimonial saved successfully')
    } catch (error) {
      console.error('Failed to save testimonial', error)
      showStatus('error', error instanceof Error ? error.message : 'Failed to save testimonial')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedId) {
      showStatus('error', 'Select a testimonial before deleting')
      return
    }

    if (!window.confirm('Delete this testimonial? This cannot be undone.')) {
      return
    }

    try {
      const remaining = testimonials.filter(item => item.id !== selectedId)
      const response = await fetch(`/api/testimonials/${selectedId}`, { method: 'DELETE' })
      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        throw new Error(payload?.error || 'Failed to delete testimonial')
      }

      showStatus('success', 'Testimonial deleted')
      setTestimonials(remaining)

      if (remaining.length > 0) {
        const nextState = recordToFormState(remaining[0])
        setFormState(nextState)
        setOriginalState(nextState)
      } else {
        handleNew()
      }
    } catch (error) {
      console.error('Failed to delete testimonial', error)
      showStatus('error', error instanceof Error ? error.message : 'Failed to delete testimonial')
    }
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
            <h2 className="text-lg font-semibold text-gray-900">Testimonials</h2>
            <button
              type="button"
              onClick={handleNew}
              className="rounded-md bg-blue-600 px-3 py-1 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              New
            </button>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white">
            {loading ? (
              <div className="p-4 text-sm text-gray-500">Loading testimonials…</div>
            ) : testimonials.length === 0 ? (
              <div className="p-4 text-sm text-gray-500">No testimonials yet.</div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {testimonials.map(testimonial => {
                  const isActive = testimonial.id === selectedId
                  return (
                    <li key={testimonial.id}>
                      <button
                        type="button"
                        onClick={() => handleSelect(testimonial)}
                        className={`flex w-full flex-col items-start gap-1 px-4 py-3 text-left transition ${
                          isActive ? 'bg-blue-50 text-blue-900' : 'hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-sm font-semibold">{testimonial.name}</span>
                        <span className="text-xs text-gray-500">Order: {testimonial.order}</span>
                        <span className={`text-xs font-medium ${testimonial.isActive ? 'text-green-600' : 'text-amber-600'}`}>
                          {testimonial.isActive ? 'Visible' : 'Hidden'}
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
                <h2 className="text-xl font-semibold text-gray-900">Testimonial Editor</h2>
                {selectedId && (
                  <p className="text-xs text-gray-500">Editing testimonial #{selectedId.slice(0, 6)}…</p>
                )}
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={formState.isActive}
                  onChange={handleInputChange('isActive')}
                />
                Visible
              </label>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={handleInputChange('name')}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Role</label>
                  <input
                    type="text"
                    value={formState.role}
                    onChange={handleInputChange('role')}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Relationship</label>
                  <input
                    type="text"
                    value={formState.relationship}
                    onChange={handleInputChange('relationship')}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Date Label</label>
                  <input
                    type="text"
                    value={formState.dateLabel}
                    onChange={handleInputChange('dateLabel')}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Display Order</label>
                  <input
                    type="number"
                    value={formState.order}
                    onChange={handleInputChange('order')}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
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
                  placeholder="Write the testimonial content..."
                />
              </div>

              <div>
                <FileUpload
                  label="Portrait Image"
                  currentImage={formState.image || null}
                  onFileSelect={handleImageSelect}
                  enableCrop={true}
                  cropAspectRatio={1}
                  showAspectRatioSelector={true}
                />
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
