export interface TestimonialRecord {
  id: string
  name: string
  role: string | null
  relationship: string | null
  dateLabel: string | null
  content: string
  image: string | null
  imagePosition: string | null
  imageZoom: number | null
  imageFit: string | null
  order: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface TestimonialInput {
  id?: string
  name: string
  role?: string | null
  relationship?: string | null
  dateLabel?: string | null
  content: string
  image?: string | null
  imagePosition?: string | null
  imageZoom?: number | null
  imageFit?: string | null
  order?: number
  isActive?: boolean
}

export interface TestimonialView extends TestimonialRecord {
  paragraphs: string[]
}

export interface TestimonialValidationErrors {
  [field: string]: string
}
