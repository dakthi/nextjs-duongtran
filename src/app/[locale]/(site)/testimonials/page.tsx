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
    title: "Testimonials - Success Stories",
    description: "Read what students and families say about working with Duong Tran - Life Coach & Student Mentor known for genuine care and commitment to student success.",
    locale,
    path: '/testimonials',
  });
}

export default function Home() {
  return (
    <>
      <PageHeader
        title="Success Stories"
        description="I'm grateful to have worked with amazing students and families. Here's what some of them have shared about their experience and journey."
      />
      <TestimonialBody />
    </>
  );
}
