import { Container } from "@/components/Container";
import { QuizContainer } from "@/components/quiz/QuizContainer";
import { generateMetadata as genMeta } from "@/lib/seo";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

interface QuizPageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: QuizPageProps): Promise<Metadata> {
  return genMeta({
    title: "Tax Readiness Quiz",
    description: "Take our 5-minute assessment to discover if you're prepared for UK tax changes affecting small businesses in 2025-2026",
    locale: params.locale,
    path: "/quiz",
  });
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { locale } = params;

  return (
    <div className="py-20">
      <Container>
        <QuizContainer locale={locale} />
      </Container>
    </div>
  );
}
