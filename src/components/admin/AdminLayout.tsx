"use client"

import { useEffect, useState } from "react"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface AdminLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: "Dashboard", href: "/admin" },
  { name: "Hero", href: "/admin/hero" },
  { name: "Blog", href: "/admin/blog" },
  { name: "About", href: "/admin/about" },
  { name: "Testimonials", href: "/admin/testimonials" },
  { name: "Media", href: "/admin/media" },
  { name: "FAQ", href: "/admin/faq" },
]

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  const renderNavItems = () => (
    navigation.map((item) => {
      const isActive = pathname === item.href
      return (
        <Link
          key={item.name}
          href={item.href}
          className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
            isActive
              ? "bg-gray-900 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }`}
        >
          {item.name}
        </Link>
      )
    })
  )

  const renderUserPanel = () => (
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="text-sm font-medium text-white">
          {session?.user?.name || session?.user?.email}
        </p>
        <p className="text-xs text-gray-300 capitalize">
          {(session?.user as any)?.role || "admin"}
        </p>
      </div>
      <button
        onClick={() => signOut({ callbackUrl: "/admin/login" })}
        className="text-xs text-gray-300 hover:text-white"
      >
        Sign out
      </button>
    </div>
  )

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {sidebarOpen && (
        <div className="fixed inset-0 flex z-40 md:hidden">
          <div
            className="fixed inset-0 bg-gray-900/75"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center px-4">
                <h1 className="text-lg font-bold text-white">LieuVo Admin</h1>
              </div>
              <nav className="mt-5 px-2 space-y-1">{renderNavItems()}</nav>
            </div>
            <div className="flex-shrink-0 bg-gray-700 p-4">
              {renderUserPanel()}
            </div>
          </div>
        </div>
      )}

      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-gray-800">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center px-4">
              <h1 className="text-lg font-bold text-white">LieuVo Admin</h1>
            </div>
            <nav className="mt-6 flex-1 px-2 space-y-1">{renderNavItems()}</nav>
          </div>
          <div className="flex-shrink-0 bg-gray-700 p-4">
            {renderUserPanel()}
          </div>
        </div>
      </div>

      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-900">LieuVo Admin</h1>
          <button
            type="button"
            className="h-10 w-10 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <main className="flex-1 relative z-0 overflow-y-auto">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  )
}
