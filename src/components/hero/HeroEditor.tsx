'use client'

import { useState, useEffect, useCallback } from 'react'
import { HeroData, HeroFieldGroup, HeroFormData, HeroEditorState } from '@/types/hero.types'
import FileUpload from '@/components/media/FileUpload'
import type { MediaLibraryItem } from '@/types/media'
import { HeroPreview } from './HeroPreview'

const heroDataToFormData = (data: HeroData): HeroFormData => ({
  ...data
} as HeroFormData)

interface HeroEditorProps {
  onSave?: (data: HeroData) => void
  onError?: (error: string) => void
  autoSave?: boolean
  autoSaveInterval?: number
  showPreview?: boolean
}

export function HeroEditor({
  onSave,
  onError,
  autoSave = false,
  autoSaveInterval = 30000,
  showPreview = true
}: HeroEditorProps) {
  const [formData, setFormData] = useState<HeroFormData>({})
  const [originalData, setOriginalData] = useState<HeroFormData>({})
  const [editorState, setEditorState] = useState<HeroEditorState>({
    isLoading: true,
    isSaving: false,
    hasUnsavedChanges: false,
    errors: {},
    previewMode: false
  })

  // Field configuration adapted for HeroContent model
  const fieldGroups: HeroFieldGroup[] = [
    {
      title: 'Main Content',
      description: 'Primary hero section content',
      fields: [
        {
          key: 'title',
          label: 'Hero Title',
          type: 'text',
          placeholder: 'I am an accountant. How about you?',
          description: 'Main headline displayed prominently',
          required: true,
          maxLength: 200
        },
        {
          key: 'subtitle',
          label: 'Hero Subtitle',
          type: 'textarea',
          placeholder: 'I would love you hear more about you...',
          description: 'Supporting text below the main title',
          maxLength: 300
        },
        {
          key: 'description',
          label: 'Description',
          type: 'textarea',
          placeholder: 'Leave the boring parts to me...',
          description: 'Additional descriptive text',
          maxLength: 500
        }
      ]
    },
    {
      title: 'Call-to-Action',
      description: 'Action button in the hero section',
      fields: [
        {
          key: 'ctaText',
          label: 'Button Text',
          type: 'text',
          placeholder: 'See how I can help',
          description: 'Text for the call-to-action button',
          maxLength: 50
        },
        {
          key: 'ctaLink',
          label: 'Button Link',
          type: 'text',
          placeholder: '/services',
          description: 'URL or path for the button (e.g., /services, /contact, or https://...)'
        }
      ]
    },
    {
      title: 'Visual Design',
      description: 'Background image for the hero section',
      fields: [
        {
          key: 'image',
          label: 'Hero Image',
          type: 'text',
          placeholder: '/img/hero-image.jpg',
          description: 'Hero image URL or path (e.g., /img/hero.jpg or https://...)'
        }
      ]
    }
  ]

  // Load initial data
  useEffect(() => {
    const loadHeroData = async () => {
      try {
        setEditorState(prev => ({ ...prev, isLoading: true }))

        const response = await fetch('/api/hero')
        const result = await response.json()

        if (result.success && result.data) {
          const data = result.data as HeroData
          const normalized = heroDataToFormData(data)
          setFormData(normalized)
          setOriginalData(normalized)
        } else {
          // Initialize with empty form if no data exists
          setFormData({})
          setOriginalData({})
        }
      } catch (error) {
        console.error('Error loading hero data:', error)
        onError?.(error instanceof Error ? error.message : 'Failed to load data')
      } finally {
        setEditorState(prev => ({ ...prev, isLoading: false }))
      }
    }

    loadHeroData()
  }, [onError])

  // Check for unsaved changes
  useEffect(() => {
    const hasChanges = JSON.stringify(formData) !== JSON.stringify(originalData)
    setEditorState(prev => ({ ...prev, hasUnsavedChanges: hasChanges }))
  }, [formData, originalData])

  // Auto-save functionality
  useEffect(() => {
    if (!autoSave || !editorState.hasUnsavedChanges || editorState.isSaving) return

    const autoSaveTimer = setTimeout(() => {
      handleSave(true)
    }, autoSaveInterval)

    return () => clearTimeout(autoSaveTimer)
  }, [autoSave, editorState.hasUnsavedChanges, editorState.isSaving, autoSaveInterval])

  // Handle form field changes
  const handleFieldChange = useCallback((key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }))

    // Clear field error when user starts typing
    if (editorState.errors[key]) {
      setEditorState(prev => ({
        ...prev,
        errors: { ...prev.errors, [key]: '' }
      }))
    }
  }, [editorState.errors])

  // Validate form data
  const validateForm = useCallback((): Record<string, string> => {
    const errors: Record<string, string> = {}

    fieldGroups.forEach(group => {
      group.fields.forEach(field => {
        const value = formData[field.key] as string || ''

        if (field.required && !value.trim()) {
          errors[field.key] = `${field.label} is required`
        }

        if (field.maxLength && value.length > field.maxLength) {
          errors[field.key] = `${field.label} is too long (max ${field.maxLength} characters)`
        }

        if (field.type === 'url' && value && !isValidUrl(value)) {
          errors[field.key] = 'Please enter a valid URL or path'
        }
      })
    })

    return errors
  }, [formData])

  // Handle save operation
  const handleSave = useCallback(async (isAutoSave = false) => {
    try {
      setEditorState(prev => ({ ...prev, isSaving: true }))

      // Validate form
      const validationErrors = validateForm()
      if (Object.keys(validationErrors).length > 0) {
        setEditorState(prev => ({
          ...prev,
          errors: validationErrors,
          isSaving: false
        }))
        return
      }

      // Determine if this is a new record or update
      const method = formData.id ? 'PUT' : 'POST'
      const response = await fetch('/api/hero', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (result.success) {
        const normalized = heroDataToFormData(result.data as HeroData)
        setOriginalData(normalized)
        setFormData(normalized)
        setEditorState(prev => ({
          ...prev,
          hasUnsavedChanges: false,
          lastSaved: new Date(),
          errors: {}
        }))
        onSave?.(result.data)
      } else {
        throw new Error(result.error || 'Failed to save')
      }
    } catch (error) {
      console.error('Error saving hero data:', error)
      onError?.(error instanceof Error ? error.message : 'Failed to save')
    } finally {
      setEditorState(prev => ({ ...prev, isSaving: false }))
    }
  }, [formData, validateForm, onSave, onError])

  // Helper function to validate URLs
  const isValidUrl = (value: string): boolean => {
    // Allow empty values
    if (!value) return true
    // Allow relative paths
    if (value.startsWith('/')) return true
    // Allow hash links
    if (value.startsWith('#')) return true
    // Allow full URLs
    try {
      new URL(value)
      return true
    } catch {
      return false
    }
  }

  // Render field input based on type
  const renderField = useCallback((field: any) => {
    const value = formData[field.key] as string || ''
    const error = editorState.errors[field.key]

    const commonProps = {
      id: field.key,
      value,
      onChange: (e: any) => handleFieldChange(field.key, e.target.value),
      placeholder: field.placeholder,
      maxLength: field.maxLength,
      className: `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        error ? 'border-red-500' : 'border-gray-300'
      }`
    }

    if (field.key === 'image') {
      return (
        <div className="space-y-3">
          <FileUpload
            currentImage={value || null}
            onFileSelect={(media: MediaLibraryItem | null) => {
              setFormData(prev => ({ ...prev, image: media?.url || '' }))
            }}
          />
          {value && (
            <div className="break-all rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-600">
              {value}
            </div>
          )}
        </div>
      )
    }

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            {...commonProps}
            rows={3}
            className={`${commonProps.className} resize-vertical`}
          />
        )
      case 'url':
        // Use text input for URLs to avoid browser validation issues with relative paths
        return <input type="text" {...commonProps} />
      default:
        return <input type="text" {...commonProps} />
    }
  }, [formData, editorState.errors, handleFieldChange, setFormData])

  if (editorState.isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading hero editor...</span>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className={`flex flex-col gap-6 ${showPreview ? 'lg:flex-row' : ''}`}>
        {/* Editor Form */}
        <div className={showPreview ? 'lg:w-1/2' : 'w-full'}>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Hero Editor</h2>
              <div className="flex items-center gap-3">
                {editorState.hasUnsavedChanges && (
                  <span className="text-amber-600 text-sm">• Unsaved changes</span>
                )}
                {editorState.lastSaved && (
                  <span className="text-gray-500 text-sm">
                    Saved {editorState.lastSaved.toLocaleTimeString()}
                  </span>
                )}
                {showPreview && (
                  <button
                    onClick={() => setEditorState(prev => ({ ...prev, previewMode: !prev.previewMode }))}
                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                  >
                    {editorState.previewMode ? 'Hide' : 'Show'} Preview
                  </button>
                )}
              </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSave() }} className="space-y-6">
              {fieldGroups.map((group, groupIndex) => (
                <div key={groupIndex} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{group.title}</h3>
                  {group.description && (
                    <p className="text-sm text-gray-600 mb-4">{group.description}</p>
                  )}

                  <div className="space-y-4">
                    {group.fields.map((field) => (
                      <div key={field.key}>
                        <label
                          htmlFor={field.key}
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>

                        {renderField(field)}

                        {field.description && (
                          <p className="text-xs text-gray-500 mt-1">{field.description}</p>
                        )}

                        {editorState.errors[field.key] && (
                          <p className="text-sm text-red-600 mt-1">{editorState.errors[field.key]}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="submit"
                  disabled={editorState.isSaving || !editorState.hasUnsavedChanges}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {editorState.isSaving ? 'Saving...' : 'Save Changes'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setFormData({ ...originalData })
                    setEditorState(prev => ({ ...prev, errors: {} }))
                  }}
                  disabled={!editorState.hasUnsavedChanges}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Live Preview */}
        {showPreview && (
          <div className={`lg:w-1/2 ${editorState.previewMode ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-6">
              <HeroPreview
                data={formData}
                className="rounded-lg overflow-hidden shadow-md"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
