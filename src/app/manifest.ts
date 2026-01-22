import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Duong Tran - Chartered Accountant',
    short_name: 'Duong Tran',
    description: 'Expert accounting, tax, and payroll services for SMEs and independent professionals in London, UK',
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
