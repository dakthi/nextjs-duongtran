"use client";

import React from "react";
import Image from "next/image";

export const TestimonialBody = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-10 px-4">
      {/* Testimonial 1 — James Price */}
      <div className="bg-white border shadow-sm rounded-xl p-6 flex flex-col sm:flex-row gap-5">
        <div className="flex-shrink-0">
          <Image
            src="/img/testimonials/james-price.jpeg"
            alt="James Price"
            width={80}
            height={80}
            className="rounded-full border"
          />
        </div>
        <div>
          <div className="mb-3">
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-800">James Price</span> · Creative Industries Accounts Assistant<br />
              June 2025 · Worked with Lieu on the same team
            </p>
          </div>
          <p className="text-gray-700 text-base leading-relaxed">
            Lieu is a talented and ambitious woman with a range of skills spanning the full spectrum of accountancy. During my time working alongside her, I benefited greatly from her guidance — especially in developing my technical knowledge.
          </p>
          <p className="text-gray-700 text-base mt-3">
            She is kind, helpful, and extremely skilled. Her attention to detail is exceptional, and she consistently produces work of the highest standard. Lieu communicates complex information clearly to both internal teams and external clients — even those with no background in finance.
          </p>
          <p className="text-gray-700 text-base mt-3">
            She’s always learning, always improving, and actively drives positive change in the workplace. I’ve seen firsthand how her programming and automation skills have saved time and made our processes far more efficient.
          </p>
          <p className="text-gray-700 text-base mt-3">
            I would not hesitate to recommend her to any future employer. She’s a brilliant asset to any team.
          </p>
        </div>
      </div>

      {/* Testimonial 2 — Duc Nguyen */}
      <div className="bg-white border shadow-sm rounded-xl p-6 flex flex-col sm:flex-row gap-5">
        <div className="flex-shrink-0">
          <Image
            src="/img/testimonials/duc-nguyen.jpeg"
            alt="Duc Nguyen"
            width={80}
            height={80}
            className="rounded-full border"
          />
        </div>
        <div>
          <div className="mb-3">
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-800">Duc Nguyen</span> · Accounts Assistant, MSc FinTech ’24<br />
              May 2025 · Reported directly to Lieu
            </p>
          </div>
          <p className="text-gray-700 text-base leading-relaxed">
            I’ve learned so much from working with Lieu. She has excellent technical knowledge — especially around tax — and her work is always detailed, organised, and deeply trusted by clients.
          </p>
          <p className="text-gray-700 text-base mt-3">
            What stands out most is her supportive nature and calm, practical problem-solving. No matter how busy things get, she always takes time to help the team.
          </p>
          <p className="text-gray-700 text-base mt-3">
            On top of that, she’s built automation tools that save us a huge amount of time. Her ability to combine deep expertise with efficiency is rare — she’s someone you can learn a lot from, and she’s a true asset to any team.
          </p>
        </div>
      </div>
    </div>
  );
};
