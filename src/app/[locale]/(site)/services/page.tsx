import { ServicePage } from "@/components/ServicePage";

export const dynamic = "force-dynamic";

interface ServicesPageProps {
  params: {
    locale: string;
  };
}

export default function Home({ params }: ServicesPageProps) {
  return <ServicePage locale={params.locale} />;
}
