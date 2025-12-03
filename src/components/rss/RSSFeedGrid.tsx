'use client'

import { useState, useEffect } from 'react'
import { RSSFeedCard } from './RSSFeedCard'
import { RSSItem } from '@/types/rss.types'

interface RSSFeedGridProps {
  source?: string
}

export function RSSFeedGrid({ source }: RSSFeedGridProps) {
  const [items, setItems] = useState<RSSItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeeds = async () => {
      setLoading(true)
      setError(null)

      try {
        const params = new URLSearchParams()
        if (source) params.append('source', source)

        const response = await fetch(`/api/rss?${params}`)

        if (!response.ok) {
          throw new Error('Failed to fetch RSS feeds')
        }

        const data = await response.json()
        setItems(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchFeeds()
  }, [source])

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="border-2 border-outer-space bg-white p-6 animate-pulse"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="h-6 w-20 bg-mint-green"></div>
              <div className="h-4 w-32 bg-mint-green"></div>
            </div>
            <div className="h-6 bg-mint-green mb-3 w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-mint-green"></div>
              <div className="h-4 bg-mint-green"></div>
              <div className="h-4 bg-mint-green w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="border-2 border-red-700 bg-red-50 p-8 text-center">
        <h3 className="text-xl font-bold text-red-800 mb-2">
          Failed to Load RSS Feeds
        </h3>
        <p className="text-red-700">{error}</p>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="border-2 border-outer-space bg-mint-green p-8 text-center">
        <h3 className="text-xl font-bold text-outer-space mb-2">
          No RSS Items Found
        </h3>
        <p className="text-feldgrau">
          Try selecting a different category or check back later.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <RSSFeedCard key={`${item.link}-${index}`} item={item} />
      ))}
    </div>
  )
}
