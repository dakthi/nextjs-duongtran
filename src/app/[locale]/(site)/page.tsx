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
  const { locale } = params

  return (
    <>
      <Hero params={params} />

      <div className="py-20">
        <SectionTitle
          preTitle="Lieu Vo"
          title="Here to make your numbers human"
        >
          I am an accountant who cares, not just about your business, but about your family, your time, and your peace of mind.
          I help streamline your numbers, simplify your processes, and give you back the space to focus on what matters most.
          Good accounting isn&apos;t just about precision. It&apos;s about trust, care, and building a better life beyond the spreadsheets.
        </SectionTitle>
      </div>

      <div className="py-20 bg-slate-50">
        <Benefits imgPos="left" data={benefitOne} />
      </div>

      <div className="py-20">
        <Benefits imgPos="right" size="large" data={benefitTwo} />
      </div>

      <div className="py-20 bg-slate-50">
        <SectionTitle
          preTitle="hear from lieu"
          title="supporting people, supporting businesses"
        >
          Lieu believes that accounting is not just about numbers. It is about enabling people to focus on what matters. Systems and tools should work <em>for us</em>, helping businesses and families thrive.
        </SectionTitle>
      </div>

      <div className="py-20 bg-slate-800">
        <Container className="text-center">
          <div className="text-xs font-semibold tracking-widest uppercase mb-3 text-amber-400">
            testimonials
          </div>
          <h2 className="max-w-3xl mx-auto text-3xl md:text-4xl font-serif font-bold leading-tight mb-6 text-white">
            what clients and colleagues say
          </h2>
          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-slate-200 font-medium mb-12">
            A tailored approach, genuine care, and a strong commitment to each client's success. That's what makes working with Lieu memorable.
          </p>
        </Container>

        <Testimonials locale={locale} />
      </div>

      <div className="py-20">
        <SectionTitle preTitle="faq" title="frequently asked questions">
          If these answers spark more questions, feel free to send an email, leave a message, or book a chat. Lieu is always happy to help.
        </SectionTitle>

        <div className="mt-12">
          <Faq />
        </div>
      </div>
    </>
  );
}
