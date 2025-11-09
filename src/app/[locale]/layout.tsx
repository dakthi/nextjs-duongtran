import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import "../globals.css";

import AuthSessionProvider from "@/components/SessionProvider";
import { generateMetadata as genMeta, organizationSchema } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: '--font-montserrat'
});

export const metadata: Metadata = genMeta({});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
};

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'vi' }];
}

interface Props {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: Props) {
  return (
    <html lang={locale} className="light overflow-x-hidden" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
          suppressHydrationWarning
        />
      </head>
      <body className={`${inter.className} ${montserrat.variable} bg-gray-50 text-gray-900 antialiased overflow-x-hidden`} suppressHydrationWarning>
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  );
}