import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

import AuthSessionProvider from "@/components/SessionProvider";
import { generateMetadata as genMeta, organizationSchema } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = genMeta({});

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
    <html lang={locale} className="light" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className={`${inter.className} bg-gray-50 text-gray-900 antialiased`}>
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  );
}