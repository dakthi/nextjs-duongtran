"use client";

import Link from "next/link";
import React from "react";
import { Container } from "@/components/Container";
import { usePathname } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  // Simple translation object - no hooks needed
  const translations: any = {
    en: {
      tagline: "Help SMEs owners and independent professionals to make sense and be on top of their tax",
      description: "Help SMEs owners and independent professionals to make sense and be on top of their tax.",
      location: "Based in London, UK.",
      stayConnected: "Stay connected",
      links: {
        about: "About",
        services: "Services",
        testimonials: "Testimonials",
        faq: "FAQ",
        terms: "Terms of Service",
        privacy: "Privacy Policy"
      },
      social: {
        facebook: "Facebook",
        linkedin: "LinkedIn"
      }
    },
    vi: {
      tagline: "Kế Toán Hỗ Trợ Tận Tâm",
      description: "Giúp cộng đồng người Việt tại Anh hiểu về thuế và tài chính doanh nghiệp.",
      location: "Có trụ sở tại London, Anh.",
      stayConnected: "Kết nối với chúng tôi",
      links: {
        about: "Giới thiệu",
        services: "Dịch vụ",
        testimonials: "Nhận xét",
        faq: "Hỏi đáp",
        terms: "Điều khoản dịch vụ",
        privacy: "Chính sách bảo mật"
      },
      social: {
        facebook: "Facebook",
        linkedin: "LinkedIn"
      }
    }
  };

  const t = translations[locale] || translations.en;

  const navigation = [
    { label: t.links.about, href: `/${locale}/about` },
    { label: t.links.services, href: `/${locale}/services` },
    { label: 'Blog', href: `/${locale}/blog` },
  ];

  const legal = [
    { label: t.links.terms, href: `/${locale}/terms` },
    { label: t.links.privacy, href: `/${locale}/privacy` },
  ];

  return (
    <div className="relative bg-slate-900">
      <Container>
        <div className="grid grid-cols-1 gap-10 pt-12 pb-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="mb-5">
              <Link href={`/${locale}`}>
                <span className="flex flex-col">
                  <span className="text-2xl font-serif font-bold text-white">Lieu Vo</span>
                  <span className="text-sm text-amber-400 tracking-wide">{t.tagline}</span>
                </span>
              </Link>
            </div>
            <div className="max-w-md text-sm text-slate-300 leading-relaxed">
              {t.description}
              <br />
              {t.location}
            </div>
          </div>

          <div>
            <div className="flex flex-col space-y-3">
              {navigation.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-sm text-slate-300 hover:text-amber-400 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="flex flex-col space-y-3">
              {legal.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-sm text-slate-300 hover:text-amber-400 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm text-slate-400 mb-4">{t.stayConnected}</div>
            <div className="flex space-x-5 text-slate-400">
              <a
                href="https://www.facebook.com/lieuvoo"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition-colors"
              >
                <span className="sr-only">{t.social.facebook}</span>
                <Facebook />
              </a>
              <a
                href="https://www.linkedin.com/in/lieu-vo-acca-859421209/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition-colors"
              >
                <span className="sr-only">{t.social.linkedin}</span>
                <LinkedIn />
              </a>
            </div>
          </div>
        </div>

        <div className="py-6 border-t border-slate-800 text-xs text-center text-slate-400">
          Copyright © {new Date().getFullYear()}. All rights reserved.
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
