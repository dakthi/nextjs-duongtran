"use client"

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

interface LanguageSwitcherProps {
  currentLocale?: string
  onLocaleChange?: (locale: string) => void
  className?: string
}

export default function LanguageSwitcher({
  currentLocale,
  onLocaleChange,
  className = ""
}: LanguageSwitcherProps) {
  const pathname = usePathname()
  const router = useRouter()

  // Extract locale from pathname if not provided
  const detectedLocale = currentLocale || pathname.split('/')[1] || 'en'
  const [selectedLocale, setSelectedLocale] = useState(detectedLocale)

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'vi', label: 'Tiếng Việt' }
  ]

  const handleLocaleChange = (locale: string) => {
    setSelectedLocale(locale)

    // If onLocaleChange callback is provided, use it (for form switching)
    if (onLocaleChange) {
      onLocaleChange(locale)
    } else {
      // Otherwise, navigate to the new locale (for page switching)
      const segments = pathname.split('/')
      segments[1] = locale
      router.push(segments.join('/'))
    }
  }

  return (
    <div className={`flex bg-gray-100 rounded-lg p-1 ${className}`}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLocaleChange(lang.code)}
          className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-200 ${
            selectedLocale === lang.code
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {lang.code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}