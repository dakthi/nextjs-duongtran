"use client"

import { useState, useCallback } from "react"
import Cropper from "react-easy-crop"
import { Area } from "react-easy-crop/types"

interface ImageCropDialogProps {
  imageUrl: string
  onComplete: (croppedImageBlob: Blob) => void
  onCancel: () => void
  aspectRatio?: number
  showAspectRatioSelector?: boolean
}

export function ImageCropDialog({
  imageUrl,
  onComplete,
  onCancel,
  aspectRatio: initialAspectRatio = 16 / 9,
  showAspectRatioSelector = true
}: ImageCropDialogProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [aspectRatio, setAspectRatio] = useState(initialAspectRatio)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const createCroppedImage = async () => {
    if (!croppedAreaPixels) return

    setIsProcessing(true)
    try {
      const image = await loadImage(imageUrl)
      const croppedBlob = await getCroppedImg(image, croppedAreaPixels)
      onComplete(croppedBlob)
    } catch (error) {
      console.error("Error cropping image:", error)
      alert("Failed to crop image")
    } finally {
      setIsProcessing(false)
    }
  }

  const aspectRatioPresets = [
    { label: '16:9', value: 16 / 9, icon: '▭', description: 'Landscape' },
    { label: '1:1', value: 1, icon: '▢', description: 'Square' },
    { label: '9:16', value: 9 / 16, icon: '▯', description: 'Portrait' },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
      <div className="relative w-full max-w-4xl bg-white border-4 border-outer-space p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-2xl font-sans font-bold text-outer-space">Crop & Adjust Image</h3>
          <button
            onClick={onCancel}
            className="text-feldgrau transition hover:text-outer-space"
            disabled={isProcessing}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Aspect Ratio Selector */}
        {showAspectRatioSelector && (
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-outer-space">Aspect Ratio</label>
            <div className="flex gap-2">
              {aspectRatioPresets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setAspectRatio(preset.value)}
                  className={`flex-1 px-4 py-3 font-semibold text-sm transition-colors ${
                    Math.abs(aspectRatio - preset.value) < 0.01
                      ? 'bg-mint-green0 text-outer-space'
                      : 'bg-feldgrau text-white hover:bg-slate-700'
                  }`}
                  disabled={isProcessing}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-2xl">{preset.icon}</span>
                    <span>{preset.label}</span>
                    <span className="text-xs opacity-75">{preset.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="relative h-96 w-full bg-slate-900 border-2 border-outer-space">
          <Cropper
            image={imageUrl}
            crop={crop}
            zoom={zoom}
            aspect={aspectRatio}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        <div className="mt-4 space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-bold text-outer-space">
                Zoom
              </label>
              <span className="text-sm font-bold text-jungle-green">{Math.round(zoom * 100)}%</span>
            </div>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full h-2 bg-mint-green appearance-none cursor-pointer accent-amber-500"
              disabled={isProcessing}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t-2 border-mint-green">
            <button
              onClick={onCancel}
              disabled={isProcessing}
              className="bg-mint-green hover:bg-slate-300 text-outer-space px-6 py-3 font-semibold transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={createCroppedImage}
              disabled={isProcessing}
              className="bg-mint-green0 hover:bg-jungle-green text-outer-space px-8 py-3 font-semibold transition-colors disabled:opacity-50"
            >
              {isProcessing ? "Processing..." : "Apply Crop"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper function to load image
function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener("load", () => resolve(image))
    image.addEventListener("error", (error) => reject(error))
    image.src = url
  })
}

// Helper function to crop image
async function getCroppedImg(
  image: HTMLImageElement,
  croppedAreaPixels: Area
): Promise<Blob> {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  if (!ctx) {
    throw new Error("Failed to get canvas context")
  }

  canvas.width = croppedAreaPixels.width
  canvas.height = croppedAreaPixels.height

  ctx.drawImage(
    image,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    0,
    0,
    croppedAreaPixels.width,
    croppedAreaPixels.height
  )

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob)
      } else {
        reject(new Error("Failed to create blob"))
      }
    }, "image/jpeg", 0.95)
  })
}
