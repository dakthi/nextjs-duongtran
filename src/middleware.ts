import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // Where to redirect when accessing root
  localePrefix: 'always'
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is Vietnamese and NOT a blog path
  if (pathname.startsWith('/vi') && !pathname.startsWith('/vi/blog')) {
    // Redirect to English version
    const newPathname = pathname.replace('/vi', '/en');
    return NextResponse.redirect(new URL(newPathname, request.url));
  }

  // For all other paths, use the default next-intl middleware
  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|vi)/:path*']
};