/**
 * Media processing utilities for server-side operations
 * Handles file validation, processing, and optimization
 */

import sharp from 'sharp'
import path from 'path'

export interface ProcessingOptions {
  resize?: {
    width?: number
    height?: number
    fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside'
  }
  quality?: number
  format?: 'jpeg' | 'png' | 'webp'
  progressive?: boolean
}

/**
 * Process and optimize an image buffer
 */
export async function processImage(
  inputBuffer: Buffer,
  options: ProcessingOptions = {}
): Promise<{ buffer: Buffer; metadata: sharp.OutputInfo }> {
  let processor = sharp(inputBuffer)

  // Apply resize if specified
  if (options.resize) {
    processor = processor.resize({
      width: options.resize.width,
      height: options.resize.height,
      fit: options.resize.fit || 'cover',
      withoutEnlargement: true
    })
  }

  // Apply format conversion and quality settings
  if (options.format) {
    switch (options.format) {
      case 'jpeg':
        processor = processor.jpeg({
          quality: options.quality || 85,
          progressive: options.progressive !== false
        })
        break
      case 'png':
        processor = processor.png({
          quality: options.quality || 85,
          progressive: options.progressive !== false
        })
        break
      case 'webp':
        processor = processor.webp({
          quality: options.quality || 85
        })
        break
    }
  }

  // Process the image
  const { data: buffer, info: metadata } = await processor.toBuffer({ resolveWithObject: true })

  return { buffer, metadata }
}

/**
 * Generate multiple sizes of an image (thumbnails, etc.)
 */
export async function generateImageVariants(
  inputBuffer: Buffer,
  variants: Record<string, ProcessingOptions>
): Promise<Record<string, { buffer: Buffer; metadata: sharp.OutputInfo }>> {
  const results: Record<string, { buffer: Buffer; metadata: sharp.OutputInfo }> = {}

  for (const [name, options] of Object.entries(variants)) {
    results[name] = await processImage(inputBuffer, options)
  }

  return results
}

/**
 * Extract comprehensive image metadata
 */
export async function getImageMetadata(buffer: Buffer) {
  const metadata = await sharp(buffer).metadata()

  return {
    format: metadata.format,
    width: metadata.width,
    height: metadata.height,
    channels: metadata.channels,
    density: metadata.density,
    hasAlpha: metadata.hasAlpha,
    size: buffer.length,
    aspectRatio: metadata.width && metadata.height ? metadata.width / metadata.height : null
  }
}

/**
 * Validate image dimensions and file size constraints
 */
export interface ImageConstraints {
  maxWidth?: number
  maxHeight?: number
  minWidth?: number
  minHeight?: number
  maxFileSize?: number
  allowedFormats?: string[]
}

export async function validateImageConstraints(
  buffer: Buffer,
  constraints: ImageConstraints
): Promise<{ valid: boolean; errors: string[] }> {
  const errors: string[] = []

  try {
    const metadata = await sharp(buffer).metadata()

    // Check file size
    if (constraints.maxFileSize && buffer.length > constraints.maxFileSize) {
      errors.push(`File size (${Math.round(buffer.length / 1024)}KB) exceeds maximum (${Math.round(constraints.maxFileSize / 1024)}KB)`)
    }

    // Check format
    if (constraints.allowedFormats && !constraints.allowedFormats.includes(metadata.format || '')) {
      errors.push(`Format '${metadata.format}' not allowed. Allowed formats: ${constraints.allowedFormats.join(', ')}`)
    }

    // Check dimensions
    if (metadata.width && metadata.height) {
      if (constraints.maxWidth && metadata.width > constraints.maxWidth) {
        errors.push(`Width (${metadata.width}px) exceeds maximum (${constraints.maxWidth}px)`)
      }
      if (constraints.maxHeight && metadata.height > constraints.maxHeight) {
        errors.push(`Height (${metadata.height}px) exceeds maximum (${constraints.maxHeight}px)`)
      }
      if (constraints.minWidth && metadata.width < constraints.minWidth) {
        errors.push(`Width (${metadata.width}px) below minimum (${constraints.minWidth}px)`)
      }
      if (constraints.minHeight && metadata.height < constraints.minHeight) {
        errors.push(`Height (${metadata.height}px) below minimum (${constraints.minHeight}px)`)
      }
    }

    return {
      valid: errors.length === 0,
      errors
    }
  } catch (error) {
    return {
      valid: false,
      errors: ['Failed to process image: Invalid or corrupted file']
    }
  }
}

/**
 * Auto-optimize image based on file type and size
 */
export async function autoOptimizeImage(buffer: Buffer): Promise<Buffer> {
  const metadata = await sharp(buffer).metadata()

  let processor = sharp(buffer)

  // Auto-resize if image is very large
  if (metadata.width && metadata.width > 2048) {
    processor = processor.resize(2048, null, {
      withoutEnlargement: true,
      fit: 'inside'
    })
  }

  // Apply format-specific optimizations
  switch (metadata.format) {
    case 'jpeg':
      processor = processor.jpeg({
        quality: 85,
        progressive: true,
        mozjpeg: true
      })
      break
    case 'png':
      processor = processor.png({
        quality: 85,
        progressive: true
      })
      break
    case 'webp':
      processor = processor.webp({
        quality: 85
      })
      break
  }

  return processor.toBuffer()
}

/**
 * Generate a filename with format conversion
 */
export function generateOptimizedFilename(
  originalFilename: string,
  targetFormat?: 'jpeg' | 'png' | 'webp'
): string {
  const ext = path.extname(originalFilename)
  const name = path.basename(originalFilename, ext)

  if (targetFormat) {
    const formatExtensions = {
      jpeg: '.jpg',
      png: '.png',
      webp: '.webp'
    }
    return `${name}${formatExtensions[targetFormat]}`
  }

  return originalFilename
}

/**
 * Common image processing presets
 */
export const IMAGE_PRESETS = {
  thumbnail: {
    resize: { width: 200, height: 200, fit: 'cover' as const },
    quality: 80,
    format: 'webp' as const
  },
  small: {
    resize: { width: 400, fit: 'inside' as const },
    quality: 85,
    format: 'webp' as const
  },
  medium: {
    resize: { width: 800, fit: 'inside' as const },
    quality: 85,
    format: 'webp' as const
  },
  large: {
    resize: { width: 1200, fit: 'inside' as const },
    quality: 90
  },
  hero: {
    resize: { width: 1920, height: 1080, fit: 'cover' as const },
    quality: 90,
    progressive: true
  }
} as const