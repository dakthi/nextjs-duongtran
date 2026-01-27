'use client'

import { usePathname } from 'next/navigation'

export function MobileOverlay() {
  const pathname = usePathname()

  // Don't show overlay on proposal page (it's responsive)
  if (pathname?.includes('/proposal')) {
    return null
  }

  return (
    <div className="md:hidden fixed inset-0 z-[9999] bg-slate-800 flex items-center justify-center p-6">
      <div className="text-center text-white">
        <div className="text-4xl mb-4">🖥️</div>
        <h2 className="text-xl font-bold mb-2">Desktop only</h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          This site is currently in development and is best viewed on a desktop or laptop.
        </p>
        <p className="text-slate-400 text-xs mt-4">
          Please visit on a larger screen.
        </p>
      </div>
    </div>
  )
}
