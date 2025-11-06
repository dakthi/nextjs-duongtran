import { Container } from "@/components/Container";
import { Faq } from "@/components/Faq";
import { PageHeader } from "@/components/PageHeader";

export default function Home() {
  return (
    <>
      <PageHeader
        title="Frequently Asked Questions"
        description="See below for answers to commonly asked questions. If you'd like to discuss how we can support your business, feel free to get in touch."
      />
      <div className="py-20 bg-white">
        <Container>
          <Faq />
        </Container>
      </div>
    </>
  );
}
