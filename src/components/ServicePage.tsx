"use client";

import React from "react";
import { Container } from "@/components/Container";

export const ServicePage = () => {
  return (
    <Container className="max-w-7xl mx-auto py-12 px-4">
      {/* Page Heading */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Ask Me Anything</h1>
        <p className="text-gray-700 text-base max-w-2xl mx-auto">
          Outside of full-time work, I offer direct support to founders navigating early-stage business challenges — from finance to structure and clarity.
        </p>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-white border shadow-sm rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Why I Do This</h2>
          <p className="text-gray-700 text-sm">
            I work closely with small business owners who want clarity, not confusion — and who need a calm, experienced voice to help them make smart financial decisions.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white border shadow-sm rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">What We Can Cover</h2>
          <ul className="list-disc pl-4 text-gray-700 text-sm space-y-1">
            <li>Bookkeeping or accounting issues</li>
            <li>Tax concerns or upcoming deadlines</li>
            <li>Choosing the right business structure</li>
            <li>Costing, pricing, and margins</li>
            <li>Workflow and internal systems</li>
            <li>How numbers affect business decisions</li>
          </ul>
        </div>

        {/* Card 3 */}
        <div className="bg-white border shadow-sm rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Format & Booking</h2>
          <ul className="list-disc pl-4 text-gray-700 text-sm space-y-1">
            <li>1-hour online call (Zoom or Google Meet)</li>
            <li>Flexible scheduling to fit your week</li>
            <li>Brief discovery included in first call</li>
          </ul>
        </div>

        {/* Card 4 */}
        <div className="bg-white border shadow-sm rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">What You Get</h2>
          <p className="text-gray-700 text-sm">
            Practical answers, non-judgmental advice, and better clarity. Whether you need strategy, systems, or peace of mind — this is a space to get unstuck.
          </p>
        </div>
      </div>
    </Container>
  );
};
