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

  // Check if we're on the homepage
  const isHomepage = pathname === `/${locale}` || pathname === `/${locale}/`;

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
        isHomepage
          ? `bg-[#434F4D] border-b-4 ${scrolled ? "shadow-lg border-[#40B291]" : "border-[#40B291]"}`
          : `bg-white border-b-2 ${scrolled ? "shadow-lg border-[#40B291]" : "border-gray-200"}`
      }`}
    >
      <Container>
      <nav className="flex items-center justify-between py-4 md:py-5">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex flex-col space-y-0.5">
          <span
            className={`font-sans font-bold transition-all duration-300 ${
              isHomepage ? "text-[#D2E8E2]" : "text-[#434F4D]"
            } ${scrolled ? "text-xl" : "text-2xl"}`}
          >
            Lieu Vo
          </span>
          <span
            className={`text-white bg-[#40B291] tracking-wide font-bold transition-all duration-300 px-2 py-0.5 border-2 ${
              isHomepage ? "border-[#434F4D] shadow-[2px_2px_0px_0px_rgba(67,79,77,1)]" : "border-[#40B291] shadow-[2px_2px_0px_0px_rgba(64,178,145,1)]"
            } ${scrolled ? "text-xs hidden md:block" : "text-xs"}`}
          >
            ACCA Chartered Accountant
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          {navigation.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`text-sm font-medium transition-colors capitalize ${
                isHomepage ? "text-[#D2E8E2] hover:text-[#40B291]" : "text-[#434F4D] hover:text-[#40B291]"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={`/${locale}/contact`}
            className="ml-6 px-5 py-2 text-white bg-[#40B291] hover:bg-[#3AA084] text-sm font-semibold transition-colors capitalize"
          >
            {t('contact') || 'Contact'}
          </Link>

          {/* Language Switcher - Only show on blog pages */}
          {isBlogPage && (
            <div className="ml-4 flex space-x-2">
              <button
                onClick={() => switchLanguage('en')}
                className={`px-2 py-1 text-xs font-semibold transition-colors ${
                  locale === 'en' ? 'bg-[#40B291] text-white' : `${isHomepage ? 'text-[#D2E8E2]' : 'text-[#434F4D]'} hover:text-[#40B291]`
                }`}
              >
                EN
              </button>
              <button
                onClick={() => switchLanguage('vi')}
                className={`px-2 py-1 text-xs font-semibold transition-colors ${
                  locale === 'vi' ? 'bg-[#40B291] text-white' : `${isHomepage ? 'text-[#D2E8E2]' : 'text-[#434F4D]'} hover:text-[#40B291]`
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
            className={`p-2 hover:text-[#40B291] focus:outline-none ${
              isHomepage ? "text-[#D2E8E2]" : "text-[#434F4D]"
            }`}
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
            <div className={`absolute top-full left-0 right-0 border-t-2 border-[#40B291] shadow-lg ${
              isHomepage ? "bg-[#434F4D]" : "bg-white"
            }`}>
              <Container>
              <div className="space-y-1 py-4">
              {navigation.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 hover:text-[#40B291] transition capitalize ${
                    isHomepage ? "text-[#D2E8E2] hover:bg-[#3F6059]" : "text-[#434F4D] hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={`/${locale}/contact`}
                onClick={() => setMobileMenuOpen(false)}
                className="block mx-4 mt-3 px-4 py-3 text-center bg-[#40B291] text-white font-semibold hover:bg-[#3AA084] transition capitalize"
              >
                {t('contact') || 'Contact'}
              </Link>

              {/* Mobile Language Switcher - Only show on blog pages */}
              {isBlogPage && (
                <div className="flex gap-2 px-4 pt-3 pb-1">
                  <button
                    onClick={() => {
                      switchLanguage('en');
                      setMobileMenuOpen(false);
                    }}
                    className={`flex-1 px-3 py-2 text-sm font-semibold transition ${
                      locale === 'en' ? 'bg-[#40B291] text-white' : 'bg-gray-100 text-[#434F4D] hover:bg-gray-200 hover:text-[#40B291]'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => {
                      switchLanguage('vi');
                      setMobileMenuOpen(false);
                    }}
                    className={`flex-1 px-3 py-2 text-sm font-semibold transition ${
                      locale === 'vi' ? 'bg-[#40B291] text-white' : 'bg-gray-100 text-[#434F4D] hover:bg-gray-200 hover:text-[#40B291]'
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
