'use client'

import { RSSItem } from '@/types/rss.types'
import { formatDistanceToNow } from 'date-fns'

interface RSSFeedCardProps {
  item: RSSItem
}

export function RSSFeedCard({ item }: RSSFeedCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'tax':
        return 'bg-jungle-green text-white'
      case 'accounting':
        return 'bg-feldgrau text-white'
      case 'finance':
        return 'bg-outer-space text-white'
      case 'regulation':
        return 'bg-mint-green text-feldgrau'
      default:
        return 'bg-neutral-200 text-neutral-800'
    }
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return formatDistanceToNow(date, { addSuffix: true })
    } catch {
      return 'Recently'
    }
  }

  return (
    <article className="border-2 border-outer-space bg-white p-4 sm:p-6 hover:shadow-brutalist-hover transition-shadow duration-200">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs font-semibold uppercase tracking-wider px-2 sm:px-3 py-1 ${getCategoryColor(item.category)}`}>
            {item.category}
          </span>
          <span className="text-xs font-medium text-feldgrau break-words">
            {item.source}
          </span>
        </div>
        <time className="text-xs text-feldgrau whitespace-nowrap">
          {formatDate(item.pubDate)}
        </time>
      </div>

      <h3 className="text-lg sm:text-xl font-sans font-bold text-outer-space mb-3 leading-tight hover:text-jungle-green transition-colors">
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {item.title}
        </a>
      </h3>

      {item.description && (
        <p
          className="text-sm sm:text-base text-feldgrau leading-relaxed line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: item.description.replace(/<[^>]*>/g, '')
          }}
        />
      )}

      <div className="mt-4 pt-4 border-t border-mint-green">
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-xs sm:text-sm font-semibold text-jungle-green hover:text-jungle-green-dark transition-colors"
        >
          Read more
          <svg
            className="ml-2 w-3 h-3 sm:w-4 sm:h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </article>
  )
}
