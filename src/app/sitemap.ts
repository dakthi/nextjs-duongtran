import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/seo'
import { getPostSlugs } from '@/lib/post'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
    '/cv',
    '/quiz',
  ]

  const locales = ['en', 'vi']

  const sitemap: MetadataRoute.Sitemap = []

  // Add static pages
  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemap.push({
        url: `${siteConfig.url}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : route === '/blog' ? 'daily' : 'monthly',
        priority: route === '' ? 1.0 : route === '/services' ? 0.9 : route === '/blog' ? 0.8 : 0.7,
        alternates: {
          languages: {
            en: `${siteConfig.url}/en${route}`,
            vi: `${siteConfig.url}/vi${route}`,
          },
        },
      })
    })
  })

  // Add blog posts
  try {
    const slugs = await getPostSlugs()
    locales.forEach((locale) => {
      slugs.forEach((slug) => {
        sitemap.push({
          url: `${siteConfig.url}/${locale}/blog/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
          alternates: {
            languages: {
              en: `${siteConfig.url}/en/blog/${slug}`,
              vi: `${siteConfig.url}/vi/blog/${slug}`,
            },
          },
        })
      })
    })
  } catch (error) {
    console.error('Error fetching blog post slugs for sitemap:', error)
  }

  return sitemap
}
