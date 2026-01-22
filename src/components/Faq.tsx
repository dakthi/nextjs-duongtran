"use client";

import React, { useState } from "react";
import { Container } from "@/components/Container";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

export const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Container>
      <div className="w-full max-w-3xl mx-auto">
        {faqData.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.question} className="mb-6 group">
              <button
                onClick={() => toggleFaq(index)}
                className="flex items-center justify-between w-full bg-white border-l-4 border-gray-300 group-hover:border-jungle-green shadow-md group-hover:shadow-xl transition-all focus:outline-none rounded-tr-md overflow-hidden"
              >
                <div className="flex items-center justify-between w-full px-6 py-5">
                  <span className="text-lg text-left font-semibold text-outer-space group-hover:text-jungle-green transition-colors">
                    {item.question}
                  </span>
                  <ChevronUpIcon
                    className={`${
                      isOpen ? "transform rotate-180" : ""
                    } w-6 h-6 text-jungle-green flex-shrink-0 ml-4 transition-transform`}
                  />
                </div>
              </button>
              {isOpen && (
                <div className="px-8 py-6 bg-mint-green border-l-4 border-jungle-green text-feldgrau leading-relaxed">
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
    question: "Who do you help?",
    answer: "I work with students preparing for university applications, young professionals seeking career direction, and anyone looking to unlock their potential through personalized mentoring and guidance.",
  },
  {
    question: "What services do you offer?",
    answer: "I provide university application guidance, scholarship consulting, personal statement reviews, career coaching, study abroad preparation, and ongoing mentorship for personal development.",
  },
  {
    question: "How does the mentoring process work?",
    answer: "We start with a discovery session to understand your goals and aspirations. Then I create a personalized plan tailored to your needs, whether it's preparing applications, developing skills, or planning your career path.",
  },
  {
    question: "Can you help with scholarship applications?",
    answer: "Yes! I help students identify scholarship opportunities, craft compelling applications, prepare for interviews, and present their best selves to selection committees.",
  },
  {
    question: "Where are you based?",
    answer: "I am based in Vietnam but work with students and professionals globally through online sessions. Distance is no barrier to achieving your dreams!",
  },
];
