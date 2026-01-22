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
    description: 'Life coaching and student mentoring services: university application guidance, scholarship consulting, career coaching, and personal development support.',
    locale: params.locale,
    path: '/services',
  })
}

export default function Home({ params }: ServicesPageProps) {
  return <ServicePage locale={params.locale} />;
}
