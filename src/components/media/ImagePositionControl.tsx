'use client'

import { useState, useEffect, useRef } from 'react'

export interface ImageControlSettings {
  position: string // CSS object-position value
  zoom: number // Percentage (100 = normal)
  fit: 'cover' | 'contain' | 'fill' // Display mode
  aspectRatio?: number // Aspect ratio of the container
}

interface ImagePositionControlProps {
  imageUrl?: string
  value: ImageControlSettings
  onChange: (settings: ImageControlSettings) => void
  label?: string
  containerAspectRatio?: number // Width/height ratio of the container (e.g., 16/9)
  showAspectRatioSelector?: boolean // Show aspect ratio selector buttons
}

export function ImagePositionControl({
  imageUrl,
  value,
  onChange,
  label = 'Image Settings',
  containerAspectRatio,
  showAspectRatioSelector = true,
}: ImagePositionControlProps) {
  const [position, setPosition] = useState(value.position)
  const [zoom, setZoom] = useState(value.zoom)
  const [fit, setFit] = useState(value.fit)
  const [aspectRatio, setAspectRatio] = useState(value.aspectRatio || containerAspectRatio)
  const [isDragging, setIsDragging] = useState(false)
  const [imageNaturalSize, setImageNaturalSize] = useState<{ width: number; height: number } | null>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  // Update local state when value prop changes
  useEffect(() => {
    setPosition(value.position)
    setZoom(value.zoom)
    setFit(value.fit)
    if (value.aspectRatio) {
      setAspectRatio(value.aspectRatio)
    }
  }, [value])

  const handlePositionChange = (newPosition: string) => {
    setPosition(newPosition)
    onChange({ position: newPosition, zoom, fit, aspectRatio })
  }

  const handleZoomChange = (newZoom: number) => {
    setZoom(newZoom)
    onChange({ position, zoom: newZoom, fit, aspectRatio })
  }

  const handleFitChange = (newFit: 'cover' | 'contain' | 'fill') => {
    setFit(newFit)
    onChange({ position, zoom, fit: newFit, aspectRatio })
  }

  const handleAspectRatioChange = (newAspectRatio: number) => {
    setAspectRatio(newAspectRatio)
    onChange({ position, zoom, fit, aspectRatio: newAspectRatio })
  }

  const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !previewRef.current) return

    const rect = previewRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    const clampedX = Math.max(0, Math.min(100, x))
    const clampedY = Math.max(0, Math.min(100, y))

    const newPosition = `${clampedX.toFixed(1)}% ${clampedY.toFixed(1)}%`
    handlePositionChange(newPosition)
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true)
    handleDrag(e)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      handleDrag(e)
    }
  }

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false)
    window.addEventListener('mouseup', handleGlobalMouseUp)
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp)
  }, [])

  // Load image to get natural dimensions
  useEffect(() => {
    if (!imageUrl) return

    const img = new Image()
    img.onload = () => {
      setImageNaturalSize({ width: img.width, height: img.height })
      // If no containerAspectRatio provided, use image's natural aspect ratio
      if (!containerAspectRatio && !value.aspectRatio) {
        const naturalAspectRatio = img.width / img.height
        setAspectRatio(naturalAspectRatio)
      }
    }
    img.src = imageUrl
  }, [imageUrl, containerAspectRatio, value.aspectRatio])

  const positionPresets = [
    { label: 'Top Left', value: 'top left' },
    { label: 'Top Center', value: 'top' },
    { label: 'Top Right', value: 'top right' },
    { label: 'Center Left', value: 'left' },
    { label: 'Center', value: 'center' },
    { label: 'Center Right', value: 'right' },
    { label: 'Bottom Left', value: 'bottom left' },
    { label: 'Bottom Center', value: 'bottom' },
    { label: 'Bottom Right', value: 'bottom right' },
  ]

  const aspectRatioPresets = [
    { label: '16:9', value: 16 / 9, icon: '▭' },
    { label: '1:1', value: 1, icon: '▢' },
    { label: '9:16', value: 9 / 16, icon: '▯' },
  ]

  return (
    <div className="space-y-3">
      <label className="block text-sm font-bold text-outer-space">
        {label}
      </label>

      {/* Aspect Ratio Selector */}
      {showAspectRatioSelector && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-feldgrau">Aspect Ratio</label>
          <div className="flex gap-2">
            {aspectRatioPresets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => handleAspectRatioChange(preset.value)}
                className={`flex-1 px-4 py-2 font-semibold text-sm transition-colors ${
                  aspectRatio && Math.abs(aspectRatio - preset.value) < 0.01
                    ? 'bg-mint-green0 text-outer-space'
                    : 'bg-feldgrau text-white hover:bg-slate-700'
                }`}
              >
                <span className="mr-2">{preset.icon}</span>
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Image Preview - Draggable */}
      {imageUrl && (
        <div className="relative bg-mint-green overflow-hidden border-2 border-outer-space">
          <div
            ref={previewRef}
            className="relative cursor-move select-none"
            style={{
              aspectRatio: aspectRatio ? `${aspectRatio}` : 'auto',
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
          >
            <img
              src={imageUrl}
              alt="Preview"
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{
                objectFit: fit,
                objectPosition: position,
                transform: `scale(${zoom / 100})`,
              }}
              draggable={false}
            />
          </div>
          <div className="absolute top-2 left-2 bg-mint-green0 text-outer-space text-xs font-bold px-3 py-1">
            Drag to position
          </div>
        </div>
      )}

      {/* Fit Mode Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-feldgrau">Display Mode</label>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleFitChange('cover')}
            className={`px-4 py-3 font-semibold text-sm transition-colors ${
              fit === 'cover'
                ? 'bg-mint-green0 text-outer-space'
                : 'bg-feldgrau text-white hover:bg-slate-700'
            }`}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-lg">⬛</span>
              <span>Cover</span>
              <span className="text-xs opacity-75">Fill frame</span>
            </div>
          </button>
          <button
            type="button"
            onClick={() => handleFitChange('contain')}
            className={`px-4 py-3 font-semibold text-sm transition-colors ${
              fit === 'contain'
                ? 'bg-mint-green0 text-outer-space'
                : 'bg-feldgrau text-white hover:bg-slate-700'
            }`}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-lg">▫️</span>
              <span>Contain</span>
              <span className="text-xs opacity-75">Show all</span>
            </div>
          </button>
          <button
            type="button"
            onClick={() => handleFitChange('fill')}
            className={`px-4 py-3 font-semibold text-sm transition-colors ${
              fit === 'fill'
                ? 'bg-mint-green0 text-outer-space'
                : 'bg-feldgrau text-white hover:bg-slate-700'
            }`}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-lg">◼️</span>
              <span>Fill</span>
              <span className="text-xs opacity-75">Stretch</span>
            </div>
          </button>
        </div>
      </div>

      {/* Zoom Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-feldgrau">
            Zoom
          </label>
          <span className="text-sm font-bold text-jungle-green">{zoom}%</span>
        </div>
        <input
          type="range"
          min="50"
          max="200"
          step="5"
          value={zoom}
          onChange={(e) => handleZoomChange(Number(e.target.value))}
          className="w-full h-2 bg-mint-green appearance-none cursor-pointer accent-amber-500"
        />
      </div>
    </div>
  )
}
