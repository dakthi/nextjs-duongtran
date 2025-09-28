import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

import AuthSessionProvider from "@/components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lieu Vo",
  description: "Helping the Vietnamese community in the UK understand taxes and business finances.",
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
    <html lang={locale} className="light" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50 text-gray-900 antialiased`}>
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  );
}