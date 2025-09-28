import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { SectionTitle } from "@/components/SectionTitle";
import { Benefits } from "@/components/Benefits";
import { VideoSelfHosted } from "@/components/VideoSelfHosted";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";

import { benefitOne, benefitTwo } from "@/components/data";

export const dynamic = "force-dynamic";

interface HomeProps {
  params: { locale: string };
}

export default async function Home({ params }: HomeProps) {
  return (
    <Container>
      <Hero params={params} />
      <SectionTitle
        preTitle="Lieu Vo"
        title="Here to make your numbers human"
      >
        I am an accountant who cares — not just about your business, but about your family, your time, and your peace of mind.
        I help streamline your numbers, simplify your processes, and give you back the space to focus on what matters most.
        Good accounting isn&apos;t just about precision — it&apos;s about trust, care, and building a better life beyond the spreadsheets.
      </SectionTitle>


      <Benefits imgPos="left" data={benefitOne} />
      <Benefits imgPos="right" size="large" data={benefitTwo} />


      <SectionTitle
        preTitle="hear from lieu"
        title="supporting people, supporting businesses"
      >
        Lieu believes that accounting is not just about numbers — it is about enabling people to focus on what matters. Systems and tools should work <em>for us</em>, helping businesses and families thrive.
      </SectionTitle>

      <SectionTitle
        preTitle="testimonials"
        title="what clients and colleagues say"
      >
        A tailored approach, genuine care, and a strong commitment to each client's success — that's what makes working with Lieu memorable.
      </SectionTitle>

      <Testimonials />

      <SectionTitle preTitle="faq" title="frequently asked questions">
        If these answers spark more questions, feel free to send an email, leave a message, or book a chat — Lieu is always happy to help.
      </SectionTitle>

      <Faq />
    </Container>
  );
}
