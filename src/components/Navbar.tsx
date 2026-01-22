"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Container } from "@/components/Container";

export const Navbar = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Extract locale from pathname since useLocale might not work
  const locale = pathname.split('/')[1] || 'en';

  // Only show language switcher on blog pages
  const isBlogPage = pathname.includes('/blog');

  // Check if we're on an individual blog post page (not the blog listing page)
  const isBlogPostPage = pathname.includes('/blog/') && pathname.split('/').length > 3;

  let t: any;
  try {
    t = useTranslations('navigation');
  } catch (error) {
    // Fallback if context not available
    t = (key: string) => key;
  }

  const navigation = [
    { label: t('home') || 'Home', href: `/${locale}` },
    { label: t('about') || 'About', href: `/${locale}/about` },
    { label: t('services') || 'Services', href: `/${locale}/services` },
    { label: t('blog') || 'Blog', href: `/${locale}/blog` },
  ];

  const switchLanguage = async (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    let newPath = segments.join('/');

    // If we're on a specific blog post page, check if it exists in the target language
    if (pathname.includes('/blog/') && segments.length > 3) {
      const slug = segments[3];
      try {
        // Check if the post exists in the target language
        const response = await fetch(`/api/blog/check-translation?slug=${slug}&locale=${newLocale}`);
        const data = await response.json();
        if (!data.exists) {
          // Post doesn't exist in target language, go to blog listing instead
          newPath = `/${newLocale}/blog`;
        }
      } catch (error) {
        // On error, fallback to blog listing
        newPath = `/${newLocale}/blog`;
      }
    }

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

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <div
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-soft" : "bg-transparent"
      }`}
    >
      <Container>
      <nav className="flex items-center justify-between py-4 md:py-5">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex flex-col">
          <span
            className={`font-serif font-bold transition-all duration-300 text-outer-space ${scrolled ? "text-xl" : "text-2xl"}`}
          >
            Duong Tran
          </span>
          <span
            className={`text-warm-gold text-xs tracking-wider font-medium transition-all duration-300 ${scrolled ? "hidden md:block" : ""}`}
          >
            Life coach & student mentor
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          {navigation.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="text-sm font-medium text-feldgrau hover:text-jungle-green transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={`/${locale}/contact`}
            className="ml-4 px-6 py-2.5 text-white bg-jungle-green hover:bg-jungle-green-dark text-sm font-semibold rounded-full transition-colors"
          >
            {t('contact') || 'Contact'}
          </Link>

          {/* Language Switcher - Only show on blog pages */}
          {isBlogPage && (
            <div className="ml-4 flex space-x-1">
              <button
                onClick={() => switchLanguage('en')}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  locale === 'en' ? 'bg-jungle-green text-white' : 'text-feldgrau hover:text-jungle-green'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => switchLanguage('vi')}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  locale === 'vi' ? 'bg-jungle-green text-white' : 'text-feldgrau hover:text-jungle-green'
                }`}
              >
                VI
              </button>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden" ref={menuRef}>
          <button
            aria-label="Toggle Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-outer-space hover:text-jungle-green focus:outline-none"
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
            <div className="absolute top-full left-0 right-0 bg-white shadow-soft border-t border-gray-100">
              <Container>
              <div className="py-4">
              {navigation.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-feldgrau hover:text-jungle-green hover:bg-warm-cream transition rounded-lg"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={`/${locale}/contact`}
                onClick={() => setMobileMenuOpen(false)}
                className="block mx-4 mt-3 px-4 py-3 text-center bg-jungle-green text-white font-semibold hover:bg-jungle-green-dark rounded-full transition"
              >
                {t('contact') || 'Contact'}
              </Link>

              {/* Mobile Language Switcher - Only show on blog pages */}
              {isBlogPage && (
                <div className="flex gap-2 px-4 pt-4">
                  <button
                    onClick={() => {
                      switchLanguage('en');
                      setMobileMenuOpen(false);
                    }}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded-full transition ${
                      locale === 'en' ? 'bg-jungle-green text-white' : 'bg-gray-100 text-feldgrau hover:bg-gray-200'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => {
                      switchLanguage('vi');
                      setMobileMenuOpen(false);
                    }}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded-full transition ${
                      locale === 'vi' ? 'bg-jungle-green text-white' : 'bg-gray-100 text-feldgrau hover:bg-gray-200'
                    }`}
                  >
                    VI
                  </button>
                </div>
              )}
              </div>
              </Container>
            </div>
          )}
        </div>
      </nav>
      </Container>
    </div>
  );
};
