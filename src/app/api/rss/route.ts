import { NextRequest, NextResponse } from 'next/server'
import Parser from 'rss-parser'
import { FAMOUS_RSS_FEEDS, RSSItem } from '@/types/rss.types'

const parser = new Parser({
  timeout: 10000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; RSS Reader/1.0)',
  },
})

// Cache to avoid hammering RSS feeds
let cachedFeeds: { data: RSSItem[]; timestamp: number } | null = null
const CACHE_DURATION = 15 * 60 * 1000 // 15 minutes

async function fetchRSSFeed(feed: typeof FAMOUS_RSS_FEEDS[0]): Promise<RSSItem[]> {
  try {
    const rssFeed = await parser.parseURL(feed.url)

    return (rssFeed.items || []).slice(0, 10).map((item) => ({
      title: item.title || 'Untitled',
      link: item.link || feed.url,
      description: item.contentSnippet || item.content || item.description || '',
      pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
      source: feed.name,
      category: feed.category,
    }))
  } catch (error) {
    console.error(`Error fetching RSS feed from ${feed.name}:`, error)
    return []
  }
}

async function getAllRSSFeeds(): Promise<RSSItem[]> {
  // Check cache first
  if (cachedFeeds && Date.now() - cachedFeeds.timestamp < CACHE_DURATION) {
    console.log('[RSS] Returning cached feeds')
    return cachedFeeds.data
  }

  console.log('[RSS] Fetching fresh feeds from all sources...')

  // Fetch all feeds in parallel
  const feedPromises = FAMOUS_RSS_FEEDS.map(feed => fetchRSSFeed(feed))
  const feedResults = await Promise.allSettled(feedPromises)

  // Collect all successful results
  const allItems: RSSItem[] = []
  feedResults.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      allItems.push(...result.value)
      console.log(`[RSS] Fetched ${result.value.length} items from ${FAMOUS_RSS_FEEDS[index].name}`)
    } else {
      console.error(`[RSS] Failed to fetch ${FAMOUS_RSS_FEEDS[index].name}:`, result.reason)
    }
  })

  // Sort by date (most recent first)
  const sortedItems = allItems.sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  )

  // Update cache
  cachedFeeds = {
    data: sortedItems,
    timestamp: Date.now(),
  }

  console.log(`[RSS] Total items fetched: ${sortedItems.length}`)

  return sortedItems
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const source = searchParams.get('source')

    // Get all RSS feeds
    const allItems = await getAllRSSFeeds()

    // Filter by source if specified
    let filteredItems = allItems
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
        'tax-journal': 'Tax Journal',
      }

      const sourceName = sourceMap[source]
      if (sourceName) {
        filteredItems = allItems.filter(item => item.source === sourceName)
      }
    }

    return NextResponse.json(filteredItems)
  } catch (error) {
    console.error('[RSS] Error in GET handler:', error)
    return NextResponse.json(
      { error: 'Failed to fetch RSS feeds' },
      { status: 500 }
    )
  }
}

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const revalidate = 900 // Revalidate every 15 minutes
