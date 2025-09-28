"use client"

import { useEffect, useState } from "react"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslations } from 'next-intl'
import LanguageSwitcher from './LanguageSwitcher'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Extract locale from pathname
  const locale = pathname.split('/')[1] || 'en'

  let t: any, tNav: any, tActions: any;
  try {
    t = useTranslations('admin');
    tNav = useTranslations('admin.navigation');
    tActions = useTranslations('admin.actions');
  } catch (error) {
    t = (key: string) => key;
    tNav = (key: string) => key;
    tActions = (key: string) => key;
  }

  // Fallback translations based on locale
  const getTitle = () => {
    const translated = t('title');
    if (translated === 'title') {
      return locale === 'vi' ? 'Quản Trị LieuVo' : 'LieuVo Admin';
    }
    return translated;
  };

  // Fallback navigation translations
  const getNavText = (key: string, fallback: string, viFallback: string) => {
    const translated = tNav(key);
    if (translated === key) {
      return locale === 'vi' ? viFallback : fallback;
    }
    return translated;
  };

  const navigation = [
    { name: getNavText('dashboard', 'Dashboard', 'Bảng Điều Khiển'), href: `/${locale}/admin` },
    { name: getNavText('hero', 'Hero', 'Trang Chủ'), href: `/${locale}/admin/hero` },
    { name: getNavText('blog', 'Blog', 'Blog'), href: `/${locale}/admin/blog` },
    { name: getNavText('about', 'About', 'Giới Thiệu'), href: `/${locale}/admin/about` },
    { name: getNavText('testimonials', 'Testimonials', 'Nhận Xét'), href: `/${locale}/admin/testimonials` },
    { name: getNavText('media', 'Media', 'Phương Tiện'), href: `/${locale}/admin/media` },
    { name: getNavText('faq', 'FAQ', 'Hỏi Đáp'), href: `/${locale}/admin/faq` },
  ]

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
        onClick={() => signOut({ callbackUrl: `/${locale}/admin/login` })}
        className="text-xs text-gray-300 hover:text-white"
      >
        {tActions('signOut') || 'Sign out'}
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
                <span className="sr-only">{tActions('closeSidebar') || 'Close sidebar'}</span>
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
            <div className="px-4">
              <h1 className="text-lg font-bold text-white">{getTitle()}</h1>
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
          <h1 className="text-lg font-bold text-gray-900">{getTitle()}</h1>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher className="scale-90" />
            <button
            type="button"
            className="h-10 w-10 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">{tActions('openMenu') || 'Open menu'}</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            </button>
          </div>
        </div>

        <main className="flex-1 relative z-0 overflow-y-auto">
          <div className="absolute top-4 right-4 z-10 hidden md:block">
            <LanguageSwitcher className="scale-90" />
          </div>
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 md:pr-32">{children}</div>
          </div>
        </main>
      </div>
    </div>
  )
}
