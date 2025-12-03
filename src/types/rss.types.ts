export interface RSSFeed {
  id: string
  name: string
  url: string
  category: 'tax' | 'accounting' | 'finance' | 'regulation'
  description: string
}

export interface RSSItem {
  title: string
  link: string
  description: string
  pubDate: string
  source: string
  category: string
}

export const FAMOUS_RSS_FEEDS: RSSFeed[] = [
  // HMRC & Government
  {
    id: 'gov-hmrc',
    name: 'GOV.UK - HMRC',
    url: 'https://www.gov.uk/government/organisations/hm-revenue-customs.atom',
    category: 'tax',
    description: 'Official HMRC updates, guidance and policy changes'
  },
  {
    id: 'bank-england',
    name: 'Bank of England',
    url: 'https://www.bankofengland.co.uk/news.rss',
    category: 'regulation',
    description: 'Latest news and publications from the Bank of England'
  },

  // Professional Bodies
  {
    id: 'icaew',
    name: 'ICAEW',
    url: 'https://www.icaew.com/rss',
    category: 'accounting',
    description: 'Institute of Chartered Accountants in England and Wales updates'
  },
  {
    id: 'accountingweb',
    name: 'AccountingWEB',
    url: 'https://www.accountingweb.co.uk/rss',
    category: 'accounting',
    description: 'UK accounting news, articles and resources'
  },

  // Finance News
  {
    id: 'ft-home',
    name: 'Financial Times',
    url: 'https://www.ft.com/rss/home',
    category: 'finance',
    description: 'Global financial news and analysis'
  },
  {
    id: 'ft-companies',
    name: 'FT - Companies',
    url: 'https://www.ft.com/companies?format=rss',
    category: 'finance',
    description: 'Company news from the world\'s largest businesses'
  },
  {
    id: 'ft-markets',
    name: 'FT - Markets',
    url: 'https://www.ft.com/markets?format=rss',
    category: 'finance',
    description: 'Financial markets news and data'
  },

  // Accounting Firms & Resources
  {
    id: 'pearl-accountants',
    name: 'Pearl Accountants',
    url: 'https://pearlaccountants.com/feed',
    category: 'accounting',
    description: 'Insights for small businesses, contractors and freelancers'
  },
  {
    id: 'freeagent',
    name: 'FreeAgent',
    url: 'https://www.freeagent.com/blog/feed.rss',
    category: 'accounting',
    description: 'Accounting tips for small businesses and freelancers'
  },
  {
    id: 'tax-journal',
    name: 'Tax Journal',
    url: 'https://www.taxjournal.com/rss',
    category: 'tax',
    description: 'UK tax news, analysis and commentary'
  }
]
