import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/services',
    '/blog',
    '/testimonials',
    '/faq',
    '/contact',
    '/terms',
    '/privacy',
  ]

  const locales = ['en', 'vi']

  const sitemap: MetadataRoute.Sitemap = []

  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemap.push({
        url: `${siteConfig.url}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : route === '/services' ? 0.9 : 0.8,
        alternates: {
          languages: {
            en: `${siteConfig.url}/en${route}`,
            vi: `${siteConfig.url}/vi${route}`,
          },
        },
      })
    })
  })

  return sitemap
}
