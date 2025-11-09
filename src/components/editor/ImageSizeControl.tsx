'use client'

import { Editor } from '@tiptap/react'
import { useEffect, useState } from 'react'

interface ImageSizeControlProps {
  editor: Editor
  onClose: () => void
}

export function ImageSizeControl({ editor, onClose }: ImageSizeControlProps) {
  const [width, setWidth] = useState(100)
  const [alignment, setAlignment] = useState<'left' | 'center' | 'right'>('center')
  const [alt, setAlt] = useState('')

  useEffect(() => {
    // Get current image attributes
    const { width: currentWidth, alignment: currentAlignment, alt: currentAlt } = editor.getAttributes('customImage')

    if (currentWidth) setWidth(parseInt(currentWidth))
    if (currentAlignment) setAlignment(currentAlignment)
    if (currentAlt) setAlt(currentAlt)
  }, [editor])

  const updateWidth = (newWidth: number) => {
    setWidth(newWidth)
    editor.chain().focus().updateImageAttributes({ width: newWidth.toString() }).run()
  }

  const updateAlignment = (newAlignment: 'left' | 'center' | 'right') => {
    setAlignment(newAlignment)
    editor.chain().focus().updateImageAttributes({ alignment: newAlignment }).run()
  }

  const updateAlt = () => {
    editor.chain().focus().updateImageAttributes({ alt }).run()
  }

  const deleteImage = () => {
    editor.chain().focus().deleteSelection().run()
    onClose()
  }

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white border-4 border-outer-space shadow-[6px_6px_0px_0px_rgba(67,79,77,1)] p-6 w-96">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-outer-space">Image Settings</h3>
        <button
          onClick={onClose}
          className="text-feldgrau hover:text-outer-space transition-colors"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Width Slider */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-outer-space mb-2">
          Width: {width}%
        </label>
        <input
          type="range"
          min="25"
          max="100"
          step="5"
          value={width}
          onChange={(e) => updateWidth(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-jungle-green"
        />
        <div className="flex justify-between text-xs text-feldgrau mt-1">
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Alignment Buttons */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-outer-space mb-2">Alignment</label>
        <div className="flex gap-2">
          <button
            onClick={() => updateAlignment('left')}
            className={`flex-1 px-4 py-2 font-semibold transition-all ${
              alignment === 'left'
                ? 'bg-jungle-green text-white'
                : 'bg-gray-100 text-feldgrau hover:bg-gray-200'
            }`}
            title="Align Left"
          >
            <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h16" />
            </svg>
          </button>
          <button
            onClick={() => updateAlignment('center')}
            className={`flex-1 px-4 py-2 font-semibold transition-all ${
              alignment === 'center'
                ? 'bg-jungle-green text-white'
                : 'bg-gray-100 text-feldgrau hover:bg-gray-200'
            }`}
            title="Align Center"
          >
            <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M7 12h10M4 18h16" />
            </svg>
          </button>
          <button
            onClick={() => updateAlignment('right')}
            className={`flex-1 px-4 py-2 font-semibold transition-all ${
              alignment === 'right'
                ? 'bg-jungle-green text-white'
                : 'bg-gray-100 text-feldgrau hover:bg-gray-200'
            }`}
            title="Align Right"
          >
            <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M10 12h10M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Alt Text */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-outer-space mb-2">Alt Text</label>
        <input
          type="text"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          onBlur={updateAlt}
          placeholder="Describe this image..."
          className="w-full px-3 py-2 border-2 border-gray-300 focus:border-jungle-green focus:outline-none transition-colors"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={deleteImage}
          className="flex-1 px-4 py-2 bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
        >
          Delete Image
        </button>
        <button
          onClick={onClose}
          className="flex-1 px-4 py-2 bg-jungle-green text-white font-semibold hover:bg-jungle-green-dark transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  )
}
