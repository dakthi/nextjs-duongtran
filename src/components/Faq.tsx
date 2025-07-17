"use client";

import React from "react";
import { Container } from "@/components/Container";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

export const Faq = () => {
  return (
    <Container className="!p-0">
      <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
        {faqData.map((item, index) => (
          <div key={item.question} className="mb-5">
            <Disclosure>
              {({ open }) => (
                <>
                  <DisclosureButton className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                    <span>{item.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-gray-500`}
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="px-4 pt-4 pb-2 text-gray-600">
                    {item.answer}
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </Container>
  );
};

const faqData = [
  {
    question: "Are you a qualified accountant?",
    answer: "Yes. I am an ACCA Affiliate, having completed all 13 exams on the first attempt. I also hold a First Class MSc in Accounting and Finance from BPP University, London.",
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
