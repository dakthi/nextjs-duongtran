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
    getPostSummaries(),
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
    <Container>
      <AboutBody
        headline={aboutContent?.headline}
        intro={aboutContent?.intro}
        sections={aboutContent?.sections}
      />

      {hasPosts && featuredPost && (
        <div className="mt-16">
          <PostGallery
            featuredPost={featuredPost}
            topPosts={topPosts}
            chunkedPosts={chunked}
            headings={headings}
          />
        </div>
      )}

      <div className="mt-16">
        <Faq />
      </div>
    </Container>
  )
}
