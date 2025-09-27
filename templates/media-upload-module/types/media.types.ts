/**
 * Shared TypeScript interfaces for Media Upload Module
 * Use these types across both frontend and backend
 */

// Core MediaItem interface matching the database model
export interface MediaItem {
  id: number
  filename: string
  originalName: string
  filePath: string
  fileType: string
  fileSize: number | null
  altText: string | null
  caption: string | null
  uploadedAt: string // ISO string format
  updatedAt?: string // ISO string format
}

// Interface for creating new media items (without auto-generated fields)
export interface CreateMediaItem {
  filename: string
  originalName: string
  filePath: string
  fileType: string
  fileSize: number
  altText?: string | null
  caption?: string | null
}

// Interface for updating media item metadata
export interface UpdateMediaItem {
  altText?: string | null
  caption?: string | null
}

// File upload component props
export interface FileUploadProps {
  onFileSelect: (file: MediaItem) => void
  currentImage?: string | null
  label?: string
  accept?: string
  showMediaLibrary?: boolean
  maxFileSize?: number // in bytes
  allowedTypes?: string[]
}

// Image validation result
export interface ImageValidationResult {
  isValid: boolean
  error?: string
  dimensions?: { width: number; height: number }
  size?: number
}

// Storage configuration status
export interface StorageStatus {
  storageType: 'r2' | 'local'
  isCloudStorage: boolean
  r2?: {
    accountId: string
    bucketName: string
    region: string
    publicUrl?: string
  } | null
  local?: {
    uploadPath: string
    note: string
  } | null
}

// API Response types
export interface MediaApiResponse {
  data?: MediaItem | MediaItem[]
  error?: string
  message?: string
}

export interface UploadResponse extends MediaItem {
  // Additional fields that might be returned on upload
  uploadedAt: string
}

export interface DeleteResponse {
  success: boolean
  message?: string
}

// Rate limiting response
export interface RateLimitResponse {
  error: string
  resetTime: string
  remaining: number
}

// Error response interface
export interface ApiError {
  error: string
  status?: number
  details?: any
}

// File processing options (for advanced usage)
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

// Image metadata interface
export interface ImageMetadata {
  name: string
  size: number
  type: string
  dimensions?: { width: number; height: number }
  lastModified: Date
  aspectRatio?: number
}

// Predefined image sizes for responsive images
export interface ImageSizes {
  thumbnail: { width: number; height: number }
  small: { width: number; height: number }
  medium: { width: number; height: number }
  large: { width: number; height: number }
  hero: { width: number; height: number }
}

// Upload progress tracking
export interface UploadProgress {
  loaded: number
  total: number
  percentage: number
  stage: 'preparing' | 'uploading' | 'processing' | 'complete' | 'error'
}

// Media library filter/search options
export interface MediaLibraryFilters {
  fileType?: string
  dateRange?: {
    start: Date
    end: Date
  }
  search?: string
  sortBy?: 'uploadedAt' | 'originalName' | 'fileSize'
  sortOrder?: 'asc' | 'desc'
  limit?: number
  offset?: number
}

// Bulk operations interface
export interface BulkMediaOperation {
  action: 'delete' | 'updateMetadata'
  mediaIds: number[]
  metadata?: UpdateMediaItem // For bulk metadata updates
}

export interface BulkOperationResponse {
  success: boolean
  processed: number
  failed: number
  errors?: string[]
}

// Configuration interface for the media upload module
export interface MediaUploadConfig {
  maxFileSize: number
  allowedTypes: string[]
  uploadPath?: string
  enableR2: boolean
  enableProcessing: boolean
  generateThumbnails: boolean
  thumbnailSizes?: number[]
  enableMetadataExtraction: boolean
  rateLimitConfig?: {
    maxUploads: number
    windowMs: number
  }
}