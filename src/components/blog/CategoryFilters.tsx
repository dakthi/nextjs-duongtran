'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

interface CategoryFiltersProps {
  categories: string[]
  selectedCategories: string[]
  locale: string
}

export function CategoryFilters({ categories, selectedCategories, locale }: CategoryFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selected, setSelected] = useState<string[]>(selectedCategories)

  const handleCheckboxChange = (category: string, checked: boolean) => {
    const newSelected = checked
      ? [...selected, category]
      : selected.filter(c => c !== category)

    setSelected(newSelected)

    // Build new URL with updated filters
    const params = new URLSearchParams(searchParams)
    params.delete('category')
    newSelected.forEach(cat => params.append('category', cat))
    params.delete('page') // Reset to page 1 when filtering

    const query = params.toString()
    router.push(`/${locale}/blog${query ? '?' + query : ''}`, { scroll: false })
  }

  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <label
          key={category}
          className="flex items-center py-2 text-sm font-medium cursor-pointer hover:text-accent transition-colors"
        >
          <input
            type="checkbox"
            value={category}
            checked={selected.includes(category)}
            onChange={(e) => handleCheckboxChange(category, e.target.checked)}
            className="mr-3 w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent focus:ring-2"
          />
          <span className={selected.includes(category) ? 'text-accent font-semibold' : 'text-fg'}>
            {category}
          </span>
        </label>
      ))}
    </div>
  )
}
