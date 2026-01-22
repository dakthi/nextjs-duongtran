import { Metadata } from 'next'

export const siteConfig = {
  name: 'Duong Tran',
  title: 'Duong Tran - Chartered Accountant for SMEs and Independent Professionals',
  description: 'Help SMEs owners and independent professionals to make sense and be on top of their tax. Expert accounting, tax, and payroll services in London, UK.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://duongtran.com',
  ogImage: '/og-image.jpg',
  links: {
    facebook: 'https://www.facebook.com/duongtrano',
    linkedin: 'https://www.linkedin.com/in/lieu-vo-acca-859421209/',
  },
  creator: 'Duong Tran',
  keywords: [
    'ACCA chartered accountant',
    'ACCA accountant London',
    'chartered accountant',
    'ACCA qualified accountant',
    'ACCA member',
    'chartered certified accountant',
    'ACCA accounting services',
    'ACCA accountant UK',
    'professional accountant ACCA',
    'accounting services',
    'SME accounting',
    'small business accountant',
    'tax services',
    'payroll services',
    'bookkeeping',
    'VAT returns',
    'London accountant',
    'UK accountant',
    'independent professional accounting',
    'startup accounting',
    'qualified accountant',
    'ACCA tax advisor',
    'chartered accountant London',
    'accountant for small business',
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
  '@type': 'AccountingService',
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}/img/lieu-barbican.jpg`,
  image: `${siteConfig.url}${siteConfig.ogImage}`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'London',
    addressCountry: 'GB',
  },
  sameAs: [siteConfig.links.facebook, siteConfig.links.linkedin],
  founder: {
    '@type': 'Person',
    name: 'Duong Tran',
    jobTitle: 'ACCA Accountant',
    sameAs: siteConfig.links.linkedin,
  },
  areaServed: {
    '@type': 'Country',
    name: 'United Kingdom',
  },
  serviceType: [
    'Accounting Services',
    'Tax Services',
    'Payroll Services',
    'Bookkeeping',
    'VAT Returns',
    'Financial Reporting',
  ],
}

// Structured data for Person
export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Duong Tran',
  jobTitle: 'Chartered Accountant (ACCA)',
  description:
    'ACCA Chartered Accountant specializing in helping SMEs and independent professionals with accounting, tax, and payroll services.',
  url: siteConfig.url,
  image: `${siteConfig.url}/img/lieu-barbican.jpg`,
  sameAs: [siteConfig.links.facebook, siteConfig.links.linkedin],
  knowsAbout: [
    'Accounting',
    'Taxation',
    'Payroll',
    'Bookkeeping',
    'VAT',
    'Financial Reporting',
    'Small Business Finance',
  ],
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'Professional Qualification',
    name: 'ACCA Chartered Accountant',
  },
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'BPP University',
    degree: 'MSc in Accounting and Finance',
  },
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
      jobTitle: 'Chartered Accountant (ACCA)',
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/img/lieu-barbican.jpg`,
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
