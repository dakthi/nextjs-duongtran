'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

import FileUpload from '@/components/media/FileUpload'
import type { MediaLibraryItem } from '@/types/media'
import type { AboutContentRecord, AboutSection } from '@/types/about.types'
import { defaultAboutSections } from '@/components/AboutBody'

interface AboutSectionState {
  id: string
  title: string
  image: string
  imagePosition: 'left' | 'right'
  bodyText: string
}

interface AboutFormState {
  id?: string
  slug?: string
  headline: string
  intro: string
  sections: AboutSectionState[]
  isActive: boolean
}

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  errors?: Record<string, string>
}

const fallbackSections: AboutSectionState[] = defaultAboutSections.map(section => ({
  id: section.id,
  title: section.title ?? '',
  image: section.image ?? '',
  imagePosition: (section.imagePosition === 'right' ? 'right' : 'left') as 'left' | 'right',
  bodyText: (section.body ?? []).join('\n\n')
}))

const emptyForm: AboutFormState = {
  headline: '',
  intro: '',
  sections: fallbackSections,
  isActive: true,
}

const recordToForm = (record: AboutContentRecord): AboutFormState => ({
  id: record.id,
  slug: record.slug,
  headline: record.headline ?? '',
  intro: record.intro ?? '',
  sections: (record.sections ?? []).map((section, index) => sectionToState(section, index)),
  isActive: record.isActive,
})

const sectionToState = (section: AboutSection, index: number): AboutSectionState => ({
  id: section.id || `section-${index + 1}`,
  title: section.title ?? '',
  image: section.image ?? '',
  imagePosition: section.imagePosition === 'right' ? 'right' : 'left',
  bodyText: Array.isArray(section.body) ? section.body.join('\n\n') : '',
})

const sanitizeBody = (bodyText: string): string[] =>
  bodyText
    .split(/\r?\n\s*\r?\n/)
    .map(paragraph => paragraph.trim())
    .filter(Boolean)

const formToPayload = (state: AboutFormState) => ({
  id: state.id,
  slug: state.slug ?? 'default',
  headline: state.headline || null,
  intro: state.intro || null,
  sections: state.sections.map((section, index) => ({
    id: section.id || `section-${index + 1}`,
    title: section.title || null,
    image: section.image || null,
    imagePosition: section.imagePosition,
    body: sanitizeBody(section.bodyText),
  })),
  isActive: state.isActive,
})

const isEqual = (a: AboutFormState, b: AboutFormState) => JSON.stringify(a) === JSON.stringify(b)

const createEmptySection = (): AboutSectionState => ({
  id: `section-${Date.now()}`,
  title: '',
  image: '',
  imagePosition: 'left',
  bodyText: '',
})

export default function AboutManager() {
  const [formState, setFormState] = useState<AboutFormState>(emptyForm)
  const [originalState, setOriginalState] = useState<AboutFormState>(emptyForm)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  })

  const hasChanges = useMemo(() => !isEqual(formState, originalState), [formState, originalState])

  const showStatus = useCallback((type: 'success' | 'error', message: string) => {
    setStatus({ type, message })
    setTimeout(() => setStatus({ type: null, message: '' }), 5000)
  }, [])

  const fetchContent = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/about', { cache: 'no-store' })
      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        throw new Error(payload?.error || 'Failed to load about content')
      }
      const payload = (await response.json()) as ApiResponse<AboutContentRecord | null>
      const data = payload.data
      if (data) {
        const form = recordToForm(data)
        if (form.sections.length === 0) {
          form.sections = fallbackSections
        }
        setFormState(form)
        setOriginalState(form)
      } else {
        setFormState(emptyForm)
        setOriginalState(emptyForm)
      }
    } catch (error) {
      console.error('Failed to fetch about content', error)
      showStatus('error', error instanceof Error ? error.message : 'Failed to load about content')
      setFormState(emptyForm)
      setOriginalState(emptyForm)
    } finally {
      setLoading(false)
    }
  }, [showStatus])

  useEffect(() => {
    fetchContent()
  }, [fetchContent])

  const handleFieldChange = (field: keyof AboutFormState) => (
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

  const updateSection = (id: string, updater: (section: AboutSectionState) => AboutSectionState) => {
    setFormState(prev => ({
      ...prev,
      sections: prev.sections.map(section => (section.id === id ? updater(section) : section))
    }))
  }

  const handleSectionInput = (id: string, field: keyof AboutSectionState) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value = event.target.value
    updateSection(id, section => ({
      ...section,
      [field]: field === 'imagePosition' ? (value === 'right' ? 'right' : 'left') : value
    }))
  }

  const handleSectionImage = (id: string) => (media: MediaLibraryItem | null) => {
    updateSection(id, section => ({
      ...section,
      image: media?.url ?? ''
    }))
  }

  const handleAddSection = () => {
    setFormState(prev => ({
      ...prev,
      sections: [...prev.sections, createEmptySection()]
    }))
  }

  const handleRemoveSection = (id: string) => {
    setFormState(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section.id !== id)
    }))
  }

  const handleMoveSection = (id: string, direction: -1 | 1) => {
    setFormState(prev => {
      const index = prev.sections.findIndex(section => section.id === id)
      if (index === -1) return prev
      const newIndex = index + direction
      if (newIndex < 0 || newIndex >= prev.sections.length) return prev
      const clone = [...prev.sections]
      const [item] = clone.splice(index, 1)
      clone.splice(newIndex, 0, item)
      return { ...prev, sections: clone }
    })
  }

  const resetForm = () => {
    setFormState(originalState)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const payload = formToPayload(formState)
      const response = await fetch('/api/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => null)
        if (errorPayload?.errors) {
          const firstError = Object.values(errorPayload.errors)[0]
          throw new Error(firstError || errorPayload.error || 'Validation failed')
        }
        throw new Error(errorPayload?.error || 'Failed to save about content')
      }

      const result = (await response.json()) as ApiResponse<AboutContentRecord>
      if (!result.data) {
        throw new Error('No about content returned from server')
      }

      const nextState = recordToForm(result.data)
      setFormState(nextState)
      setOriginalState(nextState)
      showStatus('success', 'About content saved successfully')
    } catch (error) {
      console.error('Failed to save about content', error)
      showStatus('error', error instanceof Error ? error.message : 'Failed to save about content')
    } finally {
      setSaving(false)
    }
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

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">About Page Content</h2>
            <p className="text-sm text-gray-500">Edit the storytelling sections that power the About page.</p>
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={formState.isActive}
              onChange={handleFieldChange('isActive')}
            />
            Active on site
          </label>
        </div>

        {loading ? (
          <div className="py-10 text-center text-sm text-gray-500">Loading about content…</div>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Headline</label>
              <input
                type="text"
                value={formState.headline}
                onChange={handleFieldChange('headline')}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Intro</label>
              <textarea
                rows={3}
                value={formState.intro}
                onChange={handleFieldChange('intro')}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Sections</h3>
              <button
                type="button"
                onClick={handleAddSection}
                className="rounded-md bg-blue-600 px-3 py-1 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Add Section
              </button>
            </div>

            <div className="space-y-6">
              {formState.sections.map((section, index) => (
                <div key={section.id} className="rounded-lg border border-gray-200 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                      Section {index + 1}
                    </h4>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleMoveSection(section.id, -1)}
                        disabled={index === 0}
                        className="rounded-md border border-gray-200 px-2 py-1 text-xs text-gray-600 transition disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Move Up
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveSection(section.id, 1)}
                        disabled={index === formState.sections.length - 1}
                        className="rounded-md border border-gray-200 px-2 py-1 text-xs text-gray-600 transition disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Move Down
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveSection(section.id)}
                        className="rounded-md border border-red-200 bg-red-50 px-2 py-1 text-xs text-red-600 transition hover:bg-red-100"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">Title</label>
                      <input
                        type="text"
                        value={section.title}
                        onChange={handleSectionInput(section.id, 'title')}
                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <FileUpload
                        label="Section Image"
                        currentImage={section.image || null}
                        onFileSelect={handleSectionImage(section.id)}
                      />
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Image Position</label>
                        <select
                          value={section.imagePosition}
                          onChange={handleSectionInput(section.id, 'imagePosition')}
                          className="w-full rounded-md border border-gray-300 px-3 py-2"
                        >
                          <option value="left">Image on the left</option>
                          <option value="right">Image on the right</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">Paragraphs</label>
                      <textarea
                        rows={6}
                        value={section.bodyText}
                        onChange={handleSectionInput(section.id, 'bodyText')}
                        placeholder={'Write paragraphs separated by blank lines.'}
                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Separate paragraphs with a blank line.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
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
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
