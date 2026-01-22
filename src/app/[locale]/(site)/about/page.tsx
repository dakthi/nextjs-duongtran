import { Container } from '@/components/Container'
import { AboutBody } from '@/components/AboutBody'
import { PostGallery } from '@/components/PostGallery'
import { Faq } from '@/components/Faq'
import { PageHeader } from '@/components/PageHeader'
import { getPostSummaries } from '@/lib/post'
import { getActiveAboutContent } from '@/lib/about-service'
import { generateMetadata as genMeta } from '@/lib/seo'
import { Metadata } from 'next'

// Force dynamic rendering to fetch fresh data from database
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  return genMeta({
    title: 'About',
    description: 'Learn about Duong Tran, ACCA Chartered Accountant helping SMEs and independent professionals with accounting, tax, and payroll services in London, UK.',
    locale: params.locale,
    path: '/about',
  })
}

function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}

interface AboutPageProps {
  params: {
    locale: string
  }
}

const pageHeaderTranslations = {
  en: {
    eyebrow: "About",
    title: "About Duong Tran",
    description: "ACCA-qualified accountant helping founders and small businesses with clarity, confidence, and practical support."
  },
  vi: {
    eyebrow: "Giới Thiệu",
    title: "Về Duong Tran",
    description: "Kế toán viên có chứng chỉ ACCA giúp các nhà sáng lập và doanh nghiệp nhỏ với sự rõ ràng, tự tin và hỗ trợ thực tế."
  }
}

export default async function AboutPage({ params }: AboutPageProps) {
  const [aboutContent, posts] = await Promise.all([
    getActiveAboutContent(params.locale),
    getPostSummaries(params.locale),
  ])

  const headings = [
    'Recent insights',
    'More articles',
    'Further reflections',
    'Latest updates',
    'New reads',
  ]

  const hasPosts = posts.length > 0
  const [featuredPost, ...rest] = hasPosts ? posts : []
  const topPosts = hasPosts ? rest.slice(0, 5) : []
  const chunked = hasPosts ? chunkArray(rest.slice(5), 6) : []

  // Get translations for the current locale
  const translations = pageHeaderTranslations[params.locale as keyof typeof pageHeaderTranslations]
    || pageHeaderTranslations.en

  return (
    <>
      <PageHeader
        eyebrow={translations.eyebrow}
        title={translations.title}
        description={translations.description}
      />

      <AboutBody
        sections={aboutContent?.sections}
        contentHtml={aboutContent?.contentHtml}
        contentJson={aboutContent?.contentJson}
        locale={params.locale}
      />

      {hasPosts && featuredPost && (
        <PostGallery
          featuredPost={featuredPost}
          topPosts={topPosts}
          chunkedPosts={chunked}
          headings={headings}
          locale={params.locale}
        />
      )}
    </>
  )
}
