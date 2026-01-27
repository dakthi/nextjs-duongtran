"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

interface Navbar1Props {
  locale: string;
  translations: {
    navServices: string;
    navBlog: string;
    navCTA: string;
  };
}

export function Navbar1({ locale, translations }: Navbar1Props) {
  const [scrolled, setScrolled] = useState(false);

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
    <nav className={`bg-white border-b border-gray-200 sticky top-0 z-[100] transition-all duration-300 ${
      scrolled ? "shadow-lg" : "shadow-[0_2px_4px_rgba(0,0,0,0.02)]"
    }`}>
      <div className={`max-w-[1200px] mx-auto px-8 flex justify-between items-center transition-all duration-300 ${
        scrolled ? "py-4" : "py-6"
      }`}>
        <Link href={`/${locale}`} className={`font-bold text-accent transition-all duration-300 ${
          scrolled ? "text-xl" : "text-2xl"
        }`}>
          Duong Tran TWG
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href={`/${locale}/proposal`} className="text-fg font-medium hover:text-accent transition-colors">
            {translations.navServices}
          </Link>
          <Link href={`/${locale}/blog`} className="text-fg font-medium hover:text-accent transition-colors">
            {translations.navBlog}
          </Link>
          <LanguageSwitcher currentLocale={locale} />
          <Link
            href={`/${locale}/proposal`}
            className="bg-accent text-white px-6 py-3 rounded-full font-semibold hover:bg-[#152A44] transition-all hover:-translate-y-px"
          >
            {translations.navCTA}
          </Link>
        </div>
      </div>
    </nav>
  );
}
