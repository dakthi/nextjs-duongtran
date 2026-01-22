import { Metadata } from 'next'

export const siteConfig = {
  name: 'Duong Tran',
  title: 'Duong Tran - Life Coach & Student Mentor',
  description: 'Empowering students and young professionals to unlock their potential. Expert guidance on university applications, scholarships, career development, and personal growth.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://duongtran.com',
  ogImage: '/og-image.jpg',
  links: {
    facebook: 'https://www.facebook.com/duongtran110',
    linkedin: 'https://www.linkedin.com/in/duongtran110/',
  },
  creator: 'Duong Tran',
  keywords: [
    'life coach',
    'student mentor',
    'career guidance',
    'university application',
    'scholarship advisor',
    'personal development',
    'study abroad',
    'Vietnamese student mentor',
    'career coaching',
    'youth mentor',
    'education consultant',
    'student success coach',
    'motivation coach',
    'goal setting',
    'academic coaching',
    'university admissions',
    'scholarship application',
    'study skills',
    'career planning',
    'young professional coaching',
    'student guidance',
    'mentorship',
    'personal growth',
    'success coaching',
  ],
}

export function generateMetadata({
  title,
  description,
  image = siteConfig.ogImage,
  noIndex = false,
  locale = 'en',
  path = '',
}: {
  title?: string
  description?: string
  image?: string
  noIndex?: boolean
  locale?: string
  path?: string
}): Metadata {
  const url = `${siteConfig.url}/${locale}${path}`
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title

  return {
    title: pageTitle,
    description: description || siteConfig.description,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.creator }],
    creator: siteConfig.creator,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
      languages: {
        en: `${siteConfig.url}/en${path}`,
        vi: `${siteConfig.url}/vi${path}`,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: url,
      title: pageTitle,
      description: description || siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: description || siteConfig.description,
      images: [image],
      creator: '@duongtran',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

// Structured data for Organization
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}/img/duong-tran.jpg`,
  image: `${siteConfig.url}${siteConfig.ogImage}`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ho Chi Minh City',
    addressCountry: 'VN',
  },
  sameAs: [siteConfig.links.facebook, siteConfig.links.linkedin],
  founder: {
    '@type': 'Person',
    name: 'Duong Tran',
    jobTitle: 'Life Coach & Student Mentor',
    sameAs: siteConfig.links.linkedin,
  },
  areaServed: {
    '@type': 'Country',
    name: 'Vietnam',
  },
  serviceType: [
    'Life Coaching',
    'Student Mentoring',
    'University Application Guidance',
    'Scholarship Consulting',
    'Career Coaching',
    'Personal Development',
  ],
}

// Structured data for Person
export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Duong Tran',
  jobTitle: 'Life Coach & Student Mentor',
  description:
    'Life Coach and Student Mentor helping young people achieve their dreams through university application guidance, scholarship consulting, and personal development coaching.',
  url: siteConfig.url,
  image: `${siteConfig.url}/img/duong-tran.jpg`,
  sameAs: [siteConfig.links.facebook, siteConfig.links.linkedin],
  knowsAbout: [
    'Life Coaching',
    'Student Mentoring',
    'University Applications',
    'Scholarship Applications',
    'Career Development',
    'Personal Growth',
    'Goal Setting',
  ],
}

// Function to generate BlogPosting schema
export function generateBlogPostingSchema({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author = 'Duong Tran',
  category,
}: {
  title: string
  description: string
  url: string
  image?: string
  datePublished: string
  dateModified?: string
  author?: string
  category?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: image || `${siteConfig.url}${siteConfig.ogImage}`,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author,
      url: siteConfig.url,
      jobTitle: 'Life Coach & Student Mentor',
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/img/duong-tran.jpg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    articleSection: category,
  }
}

// Function to generate FAQPage schema
export function generateFAQPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// Function to generate BreadcrumbList schema
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
