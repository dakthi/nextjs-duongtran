import { ContactForm } from "@/components/ContactForm";
import { generateMetadata as genMeta } from '@/lib/seo'
import { Metadata } from 'next'

interface ContactPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  return genMeta({
    title: 'Contact',
    description: 'Get in touch with Duong Tran for accounting, tax, and payroll services. Expert support for SMEs and independent professionals in London, UK.',
    locale: params.locale,
    path: '/contact',
  })
}

export default function Home({ params }: ContactPageProps) {
  return <ContactForm />;
}
