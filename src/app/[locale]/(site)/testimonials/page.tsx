import { PageHeader } from "@/components/PageHeader";
import { TestimonialBody } from "@/components/TestimonialBody";
import { generateMetadata as genMeta } from "@/lib/seo";
import type { Metadata } from "next";

interface TestimonialsPageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: TestimonialsPageProps): Promise<Metadata> {
  const { locale } = params;
  return genMeta({
    title: "Testimonials - Client Reviews",
    description: "Read what clients and colleagues say about working with Lieu Vo - ACCA chartered accountant known for exceptional service and commitment to client success.",
    locale,
    path: '/testimonials',
  });
}

export default function Home() {
  return (
    <>
      <PageHeader
        title="What People Say"
        description="I'm grateful to have worked with incredible teammates and collaborators. Here's what some of them have shared about their experience working with me."
      />
      <TestimonialBody />
    </>
  );
}
