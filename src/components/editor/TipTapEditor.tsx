"use client";

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { useEffect, useState, useRef } from 'react'
import { CustomImage } from './ImageExtension'
import { ImageUploadWidget } from './ImageUploadWidget'
import { ImageSizeControl } from './ImageSizeControl'

interface TipTapEditorProps {
  content: any
  onChange: (json: any, html: string) => void
  placeholder?: string
  editable?: boolean
}

export function TipTapEditor({
  content,
  onChange,
  placeholder = 'Start writing...',
  editable = true
}: TipTapEditorProps) {
  const [showImageUpload, setShowImageUpload] = useState(false)
  const [showImageControl, setShowImageControl] = useState(false)
  const isUpdatingRef = useRef(false)

  // Ensure content has a valid structure, even if empty
  const initialContent = content || { type: 'doc', content: [{ type: 'paragraph' }] }

  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    extensions: [
      StarterKit,
      CustomImage.configure({
        inline: false,
        allowBase64: false,
        HTMLAttributes: {},
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: initialContent,
    editable,
    onUpdate: ({ editor }) => {
      // Prevent triggering onChange during external content updates
      if (isUpdatingRef.current) {
        return
      }
      const json = editor.getJSON()
      const html = editor.getHTML()
      onChange(json, html)
    },
    onSelectionUpdate: ({ editor }) => {
      // Show image control when image is selected
      const isImageSelected = editor.isActive('customImage')
      setShowImageControl(isImageSelected)
    },
    editorProps: {
      attributes: {
        class: 'prose prose-slate max-w-none focus:outline-none min-h-[400px] px-8 py-6',
      },
    },
  })

  useEffect(() => {
    if (editor && content) {
      const currentContent = editor.getJSON()
      const newContent = content

      // More reliable comparison that handles nested objects
      const isDifferent = JSON.stringify(currentContent) !== JSON.stringify(newContent)

      if (isDifferent) {
        // Set flag to prevent onChange from firing during external update
        isUpdatingRef.current = true
        editor.commands.setContent(newContent)
        // Reset flag after a brief delay to allow the update to complete
        setTimeout(() => {
          isUpdatingRef.current = false
        }, 0)
      }
    }
  }, [content, editor])

  if (!editor) {
    return null
  }

  return (
    <div className="border-2 border-outer-space [&_em]:italic [&_em]:font-normal">
      {/* Toolbar */}
      {editable && (
        <div className="border-b-2 border-outer-space bg-mint-green p-3 flex flex-wrap gap-2">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`px-3 py-1 text-sm font-semibold transition-colors ${
              editor.isActive('bold')
                ? 'bg-mint-green0 text-outer-space'
                : 'bg-white border-2 border-outer-space text-outer-space hover:bg-slate-100'
            }`}
            type="button"
          >
            Bold
          </button>

          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`px-3 py-1 text-sm font-semibold transition-colors ${
              editor.isActive('italic')
                ? 'bg-mint-green0 text-outer-space'
                : 'bg-white border-2 border-outer-space text-outer-space hover:bg-slate-100'
            }`}
            type="button"
          >
            Italic
          </button>

          <div className="w-px bg-slate-300 mx-1" />

          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`px-3 py-1 text-sm font-semibold transition-colors ${
              editor.isActive('heading', { level: 2 })
                ? 'bg-mint-green0 text-outer-space'
                : 'bg-white border-2 border-outer-space text-outer-space hover:bg-slate-100'
            }`}
            type="button"
          >
            H2
          </button>

          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`px-3 py-1 text-sm font-semibold transition-colors ${
              editor.isActive('heading', { level: 3 })
                ? 'bg-mint-green0 text-outer-space'
                : 'bg-white border-2 border-outer-space text-outer-space hover:bg-slate-100'
            }`}
            type="button"
          >
            H3
          </button>

          <div className="w-px bg-slate-300 mx-1" />

          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`px-3 py-1 text-sm font-semibold transition-colors ${
              editor.isActive('bulletList')
                ? 'bg-mint-green0 text-outer-space'
                : 'bg-white border-2 border-outer-space text-outer-space hover:bg-slate-100'
            }`}
            type="button"
          >
            Bullet List
          </button>

          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`px-3 py-1 text-sm font-semibold transition-colors ${
              editor.isActive('orderedList')
                ? 'bg-mint-green0 text-outer-space'
                : 'bg-white border-2 border-outer-space text-outer-space hover:bg-slate-100'
            }`}
            type="button"
          >
            Numbered List
          </button>

          <div className="w-px bg-slate-300 mx-1" />

          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`px-3 py-1 text-sm font-semibold transition-colors ${
              editor.isActive('blockquote')
                ? 'bg-mint-green0 text-outer-space'
                : 'bg-white border-2 border-outer-space text-outer-space hover:bg-slate-100'
            }`}
            type="button"
          >
            Quote
          </button>

          <div className="w-px bg-slate-300 mx-1" />

          <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="px-3 py-1 text-sm font-semibold bg-white border-2 border-outer-space text-outer-space hover:bg-slate-100 transition-colors"
            type="button"
          >
            Divider
          </button>

          <div className="w-px bg-slate-300 mx-1" />

          <button
            onClick={() => setShowImageUpload(!showImageUpload)}
            className={`px-3 py-1 text-sm font-semibold transition-colors ${
              showImageUpload
                ? 'bg-jungle-green text-white'
                : 'bg-white border-2 border-outer-space text-outer-space hover:bg-slate-100'
            }`}
            type="button"
          >
            📷 Insert Image
          </button>

          <div className="w-px bg-slate-300 mx-1" />

          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="px-3 py-1 text-sm font-semibold bg-white border-2 border-outer-space text-outer-space hover:bg-slate-100 transition-colors disabled:opacity-50"
            type="button"
          >
            Undo
          </button>

          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="px-3 py-1 text-sm font-semibold bg-white border-2 border-outer-space text-outer-space hover:bg-slate-100 transition-colors disabled:opacity-50"
            type="button"
          >
            Redo
          </button>
        </div>
      )}

      {/* Editor Content */}
      <div className="bg-white relative">
        <EditorContent editor={editor} />

        {/* Image Upload Widget */}
        {showImageUpload && editor && (
          <ImageUploadWidget
            editor={editor}
            onClose={() => setShowImageUpload(false)}
          />
        )}

        {/* Image Size Control */}
        {showImageControl && editor && editable && (
          <ImageSizeControl
            editor={editor}
            onClose={() => setShowImageControl(false)}
          />
        )}
      </div>
    </div>
  )
}
