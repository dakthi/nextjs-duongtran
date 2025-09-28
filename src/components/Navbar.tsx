"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

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
    { label: t('testimonials') || 'Testimonials', href: `/${locale}/testimonials` },
    { label: t('faq') || 'FAQ', href: `/${locale}/faq` },
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
      className={`w-full sticky top-0 bg-white z-50 transition-all duration-300 ${
        scrolled ? "shadow-sm border-b" : ""
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-4 py-4 md:py-6">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex flex-col space-y-0.5">
          <span
            className={`font-semibold text-gray-900 transition-all duration-300 ${
              scrolled ? "text-xl" : "text-2xl"
            }`}
          >
            Lieu Vo
          </span>
          <span
            className={`text-gray-500 tracking-wide transition-all duration-300 ${
              scrolled ? "text-xs hidden md:block" : "text-sm"
            }`}
          >
            your helpful accountant
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          {navigation.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={`/${locale}/contact`}
            className="ml-6 px-4 py-2 rounded-md text-white bg-gray-700 hover:bg-gray-800 text-sm transition"
          >
{t('contact') || 'Contact'}
          </Link>

          {/* Language Switcher */}
          <div className="ml-4 flex space-x-2">
            <button
              onClick={() => switchLanguage('en')}
              className={`px-2 py-1 text-xs rounded ${
                locale === 'en' ? 'bg-gray-700 text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => switchLanguage('vi')}
              className={`px-2 py-1 text-xs rounded ${
                locale === 'vi' ? 'bg-gray-700 text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              VI
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                aria-label="Toggle Menu"
                className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {open ? (
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
              </Disclosure.Button>

              <Disclosure.Panel className="md:hidden mt-4 space-y-2">
                {navigation.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="block px-4 py-2 text-gray-600 hover:text-gray-900 transition"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href={`/${locale}/contact`}
                  className="block mt-2 px-4 py-2 text-center bg-gray-700 text-white rounded-md hover:bg-gray-800 transition"
                >
      {t('contact') || 'Contact'}
                </Link>

                {/* Mobile Language Switcher */}
                <div className="flex space-x-2 px-4 py-2">
                  <button
                    onClick={() => switchLanguage('en')}
                    className={`px-3 py-1 text-sm rounded ${
                      locale === 'en' ? 'bg-gray-700 text-white' : 'text-gray-600 hover:text-gray-900 border'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => switchLanguage('vi')}
                    className={`px-3 py-1 text-sm rounded ${
                      locale === 'vi' ? 'bg-gray-700 text-white' : 'text-gray-600 hover:text-gray-900 border'
                    }`}
                  >
                    VI
                  </button>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </nav>
    </div>
  );
};
