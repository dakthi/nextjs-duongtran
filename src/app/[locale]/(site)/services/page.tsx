
import { ServicePage } from "@/components/ServicePage";

interface ServicesPageProps {
  params: {
    locale: string;
  };
}

export default function Home({ params }: ServicesPageProps) {
  return <ServicePage locale={params.locale} />;
}
