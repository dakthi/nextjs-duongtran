import { Container } from "@/components/Container";
import { Faq } from "@/components/Faq";
import { FaqTitle } from "@/components/FaqTitle";

export default function Home() {
  return (
    <>
      <FaqTitle />
      <div className="py-20 bg-white">
        <Container>
          <Faq />
        </Container>
      </div>
    </>
  );
}
