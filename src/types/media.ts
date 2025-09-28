export interface MediaLibraryItem {
  id: string
  filename: string
  originalName: string
  mimeType: string
  size: number
  url: string
  alt: string | null
  caption: string | null
  createdAt: string
  updatedAt: string
}

export interface MediaApiResponse {
  success: boolean
  data?: MediaLibraryItem | MediaLibraryItem[] | null
  error?: string
}
