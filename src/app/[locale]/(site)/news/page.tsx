'use client'

import { useState } from 'react'
import { Container } from '@/components/Container'
import { PageHeader } from '@/components/PageHeader'
import { RSSFeedGrid } from '@/components/rss/RSSFeedGrid'

const categories = [
  { id: 'all', label: 'All Sources', color: 'bg-outer-space' },
  { id: 'gov-hmrc', label: 'GOV.UK - HMRC', color: 'bg-jungle-green' },
  { id: 'bank-england', label: 'Bank of England', color: 'bg-feldgrau' },
  { id: 'icaew', label: 'ICAEW', color: 'bg-feldgrau' },
  { id: 'accountingweb', label: 'AccountingWEB', color: 'bg-feldgrau' },
  { id: 'ft-home', label: 'Financial Times', color: 'bg-outer-space' },
  { id: 'ft-companies', label: 'FT - Companies', color: 'bg-outer-space' },
  { id: 'ft-markets', label: 'FT - Markets', color: 'bg-outer-space' },
  { id: 'pearl-accountants', label: 'Pearl Accountants', color: 'bg-feldgrau' },
  { id: 'freeagent', label: 'FreeAgent', color: 'bg-feldgrau' },
  { id: 'tax-journal', label: 'Tax Journal', color: 'bg-jungle-green' }
]

export default function RSSFeedsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  return (
    <>
      <PageHeader
        eyebrow="Industry News"
        title="News & Updates"
        description="Stay up-to-date with the latest news from HMRC, Financial Times, ICAEW, and other trusted sources in finance, accounting, and tax."
      />

      <Container>
        {/* Category Filter */}
        <div className="mt-8 mb-8 pb-8">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider
                  border-2 transition-all duration-200
                  ${
                    selectedCategory === category.id
                      ? `${category.color} text-white border-outer-space shadow-brutalist`
                      : 'bg-white text-outer-space border-outer-space hover:shadow-brutalist-hover'
                  }
                `}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* RSS Feed Grid */}
        <RSSFeedGrid source={selectedCategory} />

        {/* Info Box */}
        <div className="mt-12 bg-mint-green border-l-4 border-jungle-green p-4 sm:p-6 md:p-8">
          <h3 className="text-xl sm:text-2xl font-sans font-bold text-outer-space mb-4">
            About These Feeds
          </h3>
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-outer-space mb-3">Sources Include:</h4>
              <ul className="space-y-2 text-sm sm:text-base text-feldgrau leading-relaxed">
                <li>• <strong>GOV.UK - HMRC</strong>: Official tax guidance and policy updates</li>
                <li>• <strong>Bank of England</strong>: Monetary policy and regulatory news</li>
                <li>• <strong>Financial Times</strong>: Global financial markets and business news</li>
                <li>• <strong>ICAEW</strong>: Professional accounting standards and updates</li>
              </ul>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-outer-space mb-3">Additional Resources:</h4>
              <ul className="space-y-2 text-sm sm:text-base text-feldgrau leading-relaxed">
                <li>• <strong>AccountingWEB</strong>: UK accounting news and resources</li>
                <li>• <strong>Tax Journal</strong>: In-depth tax analysis and commentary</li>
                <li>• <strong>FreeAgent</strong>: Tips for small businesses and freelancers</li>
                <li>• <strong>Pearl Accountants</strong>: Contractor and SME insights</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-jungle-green">
            <p className="text-xs sm:text-sm text-feldgrau">
              <strong>Note:</strong> This is a demonstration RSS feed reader displaying sample content.
              In production, these feeds would pull live data from the respective sources.
            </p>
          </div>
        </div>
      </Container>
    </>
  )
}
