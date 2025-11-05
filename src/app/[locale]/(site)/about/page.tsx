import { Container } from '@/components/Container'
import { AboutBody } from '@/components/AboutBody'
import { PostGallery } from '@/components/PostGallery'
import { Faq } from '@/components/Faq'
import { getPostSummaries } from '@/lib/post'
import { getActiveAboutContent } from '@/lib/about-service'

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

  return (
    <>
      <AboutBody
        headline={aboutContent?.headline}
        intro={aboutContent?.intro}
        sections={aboutContent?.sections}
        contentHtml={aboutContent?.contentHtml}
        contentJson={aboutContent?.contentJson}
        locale={params.locale}
      />

      {hasPosts && featuredPost && (
        <div className="pt-12 pb-20 bg-white">
          <Container>
            <PostGallery
              featuredPost={featuredPost}
              topPosts={topPosts}
              chunkedPosts={chunked}
              headings={headings}
            />
          </Container>
        </div>
      )}
    </>
  )
}
