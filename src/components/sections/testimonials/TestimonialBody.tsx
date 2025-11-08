"use client";

import React from "react";
import Image from "next/image";

import { testimonials } from "./testimonialsData";
import { isMediaRemoteUrl } from "@/lib/media/media-client";

export const TestimonialBody = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-amber-50 border-2 border-slate-800 shadow-md hover:shadow-xl transition-shadow p-8"
            >
              <div className="text-6xl text-amber-500 leading-none mb-4">&quot;</div>

              <div className="space-y-4">
                {testimonial.body.map((paragraph, index) => (
                  <p
                    key={`${testimonial.id}-paragraph-${index}`}
                    className="text-base text-slate-700 leading-relaxed italic"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t-2 border-amber-500 flex items-center gap-4">
                {testimonial.image && (
                  <div className="flex-shrink-0">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={56}
                      height={56}
                      className="rounded-full border-2 border-slate-800"
                      unoptimized={isMediaRemoteUrl(testimonial.image)}
                    />
                  </div>
                )}
                <div>
                  <p className="font-bold text-slate-900">{testimonial.name}</p>
                  {testimonial.role && (
                    <p className="text-sm text-slate-700">{testimonial.role}</p>
                  )}
                  {testimonial.dateLabel && (
                    <p className="text-xs text-slate-600">{testimonial.dateLabel}</p>
                  )}
                  {testimonial.relationship && (
                    <p className="text-xs text-slate-600">{testimonial.relationship}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
