import { ServicePage } from "@/components/ServicePage";
import { generateMetadata as genMeta } from '@/lib/seo'
import { Metadata } from 'next'

interface ServicesPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: ServicesPageProps): Promise<Metadata> {
  return genMeta({
    title: 'Services',
    description: 'Expert accounting services for SMEs and independent professionals: bookkeeping, VAT returns, payroll, tax filings, and financial reporting in London, UK.',
    locale: params.locale,
    path: '/services',
  })
}

export default function Home({ params }: ServicesPageProps) {
  return <ServicePage locale={params.locale} />;
}
