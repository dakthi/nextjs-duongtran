"use client";

import React from "react";
import Image from "next/image";

import { testimonials } from "./testimonialsData";

export const TestimonialBody = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-10 px-4">
      {testimonials.map((testimonial) => (
        <div
          key={testimonial.id}
          className="bg-white border shadow-sm rounded-xl p-6 flex flex-col sm:flex-row gap-5"
        >
          <div className="flex-shrink-0">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              width={80}
              height={80}
              className="rounded-full border"
            />
          </div>
          <div>
            <div className="mb-3">
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-800">{testimonial.name}</span> · {testimonial.role}
                <br />
                {testimonial.date} · {testimonial.relationship}
              </p>
            </div>
            {testimonial.body.map((paragraph, index) => (
              <p
                key={`${testimonial.id}-paragraph-${index}`}
                className={`text-gray-700 text-base leading-relaxed${index === 0 ? "" : " mt-3"}`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
