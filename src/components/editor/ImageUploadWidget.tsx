'use client'

import { useState } from 'react'
import { Editor } from '@tiptap/react'
import { ImageCropDialog } from '@/components/media/ImageCropDialog'
import Image from 'next/image'

interface ImageUploadWidgetProps {
  editor: Editor
  onClose: () => void
}

interface MediaItem {
  id: string
  url: string
  originalName: string
  alt?: string
}

export function ImageUploadWidget({ editor, onClose }: ImageUploadWidgetProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'library'>('upload')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string>('')
  const [showCropDialog, setShowCropDialog] = useState(false)
  const [mediaLibrary, setMediaLibrary] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingLibrary, setLoadingLibrary] = useState(false)

  // Load media library when tab is opened
  const loadMediaLibrary = async () => {
    if (mediaLibrary.length > 0) return // Already loaded

    setLoadingLibrary(true)
    try {
      const response = await fetch('/api/media')
      if (response.ok) {
        const data = await response.json()
        setMediaLibrary(data.items || [])
      }
    } catch (error) {
      console.error('Error loading media library:', error)
    } finally {
      setLoadingLibrary(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
      // Create object URL for the image
      const url = URL.createObjectURL(file)
      setImageUrl(url)
      setShowCropDialog(true)
    }
  }

  const handleCroppedImage = async (croppedBlob: Blob) => {
    setShowCropDialog(false)
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('file', croppedBlob, selectedFile?.name || 'image.jpg')
      formData.append('altText', '')
      formData.append('caption', '')

      const response = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        insertImage(data.url, data.alt || '')
      } else {
        console.error('Upload failed')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
    } finally {
      setLoading(false)
    }
  }

  const insertImage = (url: string, alt: string = '') => {
    editor.chain().focus().setImage({ src: url, alt, width: '100', alignment: 'center' }).run()
    onClose()
  }

  const handleLibraryImageSelect = (item: MediaItem) => {
    insertImage(item.url, item.alt || item.originalName)
  }

  return (
    <div className="border-4 border-outer-space bg-white shadow-[4px_4px_0px_0px_rgba(67,79,77,1)] p-4 my-4 max-w-2xl">
      {/* Tabs */}
      <div className="flex gap-2 mb-4 border-b-2 border-gray-200">
        <button
          onClick={() => setActiveTab('upload')}
          className={`px-4 py-2 font-semibold transition-colors ${
            activeTab === 'upload'
              ? 'text-jungle-green border-b-2 border-jungle-green -mb-0.5'
              : 'text-feldgrau hover:text-jungle-green'
          }`}
        >
          Upload New
        </button>
        <button
          onClick={() => {
            setActiveTab('library')
            loadMediaLibrary()
          }}
          className={`px-4 py-2 font-semibold transition-colors ${
            activeTab === 'library'
              ? 'text-jungle-green border-b-2 border-jungle-green -mb-0.5'
              : 'text-feldgrau hover:text-jungle-green'
          }`}
        >
          Media Library
        </button>
      </div>

      {/* Upload Tab */}
      {activeTab === 'upload' && (
        <div>
          <div className="border-2 border-dashed border-gray-300 rounded p-8 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="image-upload-input"
            />
            <label
              htmlFor="image-upload-input"
              className="cursor-pointer inline-block px-6 py-3 bg-jungle-green text-white font-semibold hover:bg-jungle-green-dark transition-colors"
            >
              {loading ? 'Uploading...' : 'Choose Image'}
            </label>
            <p className="mt-2 text-sm text-feldgrau">
              Click to upload an image. You'll be able to crop it before inserting.
            </p>
          </div>
        </div>
      )}

      {/* Library Tab */}
      {activeTab === 'library' && (
        <div>
          {loadingLibrary ? (
            <div className="text-center py-8 text-feldgrau">Loading media library...</div>
          ) : mediaLibrary.length === 0 ? (
            <div className="text-center py-8 text-feldgrau">No images in library yet.</div>
          ) : (
            <div className="grid grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              {mediaLibrary.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleLibraryImageSelect(item)}
                  className="relative aspect-square border-2 border-gray-300 hover:border-jungle-green transition-all group overflow-hidden"
                >
                  <Image
                    src={item.url}
                    alt={item.alt || item.originalName}
                    fill
                    style={{ objectFit: 'cover' }}
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 font-semibold">
                      Insert
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Close Button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 text-feldgrau hover:text-outer-space font-semibold transition-colors"
        >
          Cancel
        </button>
      </div>

      {/* Crop Dialog */}
      {showCropDialog && imageUrl && (
        <ImageCropDialog
          imageUrl={imageUrl}
          onComplete={handleCroppedImage}
          onCancel={() => {
            setShowCropDialog(false)
            setSelectedFile(null)
            URL.revokeObjectURL(imageUrl)
            setImageUrl('')
          }}
          showAspectRatioSelector={true}
        />
      )}
    </div>
  )
}
