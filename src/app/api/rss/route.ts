import { NextRequest, NextResponse } from 'next/server'
import { FAMOUS_RSS_FEEDS, RSSItem } from '@/types/rss.types'

// Mock RSS data for demonstration (frontend-only implementation)
// In production, you would parse actual RSS feeds here
const MOCK_RSS_ITEMS: RSSItem[] = [
  {
    title: 'New Tax Changes for Small Businesses in 2025',
    link: 'https://www.gov.uk/government/organisations/hm-revenue-customs',
    description: 'HMRC announces significant tax reforms affecting small businesses and self-employed individuals. Key changes include updates to VAT thresholds and Making Tax Digital requirements.',
    pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: 'GOV.UK - HMRC',
    category: 'tax'
  },
  {
    title: 'Bank of England Holds Interest Rates at 5.25%',
    link: 'https://www.bankofengland.co.uk/news',
    description: 'The Monetary Policy Committee voted to maintain the Bank Rate at 5.25% as inflation continues to moderate. Economic outlook remains uncertain amid global headwinds.',
    pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    source: 'Bank of England',
    category: 'regulation'
  },
  {
    title: 'ICAEW Updates Ethical Standards for 2025',
    link: 'https://www.icaew.com/rss',
    description: 'New ethical guidelines for chartered accountants come into effect, emphasizing independence, objectivity, and professional competence in an evolving digital landscape.',
    pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    source: 'ICAEW',
    category: 'accounting'
  },
  {
    title: 'Global Markets React to Tech Sector Earnings',
    link: 'https://www.ft.com/markets',
    description: 'Major technology companies report mixed earnings, leading to volatility across global stock markets. Investors weigh AI investments against near-term profitability concerns.',
    pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    source: 'Financial Times',
    category: 'finance'
  },
  {
    title: 'Making Tax Digital: What Freelancers Need to Know',
    link: 'https://www.freeagent.com/blog',
    description: 'Complete guide to MTD requirements for self-employed professionals and freelancers. Learn about software compliance, record-keeping obligations, and key deadlines.',
    pubDate: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    source: 'FreeAgent',
    category: 'accounting'
  },
  {
    title: 'R&D Tax Credits: New Rules and Opportunities',
    link: 'https://www.accountingweb.co.uk',
    description: 'Government introduces enhanced R&D tax relief schemes for SMEs investing in innovation. Accountants highlight key claiming strategies and compliance requirements.',
    pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    source: 'AccountingWEB',
    category: 'tax'
  },
  {
    title: 'UK Company Formations Hit Record High',
    link: 'https://www.ft.com/companies',
    description: 'Companies House reports surge in new business registrations, driven by entrepreneurship and remote work trends. Experts discuss implications for the UK economy.',
    pubDate: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    source: 'FT - Companies',
    category: 'finance'
  },
  {
    title: 'Cloud Accounting Software: 2025 Market Review',
    link: 'https://pearlaccountants.com',
    description: 'Comprehensive analysis of leading cloud accounting platforms for contractors and small businesses. Compare features, pricing, and MTD compliance capabilities.',
    pubDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    source: 'Pearl Accountants',
    category: 'accounting'
  },
  {
    title: 'Corporation Tax Rate Changes for 2025/26',
    link: 'https://www.taxjournal.com',
    description: 'Detailed breakdown of upcoming corporation tax changes, including marginal relief calculations and planning opportunities for businesses with profits above £50,000.',
    pubDate: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    source: 'Tax Journal',
    category: 'tax'
  },
  {
    title: 'FCA Proposes New Rules for Financial Advisers',
    link: 'https://www.bankofengland.co.uk/news',
    description: 'Financial Conduct Authority launches consultation on enhanced consumer protection measures and adviser qualification requirements taking effect in 2026.',
    pubDate: new Date(Date.now() - 15 * 60 * 60 * 1000).toISOString(),
    source: 'Bank of England',
    category: 'regulation'
  },
  {
    title: 'Inflation Falls to 2.3% as Energy Prices Stabilize',
    link: 'https://www.ft.com/rss/home',
    description: 'UK inflation continues its downward trend as energy costs moderate and supply chain pressures ease. Bank of England signals potential for rate cuts in late 2025.',
    pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    source: 'Financial Times',
    category: 'finance'
  },
  {
    title: 'Pension Auto-Enrolment Thresholds Updated',
    link: 'https://www.gov.uk/government/organisations/hm-revenue-customs',
    description: 'HMRC announces new auto-enrolment earnings trigger and qualifying earnings band for 2025/26 tax year. Employers must update payroll systems accordingly.',
    pubDate: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    source: 'GOV.UK - HMRC',
    category: 'tax'
  }
]

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const source = searchParams.get('source')

    // Filter items by source if specified
    let filteredItems = MOCK_RSS_ITEMS
    if (source && source !== 'all') {
      // Map source ID to source name
      const sourceMap: Record<string, string> = {
        'gov-hmrc': 'GOV.UK - HMRC',
        'bank-england': 'Bank of England',
        'icaew': 'ICAEW',
        'accountingweb': 'AccountingWEB',
        'ft-home': 'Financial Times',
        'ft-companies': 'FT - Companies',
        'ft-markets': 'FT - Markets',
        'pearl-accountants': 'Pearl Accountants',
        'freeagent': 'FreeAgent',
        'tax-journal': 'Tax Journal'
      }

      const sourceName = sourceMap[source]
      if (sourceName) {
        filteredItems = MOCK_RSS_ITEMS.filter(item => item.source === sourceName)
      }
    }

    // Sort by date (most recent first)
    const sortedItems = [...filteredItems].sort(
      (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    )

    return NextResponse.json(sortedItems)
  } catch (error) {
    console.error('Error fetching RSS feeds:', error)
    return NextResponse.json(
      { error: 'Failed to fetch RSS feeds' },
      { status: 500 }
    )
  }
}
