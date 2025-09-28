"use client";

import Link from "next/link";
import React from "react";
import { Container } from "@/components/Container";
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();

  // Extract locale from pathname since useLocale might not work
  const locale = pathname.split('/')[1] || 'en';

  let t: any;
  try {
    t = useTranslations('footer');
  } catch (error) {
    // Fallback if context not available
    t = (key: string) => key;
  }

  const navigation = [
    { label: t('links.about') || 'About', href: `/${locale}/about` },
    { label: "Services", href: `/${locale}/services` },
    { label: "Testimonials", href: `/${locale}/testimonials` },
    { label: "FAQ", href: `/${locale}/faq` },
  ];

  const legal = [
    { label: t('links.terms') || 'Terms', href: `/${locale}/terms` },
    { label: t('links.privacy') || 'Privacy', href: `/${locale}/privacy` },
    { label: "Legal", href: `/${locale}/legal` },
  ];

  return (
    <div className="relative">
      <Container>
        <div className="grid max-w-screen-xl grid-cols-1 gap-10 pt-10 mx-auto mt-5 border-t border-gray-100 lg:grid-cols-5 px-4 md:px-0">
          <div className="lg:col-span-2">
            <div className="mb-5">
              <Link href={`/${locale}`}>
                <span className="flex flex-col">
                  <span className="text-2xl font-semibold text-gray-900">Lieu Vo</span>
                  <span className="text-sm text-gray-500 tracking-wide">your helpful accountant</span>
                </span>
              </Link>
            </div>
            <div className="max-w-md text-sm text-gray-500 leading-relaxed">
              {t('description') || 'Helping the Vietnamese community in the UK understand taxes and business finances.'}
              <br />
              Based in London, UK.
            </div>
          </div>

          <div>
            <div className="flex flex-col space-y-2">
              {navigation.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="flex flex-col space-y-2">
              {legal.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-500 mb-3">Stay connected</div>
            <div className="flex space-x-5 text-gray-400">
              <a
                href="https://www.facebook.com/vtthlieu"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">Facebook</span>
                <Facebook />
              </a>
              <a
                href="https://www.linkedin.com/in/lieu-vo-859421209/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">LinkedIn</span>
                <LinkedIn />
              </a>
            </div>
          </div>
        </div>

        <div className="my-10 text-xs text-center text-gray-400">
          {t('copyright', { year: new Date().getFullYear() }) || `Copyright © ${new Date().getFullYear()}. Made by`}
        </div>
      </Container>
    </div>
  );
}

const Facebook = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07" />
  </svg>
);

const LinkedIn = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8.5h4V24h-4V8.5zm7.5 0h3.8v2.11h.05c.53-1 1.83-2.11 3.77-2.11 4.04 0 4.79 2.66 4.79 6.11V24h-4V15.5c0-2.03-.04-4.65-2.83-4.65-2.83 0-3.27 2.21-3.27 4.5V24h-4V8.5z" />
  </svg>
);
