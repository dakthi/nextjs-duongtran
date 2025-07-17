import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { SectionTitle } from "@/components/SectionTitle";
import { Benefits } from "@/components/Benefits";
import { VideoSelfHosted } from "@/components/VideoSelfHosted";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";

import { benefitOne, benefitTwo } from "@/components/data";
import { FaqTitle } from "@/components/FaqTitle";
import { ContactForm } from "@/components/ContactForm";

export default function Home() {
  return (
    <Container>
        <ContactForm />
    </Container>
  );
}
