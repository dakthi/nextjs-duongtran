// Hero CMS Types adapted for existing HeroContent model

export interface HeroData {
  id?: string
  title: string
  subtitle?: string | null
  description?: string | null
  ctaText?: string | null
  ctaLink?: string | null
  image?: string | null
  imagePosition?: string | null
  imageZoom?: number | null
  imageFit?: string | null
  isActive?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface HeroField {
  key: string
  label: string
  type: 'text' | 'textarea' | 'url' | 'image'
  placeholder?: string
  description?: string
  required?: boolean
  maxLength?: number
  validation?: (value: string) => string | null
}

export interface HeroFieldGroup {
  title: string
  description?: string
  fields: HeroField[]
}

export interface HeroFormData {
  [key: string]: string | File | null | boolean | number | Date | undefined
}

export interface HeroPreviewData {
  title: string
  subtitle?: string
  description?: string
  image?: string
  imagePosition?: string
  imageZoom?: number
  imageFit?: string
  ctaText?: string
  ctaLink?: string
}

export interface HeroApiResponse {
  success: boolean
  message?: string
  data?: HeroData | null
  error?: string
  errors?: Record<string, string>
}

// Form validation schema
export interface HeroValidationSchema {
  [key: string]: {
    required?: boolean
    minLength?: number
    maxLength?: number
    pattern?: RegExp
    custom?: (value: string) => string | null
  }
}

// Editor state management
export interface HeroEditorState {
  isLoading: boolean
  isSaving: boolean
  hasUnsavedChanges: boolean
  lastSaved?: Date
  errors: Record<string, string>
  previewMode: boolean
}

// Image upload interface
export interface HeroImageUpload {
  file: File
  preview: string
  uploading: boolean
  uploaded?: boolean
  url?: string
  error?: string
}
