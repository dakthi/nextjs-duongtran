"use client";

import React, { useState } from "react";
import { Container } from "@/components/layout/Container";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

export const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Container>
      <div className="w-full">
        {faqData.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.question} className="mb-4">
              <button
                onClick={() => toggleFaq(index)}
                className="flex items-center justify-between w-full px-6 py-5 text-lg text-left font-semibold text-outer-space bg-mint-green border-2 border-outer-space hover:bg-jungle-green-light focus:outline-none transition-colors"
              >
                <span>{item.question}</span>
                <ChevronUpIcon
                  className={`${
                    isOpen ? "transform rotate-180" : ""
                  } w-6 h-6 text-jungle-green flex-shrink-0 ml-4 transition-transform`}
                />
              </button>
              {isOpen && (
                <div className="px-6 py-5 bg-white border-2 border-t-0 border-outer-space text-feldgrau leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Container>
  );
};

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
    answer: "I design systems that make your business run smoother. Whether it’s setting up automated reporting, improving payroll processes, or helping your team onboard faster, my goal is to give you more time to focus on the parts of your work that you love.",
  },
  {
    question: "Where are you based?",
    answer: "I am based in London, UK, but I can work remotely with clients across the country or internationally.",
  },
];
