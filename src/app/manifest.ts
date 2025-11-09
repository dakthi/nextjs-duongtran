import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Lieu Vo - Chartered Accountant',
    short_name: 'Lieu Vo',
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
