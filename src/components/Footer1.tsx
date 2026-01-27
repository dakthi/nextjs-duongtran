import Link from "next/link";

interface Footer1Props {
  locale: string;
  translations: {
    footerTagline: string;
    footerLinksTitle: string;
    footerBlog: string;
    footerContact: string;
    footerCopyright: string;
    footerPrivacy: string;
    footerTerms: string;
  };
}

export function Footer1({ locale, translations }: Footer1Props) {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-accent mb-2">
              Duong Tran TWG
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              {translations.footerTagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-fg mb-4 uppercase tracking-wider">
              {translations.footerLinksTitle}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/proposal`} className="text-sm text-muted hover:text-accent transition-colors">
                  Together We Grow
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog`} className="text-sm text-muted hover:text-accent transition-colors">
                  {translations.footerBlog}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-sm text-muted hover:text-accent transition-colors">
                  {translations.footerContact}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted">
            © Duong Tran TWG. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href={`/${locale}/proposal`} className="text-sm text-muted hover:text-accent transition-colors">
              {translations.footerPrivacy}
            </Link>
            <Link href={`/${locale}/proposal`} className="text-sm text-muted hover:text-accent transition-colors">
              {translations.footerTerms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
