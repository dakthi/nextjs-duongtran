"use client"

import { useState, useRef } from "react"

import { formatFileSize, extractImageMetadata, validateImageFile } from "@/lib/media/image-utils"
import type { MediaLibraryItem } from "@/types/media"
import { ImagePositionControl, ImageControlSettings } from "./ImagePositionControl"
import { ImageCropDialog } from "./ImageCropDialog"

interface FileUploadProps {
  onFileSelect: (file: MediaLibraryItem | null) => void
  currentImage?: string | null
  label?: string
  accept?: string
  showMediaLibrary?: boolean
  // Image control props
  showImageControls?: boolean
  imagePosition?: string
  imageZoom?: number
  imageFit?: 'cover' | 'contain' | 'fill'
  onImageSettingsChange?: (settings: ImageControlSettings) => void
  containerAspectRatio?: number
  // Crop functionality
  enableCrop?: boolean
  cropAspectRatio?: number
}

export default function FileUpload({
  onFileSelect,
  currentImage,
  label = "Upload Image",
  accept = "image/*",
  showMediaLibrary = true,
  showImageControls = false,
  imagePosition = 'center',
  imageZoom = 100,
  imageFit = 'cover',
  onImageSettingsChange,
  containerAspectRatio = 16 / 9,
  enableCrop = false,
  cropAspectRatio = 16 / 9,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [showLibrary, setShowLibrary] = useState(false)
  const [mediaItems, setMediaItems] = useState<MediaLibraryItem[]>([])
  const [loadingLibrary, setLoadingLibrary] = useState(false)
  const [showCropDialog, setShowCropDialog] = useState(false)
  const [imageToCrop, setImageToCrop] = useState<string | null>(null)
  const [originalFileName, setOriginalFileName] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const objectUrl = URL.createObjectURL(file)
    setOriginalFileName(file.name)

    if (enableCrop) {
      setImageToCrop(objectUrl)
      setShowCropDialog(true)
    } else {
      setPreviewUrl(objectUrl)
      await uploadFile(file)
      URL.revokeObjectURL(objectUrl)
      setPreviewUrl(null)
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const uploadFile = async (file: File, altText = "", caption = "") => {
    const validation = validateImageFile(file)
    if (!validation.isValid) {
      alert(`Upload failed: ${validation.error}`)
      return
    }

    setUploading(true)
    setUploadProgress(15)

    try {
      const metadata = await extractImageMetadata(file)
      const finalAltText = altText || `Image: ${metadata.name}`

      const formData = new FormData()
      formData.append("file", file)
      formData.append("altText", finalAltText)
      formData.append("caption", caption)

      const response = await fetch("/api/media", {
        method: "POST",
        body: formData
      })

      if (!response.ok) {
        let message = "Upload failed"
        try {
          const payload = await response.json()
          message = payload?.error || message
        } catch (error) {
          if (response.status === 401) {
            message = "Unauthorized. Please log in."
          } else if (response.status === 413) {
            message = "File too large."
          } else {
            message = `${message} (${response.status})`
          }
        }
        throw new Error(message)
      }

      const mediaItem = (await response.json()) as MediaLibraryItem
      onFileSelect(mediaItem)
      setUploadProgress(100)
    } catch (error) {
      console.error("[FileUpload] Error uploading file", error)
      alert(`Upload failed: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setUploading(false)
      setTimeout(() => setUploadProgress(0), 500)
    }
  }

  const loadMediaLibrary = async () => {
    if (mediaItems.length > 0) {
      setShowLibrary(true)
      return
    }

    setLoadingLibrary(true)
    try {
      const response = await fetch("/api/media")
      if (!response.ok) throw new Error("Failed to load media library")
      const items = (await response.json()) as MediaLibraryItem[]
      setMediaItems(items)
      setShowLibrary(true)
    } catch (error) {
      console.error("Error loading media library", error)
      alert("Unable to load media library")
    } finally {
      setLoadingLibrary(false)
    }
  }

  const selectFromLibrary = (item: MediaLibraryItem) => {
    onFileSelect(item)
    setShowLibrary(false)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (!file) return

    const objectUrl = URL.createObjectURL(file)
    setOriginalFileName(file.name)

    if (enableCrop) {
      setImageToCrop(objectUrl)
      setShowCropDialog(true)
    } else {
      setPreviewUrl(objectUrl)
      uploadFile(file).finally(() => {
        URL.revokeObjectURL(objectUrl)
        setPreviewUrl(null)
      })
    }
  }

  const handleCropComplete = async (croppedBlob: Blob) => {
    setShowCropDialog(false)

    // Create a File object from the Blob
    const croppedFile = new File([croppedBlob], originalFileName, {
      type: "image/jpeg",
      lastModified: Date.now(),
    })

    // Show preview of cropped image
    const previewUrl = URL.createObjectURL(croppedBlob)
    setPreviewUrl(previewUrl)

    await uploadFile(croppedFile)

    // Clean up
    if (imageToCrop) {
      URL.revokeObjectURL(imageToCrop)
      setImageToCrop(null)
    }
    URL.revokeObjectURL(previewUrl)
    setPreviewUrl(null)
  }

  const handleCropCancel = () => {
    setShowCropDialog(false)
    if (imageToCrop) {
      URL.revokeObjectURL(imageToCrop)
      setImageToCrop(null)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const clearImage = () => {
    onFileSelect(null)
  }

  const handleImageSettingsChange = (settings: ImageControlSettings) => {
    if (onImageSettingsChange) {
      onImageSettingsChange(settings)
    }
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {(currentImage || previewUrl) && (
        <div className="relative inline-block">
          <img
            src={previewUrl || currentImage || ""}
            alt={previewUrl ? "Preview" : "Current"}
            className="h-32 w-32 rounded-lg border-2 border-gray-300 object-cover shadow-sm"
          />
          {previewUrl && (
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-40">
              <span className="text-xs font-medium text-white">Preview</span>
            </div>
          )}
          {(currentImage || previewUrl) && (
            <button
              type="button"
              onClick={clearImage}
              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white shadow-md transition hover:bg-red-600"
            >
              ×
            </button>
          )}
        </div>
      )}

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-gray-400"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="space-y-2">
          <div className="text-gray-400">
            <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 48 48">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              />
            </svg>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-600">
              Drop an image here, or{" "}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="font-medium text-indigo-600 hover:text-indigo-500"
                disabled={uploading}
              >
                browse
              </button>
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF, WebP, SVG up to 5MB</p>
          </div>
        </div>

        {uploading && (
          <div className="mt-4 space-y-2">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-indigo-600" />
            <p className="text-sm text-gray-600">Uploading…</p>
            {uploadProgress > 0 && (
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-indigo-600 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {showMediaLibrary && (
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={loadMediaLibrary}
            disabled={loadingLibrary}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50 disabled:opacity-60"
          >
            {loadingLibrary ? "Loading…" : "Choose from Library"}
          </button>
        </div>
      )}

      {showLibrary && (
        <div className="fixed inset-0 z-50 h-full w-full overflow-y-auto bg-gray-600 bg-opacity-50">
          <div className="relative top-20 mx-auto w-11/12 max-w-4xl rounded-md border bg-white p-5 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Media Library</h3>
              <button
                onClick={() => setShowLibrary(false)}
                className="text-gray-400 transition hover:text-gray-600"
              >
                Close
              </button>
            </div>

            <div className="grid max-h-96 grid-cols-2 gap-4 overflow-y-auto md:grid-cols-4 lg:grid-cols-6">
              {mediaItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => selectFromLibrary(item)}
                  className="group relative overflow-hidden rounded-lg border border-gray-200 text-left transition hover:border-indigo-500"
                >
                  <img src={item.url} alt={item.alt || item.originalName} className="h-24 w-full object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-0 transition group-hover:bg-opacity-20" />
                  <div className="absolute bottom-0 left-0 right-0 translate-y-2 bg-black bg-opacity-75 p-1 text-xs text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="truncate font-medium">{item.originalName}</p>
                    <p className="text-[10px] text-gray-200">{formatFileSize(item.size)}</p>
                  </div>
                </button>
              ))}
            </div>

            {mediaItems.length === 0 && !loadingLibrary && (
              <div className="py-8 text-center text-gray-500">No images uploaded yet.</div>
            )}
          </div>
        </div>
      )}

      {showImageControls && currentImage && (
        <ImagePositionControl
          imageUrl={currentImage}
          value={{
            position: imagePosition,
            zoom: imageZoom,
            fit: imageFit,
          }}
          onChange={handleImageSettingsChange}
          label="Adjust Image Display"
          containerAspectRatio={containerAspectRatio}
        />
      )}

      {showCropDialog && imageToCrop && (
        <ImageCropDialog
          imageUrl={imageToCrop}
          onComplete={handleCropComplete}
          onCancel={handleCropCancel}
          aspectRatio={cropAspectRatio}
        />
      )}
    </div>
  )
}
