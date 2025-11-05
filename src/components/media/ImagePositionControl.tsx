'use client'

import { useState, useEffect, useRef } from 'react'

export interface ImageControlSettings {
  position: string // CSS object-position value
  zoom: number // Percentage (100 = normal)
  fit: 'cover' | 'contain' | 'fill' // Display mode
}

interface ImagePositionControlProps {
  imageUrl?: string
  value: ImageControlSettings
  onChange: (settings: ImageControlSettings) => void
  label?: string
  containerAspectRatio?: number // Width/height ratio of the container (e.g., 16/9)
}

export function ImagePositionControl({
  imageUrl,
  value,
  onChange,
  label = 'Image Settings',
  containerAspectRatio = 16 / 9,
}: ImagePositionControlProps) {
  const [position, setPosition] = useState(value.position)
  const [zoom, setZoom] = useState(value.zoom)
  const [fit, setFit] = useState(value.fit)
  const [isDragging, setIsDragging] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)

  // Update local state when value prop changes
  useEffect(() => {
    setPosition(value.position)
    setZoom(value.zoom)
    setFit(value.fit)
  }, [value])

  const handlePositionChange = (newPosition: string) => {
    setPosition(newPosition)
    onChange({ position: newPosition, zoom, fit })
  }

  const handleZoomChange = (newZoom: number) => {
    setZoom(newZoom)
    onChange({ position, zoom: newZoom, fit })
  }

  const handleFitChange = (newFit: 'cover' | 'contain' | 'fill') => {
    setFit(newFit)
    onChange({ position, zoom, fit: newFit })
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

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      {/* Image Preview - Draggable */}
      {imageUrl && (
        <div className="relative bg-gray-200 rounded overflow-hidden border-2 border-gray-300">
          <div
            ref={previewRef}
            className="relative cursor-move select-none"
            style={{
              aspectRatio: `${containerAspectRatio}`,
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
          <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
            Drag to position
          </div>
        </div>
      )}

      {/* Zoom Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-gray-700">
            Zoom
          </label>
          <span className="text-sm text-blue-600">{zoom}%</span>
        </div>
        <input
          type="range"
          min="50"
          max="200"
          step="5"
          value={zoom}
          onChange={(e) => handleZoomChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>
    </div>
  )
}
