'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface LanguageSwitcherProps {
  currentLocale: string;
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname();

  // Remove the current locale from pathname and construct new path
  const getLocalizedPath = (newLocale: string) => {
    // pathname already includes the locale prefix like /en or /vi
    // Remove it and add the new locale
    const pathWithoutLocale = pathname.replace(/^\/(en|vi)/, '') || '';
    return `/${newLocale}${pathWithoutLocale}`;
  };

  return (
    <div className="flex items-center gap-2">
      <Link
        href={getLocalizedPath('vi')}
        locale={false}
        className={`text-sm font-medium transition-colors ${
          currentLocale === 'vi' ? 'text-accent' : 'text-muted hover:text-accent'
        }`}
      >
        VI
      </Link>
      <span className="text-gray-300">|</span>
      <Link
        href={getLocalizedPath('en')}
        locale={false}
        className={`text-sm font-medium transition-colors ${
          currentLocale === 'en' ? 'text-accent' : 'text-muted hover:text-accent'
        }`}
      >
        EN
      </Link>
    </div>
  );
}
