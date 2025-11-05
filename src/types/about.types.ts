export interface AboutSection {
  id: string
  title?: string | null
  image?: string | null
  imagePosition?: 'left' | 'right'
  body: string[]
}

export interface AboutContentRecord {
  id: string
  locale: string
  slug: string
  headline: string | null
  intro: string | null
  sections: AboutSection[]
  contentJson?: any | null
  contentHtml?: string | null
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface AboutContentInput {
  id?: string
  locale?: string
  slug?: string
  headline?: string | null
  intro?: string | null
  sections: AboutSection[]
  contentJson?: any | null
  contentHtml?: string | null
  isActive?: boolean
}

export interface AboutValidationErrors {
  [field: string]: string
}
