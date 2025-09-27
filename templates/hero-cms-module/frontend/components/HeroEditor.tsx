// Hero Editor Component - Admin interface for editing hero content

'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { HeroSettings, HeroFieldGroup, HeroFormData, HeroEditorState } from '../../types/hero.types'
import { HeroPreview } from './HeroPreview'

interface HeroEditorProps {
  onSave?: (data: HeroSettings) => void
  onError?: (error: string) => void
  autoSave?: boolean
  autoSaveInterval?: number
}

export function HeroEditor({
  onSave,
  onError,
  autoSave = false,
  autoSaveInterval = 30000
}: HeroEditorProps) {
  // State management
  const [formData, setFormData] = useState<HeroFormData>({})
  const [originalData, setOriginalData] = useState<HeroFormData>({})
  const [editorState, setEditorState] = useState<HeroEditorState>({
    isLoading: true,
    isSaving: false,
    hasUnsavedChanges: false,
    errors: {},
    previewMode: false
  })

  // Field configuration
  const fieldGroups: HeroFieldGroup[] = useMemo(() => [
    {
      title: 'Main Content',
      description: 'Primary hero section content',
      fields: [
        {
          key: 'hero_title',
          label: 'Hero Title',
          type: 'text',
          placeholder: 'Your Organization Name',
          description: 'Main headline displayed prominently',
          required: true,
          maxLength: 100
        },
        {
          key: 'hero_subtitle',
          label: 'Hero Subtitle',
          type: 'textarea',
          placeholder: 'Serving the community with excellence...',
          description: 'Supporting text below the main title',
          required: true,
          maxLength: 200
        },
        {
          key: 'hero_description',
          label: 'Description (Optional)',
          type: 'textarea',
          placeholder: 'Additional descriptive text...',
          description: 'Extended description for more context',
          maxLength: 300
        }
      ]
    },
    {
      title: 'Visual Design',
      description: 'Background and visual elements',
      fields: [
        {
          key: 'hero_background_image',
          label: 'Background Image',
          type: 'image',
          placeholder: '/img/hero-bg.jpg',
          description: 'Hero section background image URL'
        }
      ]
    },
    {
      title: 'Call-to-Action Buttons',
      description: 'Action buttons in the hero section',
      fields: [
        {
          key: 'hero_cta_button_text',
          label: 'Primary Button Text',
          type: 'text',
          placeholder: 'Get Started',
          description: 'Text for the main action button',
          maxLength: 30
        },
        {
          key: 'hero_cta_button_link',
          label: 'Primary Button Link',
          type: 'url',
          placeholder: '/programs',
          description: 'URL or path for the primary button'
        },
        {
          key: 'hero_secondary_button_text',
          label: 'Secondary Button Text',
          type: 'text',
          placeholder: 'Learn More',
          description: 'Text for the secondary button',
          maxLength: 30
        },
        {
          key: 'hero_secondary_button_link',
          label: 'Secondary Button Link',
          type: 'url',
          placeholder: '/about',
          description: 'URL or path for the secondary button'
        }
      ]
    },
    {
      title: 'Statistics Display',
      description: 'Numerical stats shown in the hero section',
      fields: [
        {
          key: 'residents_served',
          label: 'Residents Served',
          type: 'text',
          placeholder: '2,000+',
          description: 'Number of people served',
          maxLength: 20
        },
        {
          key: 'weekly_programs',
          label: 'Weekly Programs',
          type: 'text',
          placeholder: '15+',
          description: 'Number of weekly programs',
          maxLength: 20
        },
        {
          key: 'opening_hours_text',
          label: 'Operating Days',
          type: 'text',
          placeholder: '7 days',
          description: 'Operating schedule display',
          maxLength: 20
        },
        {
          key: 'main_hall_capacity',
          label: 'Main Hall Capacity',
          type: 'text',
          placeholder: '120',
          description: 'Maximum facility capacity',
          maxLength: 10
        }
      ]
    }
  ], [])

  // Load initial data
  useEffect(() => {
    const loadHeroData = async () => {
      try {
        setEditorState(prev => ({ ...prev, isLoading: true }))

        const response = await fetch('/api/hero')
        const result = await response.json()

        if (result.success) {
          const data = result.data as HeroSettings
          setFormData(data)
          setOriginalData(data)
        } else {
          throw new Error(result.error || 'Failed to load hero data')
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

        if (field.validation) {
          const customError = field.validation(value)
          if (customError) {
            errors[field.key] = customError
          }
        }
      })
    })

    return errors
  }, [formData, fieldGroups])

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

      // Save to API
      const response = await fetch('/api/hero', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (result.success) {
        setOriginalData({ ...formData })
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
    if (value.startsWith('/')) return true // Relative paths
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
        return <input type="url" {...commonProps} />
      default:
        return <input type="text" {...commonProps} />
    }
  }, [formData, editorState.errors, handleFieldChange])

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
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Editor Form */}
        <div className="lg:w-1/2">
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
                <button
                  onClick={() => setEditorState(prev => ({ ...prev, previewMode: !prev.previewMode }))}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                >
                  {editorState.previewMode ? 'Hide' : 'Show'} Preview
                </button>
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
        <div className={`lg:w-1/2 ${editorState.previewMode ? 'block' : 'hidden lg:block'}`}>
          <div className="sticky top-6">
            <HeroPreview
              data={formData}
              className="rounded-lg overflow-hidden shadow-md"
              height="500px"
            />
          </div>
        </div>
      </div>
    </div>
  )
}