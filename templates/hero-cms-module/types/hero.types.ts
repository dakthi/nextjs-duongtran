// Hero CMS Module Types

export interface HeroSettings {
  hero_title?: string
  hero_subtitle?: string
  hero_description?: string
  hero_background_image?: string
  hero_cta_button_text?: string
  hero_cta_button_link?: string
  hero_secondary_button_text?: string
  hero_secondary_button_link?: string
  residents_served?: string
  weekly_programs?: string
  opening_hours_text?: string
  main_hall_capacity?: string
  [key: string]: any
}

export interface HeroField {
  key: string
  label: string
  type: 'text' | 'textarea' | 'url' | 'image' | 'number'
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
  [key: string]: string | File | null
}

export interface HeroPreviewData {
  title: string
  subtitle: string
  description?: string
  backgroundImage?: string
  primaryButton?: {
    text: string
    link: string
  }
  secondaryButton?: {
    text: string
    link: string
  }
  stats?: {
    residentsServed: string
    weeklyPrograms: string
    openingHours: string
    mainHallCapacity: string
  }
}

export interface HeroApiResponse {
  success: boolean
  message?: string
  data?: HeroSettings
  error?: string
}

export interface SiteSetting {
  id?: number
  key: string
  value: string | null
  type: string
  description?: string | null
  updatedAt?: Date
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