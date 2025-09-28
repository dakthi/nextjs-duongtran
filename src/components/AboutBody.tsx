"use client";

import React from "react";
import { legacyMediaUrl } from "@/lib/media/media-client";

const portraitOne = legacyMediaUrl('/img/lieu/lieu-2.jpeg');
const portraitTwo = legacyMediaUrl('/img/lieu/lieu-3.jpeg');
const portraitThree = legacyMediaUrl('/img/lieu/lieu-1.jpeg');

export const AboutBody = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 space-y-20">
      {/* Section 1 */}
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div>
          <img
            src={portraitOne}
            alt="About Lieu"
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>
        <div className="space-y-5 text-gray-800 text-base leading-relaxed md:text-lg">
          <h2 className="text-3xl font-bold text-gray-900">About Me</h2>
          <p>
            I didn’t start out wanting to be an accountant — but I’ve come to love this work deeply.
            Today, I help founders and small businesses understand their finances, make smarter decisions,
            and grow with clarity and confidence.
          </p>
          <p>
            When I was younger, I dreamed of becoming a doctor — it felt like the best way to help people.
            That’s what led me to study medicine. But during my first year at university, I realised something important:
            even though I admired the profession, it didn’t align with my strengths or what I wanted to do every day.
          </p>
          <p>
            Later on, I came across accounting — almost by chance. The more I studied it, the more I enjoyed it.
            Maybe it was my love for numbers, or maybe it was something deeper. I discovered that accounting
            wasn’t just about spreadsheets or tax — it was a way to support people in a very real, impactful way.
          </p>
          <p>
            Today, I work with founders and small business owners — especially those just starting out — and
            I focus on more than just getting the job done. I walk alongside them. I explain the why behind
            the numbers. I build systems that save time. I help them feel confident in decisions, not just compliant.
          </p>
        </div>
      </div>

      {/* Section 2 */}
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="md:order-2">
          <img
            src={portraitTwo}
            alt="Lieu working"
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>
        
        <div className="space-y-5 text-gray-800 text-base leading-relaxed md:text-lg md:order-1">
          <p>
            I believe accounting isn’t just a service. It’s a relationship built on trust and shared growth.
            I care deeply about the people I work with, and I take full responsibility for my clients.
            I don’t just want to tell you what you owe in tax — I want you to understand what’s really going on,
            and how to move forward with clarity.
          </p>
          <p>
            I’m completing the final stage of my ACCA qualification and have over three years of hands-on experience.
            Alongside that, I’ve taught myself automation using Python and APIs, built internal tools to save teams hours of work,
            and created documentation and training resources that scale well across growing companies.
          </p>
        </div>
      </div>

      {/* Section 3 */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <img
            src={portraitThree}
            alt="Lieu team"
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>
        
        <div className="space-y-5 text-gray-800 text-base leading-relaxed md:text-lg">
          
          <p>
            I especially love working with startups. Many founders begin with zero knowledge of tax or accounting,
            and that’s perfectly okay. Everyone starts somewhere. I help them make those first decisions —
            whether it’s choosing a business structure, understanding cost strategy, or getting ready for their first VAT return.
          </p>
          <p>
            For me, AI is not a threat — it’s a tool. I use it to automate admin, so I can focus more on
            conversations, planning, and strategy. I’ve built scripts that pull company data, rename 500+ invoice files,
            and even process PDFs to Excel in seconds — all so we can spend more time on what matters.
          </p>
          <p>
            When I work inside a company, I treat it as if it were my own. I don’t just do tasks — I look for systems
            that can improve the way the team works. That’s what I love: solving real problems, creating lasting value,
            and building clarity into the backbone of the business.
          </p>
          <p>
            I believe the best accountants aren’t just technically good — they’re curious, thoughtful, and invested
            in their clients’ success. I don’t just want to “file things” — I want to help you make better decisions,
            understand your numbers, and move forward with less stress.
          </p>
          <p>
            If you’re a founder or small business owner and want to work with someone who truly cares — about both
            your business and your peace of mind — I’d love to meet.
          </p>
        </div>
      </div>
    </section>
  );
};
