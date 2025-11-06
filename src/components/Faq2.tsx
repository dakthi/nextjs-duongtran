  "use client";

  import React from "react";
  import { Container } from "@/components/Container";

  export const FaqPage = () => {
    return (
      <Container className="prose prose-gray py-12">
        <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
        {faqData.map((item) => (
          <div key={item.question} className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800">{item.question}</h2>
            <p className="text-gray-700 mt-2">{item.answer}</p>
          </div>
        ))}
      </Container>
    );
  };

  const faqData = [
    {
      question: "Are you a qualified accountant?",
      answer:
        "Yes. I am an ACCA Affiliate, having completed all 13 exams on the first attempt. I also hold a First Class MSc in Accounting and Finance from BPP University, London.",
    },
    {
      question: "What kind of accounting services do you provide?",
      answer:
        "I manage full-cycle accounting, including bookkeeping, VAT returns, payroll processing, tax filings, and financial reporting. I also advise on optimising workflows and improving compliance.",
    },
    {
      question: "Do you work with small businesses?",
      answer:
        "Absolutely. I enjoy working closely with SMEs, helping them manage their numbers while they focus on growing their business. From family-run shops to local partnerships, I am here to help.",
    },
    {
      question: "How can you help my business beyond accounting?",
      answer:
        "I design systems that make your business run smoother. Whether it’s setting up automated reporting, improving payroll processes, or helping your team onboard faster, my goal is to give you more time to focus on the parts of your work that you love.",
    },
    {
      question: "Where are you based?",
      answer:
        "I am based in London, UK, but I can work remotely with clients across the country or internationally.",
    },
  ];
