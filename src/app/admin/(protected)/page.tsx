'use client'

import Link from 'next/link'

const shortcuts = [
  { label: 'Hero Content', href: '/admin/hero' },
  { label: 'Blog Posts', href: '/admin/blog' },
  { label: 'About Page', href: '/admin/about' },
  { label: 'Testimonials', href: '/admin/testimonials' },
  { label: 'Media Library', href: '/admin/media' },
  { label: 'FAQ', href: '/admin/faq' },
]

export default function AdminDashboard() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 text-center">
      <div className="max-w-md space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-gray-400">LieuVo Admin</p>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Paused</h1>
        <p className="text-base text-gray-600">
          We&apos;re rebuilding this experience from scratch. Jump straight into the modules below to
          edit site content in the meantime.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {shortcuts.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50"
          >
            {item.label}
          </Link>
        ))}
      </div>

      <p className="text-xs uppercase tracking-[0.2em] text-gray-300">Coming Soon</p>
    </div>
  )
}
