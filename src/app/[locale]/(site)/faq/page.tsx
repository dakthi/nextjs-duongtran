import { Container } from "@/components/Container";
import { Faq } from "@/components/Faq";
import { PageHeader } from "@/components/PageHeader";
import { generateMetadata as genMeta, generateFAQPageSchema } from "@/lib/seo";
import type { Metadata } from "next";

const faqData = [
  {
    question: "Who do you work with?",
    answer: "I work with students preparing for university applications, young professionals seeking career direction, and parents looking for guidance on their children's education journey — especially families at international schools in Vietnam.",
  },
  {
    question: "What services do you offer?",
    answer: "I provide university application mentoring, scholarship consulting, personal statement reviews, career coaching, study abroad preparation, and ongoing mentorship for personal development.",
  },
  {
    question: "How does the mentoring process work?",
    answer: "We start with a conversation to understand your goals and situation. Then I create a personalized plan tailored to your needs, whether it's preparing applications, developing skills, or planning your career path. It's collaborative and flexible.",
  },
  {
    question: "Can you help with scholarship applications?",
    answer: "Yes! I help students identify scholarship opportunities, craft compelling applications, prepare for interviews, and present their best selves to selection committees.",
  },
  {
    question: "Where are you based?",
    answer: "I'm based in Vietnam and work with students and families both locally and internationally through online sessions. Distance is no barrier to achieving your dreams.",
  },
];

interface FaqPageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: FaqPageProps): Promise<Metadata> {
  const { locale } = params;
  return genMeta({
    title: "FAQ - Frequently asked questions",
    description: "Find answers to common questions about student mentoring, university applications, scholarships, and career guidance.",
    locale,
    path: '/faq',
  });
}

export default function Home({ params }: FaqPageProps) {
  const faqSchema = generateFAQPageSchema(faqData);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <PageHeader
        title="Frequently asked questions"
        description="Got questions? Here are answers to the most common ones. If you'd like to chat about something specific, feel free to reach out."
      />
      <div className="py-20 bg-white">
        <Container>
          <Faq />
        </Container>
      </div>
    </>
  );
}
