'use client'

import { useState, useEffect, useCallback } from 'react'
import { TipTapEditor } from '@/components/editor/TipTapEditor'

interface AboutContent {
  id?: string
  locale: string
  slug: string
  headline: string
  intro: string
  contentJson: any
  contentHtml?: string
  isActive: boolean
}

export default function AboutEditor() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [headline, setHeadline] = useState('')
  const [intro, setIntro] = useState('')
  const [contentJson, setContentJson] = useState<any>(null)
  const [contentHtml, setContentHtml] = useState('')
  const [hasChanges, setHasChanges] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  })

  const showStatus = useCallback((type: 'success' | 'error', message: string) => {
    setStatus({ type, message })
    setTimeout(() => setStatus({ type: null, message: '' }), 5000)
  }, [])

  const fetchContent = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/about?locale=en', { cache: 'no-store' })
      if (!response.ok) {
        throw new Error('Failed to load about content')
      }
      const data: AboutContent | null = await response.json()

      if (data) {
        setHeadline(data.headline || '')
        setIntro(data.intro || '')
        setContentJson(data.contentJson)
        setContentHtml(data.contentHtml || '')
      }
    } catch (error) {
      console.error('Failed to fetch about content', error)
      showStatus('error', error instanceof Error ? error.message : 'Failed to load about content')
    } finally {
      setLoading(false)
    }
  }, [showStatus])

  useEffect(() => {
    fetchContent()
  }, [fetchContent])

  const handleEditorChange = (json: any, html: string) => {
    setContentJson(json)
    setContentHtml(html)
    setHasChanges(true)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const payload = {
        locale: 'en',
        slug: 'default',
        headline,
        intro,
        contentJson,
      }

      const response = await fetch('/api/admin/about', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => null)
        throw new Error(errorPayload?.error || 'Failed to save about content')
      }

      const result: AboutContent = await response.json()
      setContentJson(result.contentJson)
      setContentHtml(result.contentHtml || '')
      setHasChanges(false)
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

      <div className="rounded-lg border-2 border-slate-800 bg-white shadow-md">
        <div className="border-b-2 border-slate-800 bg-slate-50 p-6">
          <h2 className="text-xl font-serif font-bold text-slate-900">About Page Content</h2>
          <p className="text-sm text-slate-700 mt-2">Edit the blog-style content for the About page using the rich text editor.</p>
        </div>

        {loading ? (
          <div className="py-10 text-center text-sm text-slate-700">Loading about content...</div>
        ) : (
          <div className="p-6 space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-900">Headline (Optional)</label>
              <input
                type="text"
                value={headline}
                onChange={(e) => {
                  setHeadline(e.target.value)
                  setHasChanges(true)
                }}
                placeholder="Optional headline for the about page"
                className="w-full border-2 border-slate-800 px-4 py-2 text-base focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-900">Intro (Optional)</label>
              <textarea
                rows={3}
                value={intro}
                onChange={(e) => {
                  setIntro(e.target.value)
                  setHasChanges(true)
                }}
                placeholder="Optional intro paragraph"
                className="w-full border-2 border-slate-800 px-4 py-2 text-base focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-900">Content</label>
              <TipTapEditor
                content={contentJson}
                onChange={handleEditorChange}
                placeholder="Start writing your about page content..."
              />
              <p className="mt-2 text-xs text-slate-600">
                Use headings (H2, H3) to structure your content. The content will be displayed in a single-column blog-style layout.
              </p>
            </div>

            <div className="flex gap-3 pt-4 border-t-2 border-slate-200">
              <button
                type="button"
                onClick={handleSave}
                disabled={saving || !hasChanges}
                className="px-8 py-3 text-base font-semibold text-slate-900 bg-amber-500 hover:bg-amber-400 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={fetchContent}
                disabled={!hasChanges}
                className="px-6 py-2 text-sm font-medium bg-white border-2 border-slate-800 text-slate-900 hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
