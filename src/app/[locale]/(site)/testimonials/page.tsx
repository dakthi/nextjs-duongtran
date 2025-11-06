import { PageHeader } from "@/components/PageHeader";
import { TestimonialBody } from "@/components/TestimonialBody";

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
