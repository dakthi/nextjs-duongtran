/**
 * Client-side image helpers used by the media library.
 */

export interface ImageValidationResult {
  isValid: boolean
  error?: string
  dimensions?: { width: number; height: number }
  size?: number
}

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
]

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export function validateImageFile(file: File): ImageValidationResult {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: "Invalid file type. Allowed: JPG, PNG, GIF, WebP, SVG",
    }
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: "File size too large. Maximum 5MB allowed.",
    }
  }

  return {
    isValid: true,
    size: file.size,
  }
}

export function formatFileSize(bytes: number | null): string {
  if (!bytes) return "Unknown"

  const units = ["Bytes", "KB", "MB", "GB"]
  const index = Math.floor(Math.log(bytes) / Math.log(1024))

  return `${Math.round((bytes / Math.pow(1024, index)) * 100) / 100} ${units[index]}`
}

export function extractImageMetadata(file: File): Promise<{
  name: string
  size: number
  type: string
  dimensions?: { width: number; height: number }
  lastModified: Date
}> {
  const metadata = {
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: new Date(file.lastModified),
  }

  return new Promise((resolve) => {
    const image = new Image()
    const objectUrl = URL.createObjectURL(file)

    image.onload = () => {
      URL.revokeObjectURL(objectUrl)
      resolve({ ...metadata, dimensions: { width: image.width, height: image.height } })
    }

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      resolve(metadata)
    }

    image.src = objectUrl
  })
}
