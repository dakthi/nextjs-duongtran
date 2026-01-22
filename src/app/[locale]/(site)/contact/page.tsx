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
    description: 'Ready to start your journey? Get in touch with Duong Tran for personalized mentoring on university applications, scholarships, and career guidance.',
    locale: params.locale,
    path: '/contact',
  })
}

export default function Home({ params }: ContactPageProps) {
  return <ContactForm />;
}
