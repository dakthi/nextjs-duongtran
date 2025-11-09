"use client";

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import { useEffect } from 'react'

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
  // Ensure content has a valid structure, even if empty
  const initialContent = content || { type: 'doc', content: [{ type: 'paragraph' }] }

  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'w-full h-auto border-4 border-outer-space shadow-lg my-8',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: initialContent,
    editable,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON()
      const html = editor.getHTML()
      onChange(json, html)
    },
    editorProps: {
      attributes: {
        class: 'prose prose-slate max-w-none focus:outline-none min-h-[400px] px-8 py-6',
      },
    },
  })

  useEffect(() => {
    if (editor && content && JSON.stringify(editor.getJSON()) !== JSON.stringify(content)) {
      editor.commands.setContent(content)
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
      <div className="bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
