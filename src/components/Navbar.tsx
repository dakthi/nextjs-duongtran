"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Extract locale from pathname since useLocale might not work
  const locale = pathname.split('/')[1] || 'en';

  let t: any;
  try {
    t = useTranslations('navigation');
  } catch (error) {
    // Fallback if context not available
    t = (key: string) => key;
  }

  const navigation = [
    { label: t('about') || 'About', href: `/${locale}/about` },
    { label: t('services') || 'Services', href: `/${locale}/services` },
    { label: t('blog') || 'Blog', href: `/${locale}/blog` },
  ];

  const switchLanguage = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');

    // Force a hard navigation to avoid caching issues
    window.location.href = newPath;
  };

  const [scrolled, setScrolled] = useState(false);
  const lastKnownScrollY = useRef(0);

  useEffect(() => {
    const SHRINK_SCROLL_Y = 60;
    const UNSHRINK_SCROLL_Y = 10;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > SHRINK_SCROLL_Y && !scrolled) {
        setScrolled(true);
      } else if (scrollY < UNSHRINK_SCROLL_Y && scrolled) {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <div
      className={`w-full sticky top-0 bg-slate-800 z-50 transition-all duration-300 ${
        scrolled ? "shadow-lg" : ""
      }`}
    >
      <nav className="container max-w-5xl mx-auto flex items-center justify-between px-8 xl:px-12 py-4 md:py-5">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex flex-col space-y-0.5">
          <span
            className={`font-serif font-bold text-white transition-all duration-300 ${
              scrolled ? "text-xl" : "text-2xl"
            }`}
          >
            Lieu Vo
          </span>
          <span
            className={`text-amber-400 tracking-wide transition-all duration-300 ${
              scrolled ? "text-xs hidden md:block" : "text-sm"
            }`}
          >
            Chartered Accountant
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          {navigation.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="text-slate-200 hover:text-amber-400 text-sm font-medium transition-colors capitalize"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={`/${locale}/contact`}
            className="ml-6 px-5 py-2 text-slate-900 bg-amber-500 hover:bg-amber-400 text-sm font-semibold transition-colors capitalize"
          >
            {t('contact') || 'Contact'}
          </Link>

          {/* Language Switcher */}
          <div className="ml-4 flex space-x-2">
            <button
              onClick={() => switchLanguage('en')}
              className={`px-2 py-1 text-xs font-semibold ${
                locale === 'en' ? 'bg-amber-500 text-slate-900' : 'text-slate-300 hover:text-amber-400'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => switchLanguage('vi')}
              className={`px-2 py-1 text-xs font-semibold ${
                locale === 'vi' ? 'bg-amber-500 text-slate-900' : 'text-slate-300 hover:text-amber-400'
              }`}
            >
              VI
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <button
            aria-label="Toggle Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-200 hover:text-amber-400 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {mobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 space-y-2 bg-slate-700 p-4 shadow-lg">
              {navigation.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-slate-200 hover:text-amber-400 transition capitalize"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={`/${locale}/contact`}
                onClick={() => setMobileMenuOpen(false)}
                className="block mt-2 px-4 py-2 text-center bg-amber-500 text-slate-900 font-semibold hover:bg-amber-400 transition capitalize"
              >
                {t('contact') || 'Contact'}
              </Link>

              {/* Mobile Language Switcher */}
              <div className="flex space-x-2 px-4 py-2">
                <button
                  onClick={() => {
                    switchLanguage('en');
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-1 text-sm font-semibold ${
                    locale === 'en' ? 'bg-amber-500 text-slate-900' : 'text-slate-300 hover:text-amber-400 border border-slate-500'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => {
                    switchLanguage('vi');
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-1 text-sm font-semibold ${
                    locale === 'vi' ? 'bg-amber-500 text-slate-900' : 'text-slate-300 hover:text-amber-400 border border-slate-500'
                  }`}
                >
                  VI
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};
