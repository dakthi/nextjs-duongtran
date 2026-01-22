import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Duong Tran - Life Coach & Student Mentor',
    short_name: 'Duong Tran',
    description: 'Empowering students and young professionals with personalized mentoring, university guidance, and career coaching',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2C5F2D',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
