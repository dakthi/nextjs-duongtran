import { Container } from "@/components/Container";
import { Faq } from "@/components/Faq";
import { PageHeader } from "@/components/PageHeader";
import { generateMetadata as genMeta, generateFAQPageSchema } from "@/lib/seo";
import type { Metadata } from "next";

const faqData = [
  {
    question: "Are you a qualified accountant?",
    answer: "Yes. I am an ACCA Qualified Accountant, having completed all 13 exams on the first attempt. I also hold a First Class MSc in Accounting and Finance from BPP University, London.",
  },
  {
    question: "What kind of accounting services do you provide?",
    answer: "I manage full-cycle accounting, including bookkeeping, VAT returns, payroll processing, tax filings, and financial reporting. I also advise on optimising workflows and improving compliance.",
  },
  {
    question: "Do you work with small businesses?",
    answer: "Absolutely. I enjoy working closely with SMEs, helping them manage their numbers while they focus on growing their business. From family-run shops to local partnerships, I am here to help.",
  },
  {
    question: "How can you help my business beyond accounting?",
    answer: "I design systems that make your business run smoother. Whether it's setting up automated reporting, improving payroll processes, or helping your team onboard faster, my goal is to give you more time to focus on the parts of your work that you love.",
  },
  {
    question: "Where are you based?",
    answer: "I am based in London, UK, but I can work remotely with clients across the country or internationally.",
  },
];

interface FaqPageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: FaqPageProps): Promise<Metadata> {
  const { locale } = params;
  return genMeta({
    title: "FAQ - Frequently Asked Questions",
    description: "Find answers to common questions about ACCA accounting services, tax, payroll, and how we support SMEs and independent professionals.",
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
