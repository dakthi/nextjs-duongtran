"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

export const ServiceContactForm = () => {
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    setStatus("Submitting your message...");

    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      privacyPolicy: (form.elements.namedItem("privacyPolicy") as HTMLInputElement)?.checked || false,
      newsletter: (form.elements.namedItem("newsletter") as HTMLInputElement)?.checked || false,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        setStatus("✅ Message sent successfully! I'll be in touch shortly.");
        form.reset();
      } else {
        setStatus(`❌ Failed to send message: ${result.error || "Unknown error"}. Please try again.`);
      }
    } catch (err) {
      console.error("Contact form submission error:", err);
      setStatus("❌ Something went wrong. Please check your connection and try again.");
    }
  };

  return (
    <div className="pt-20 pb-12 bg-white">
      <Container>
        <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-widest text-feldgrau mb-4">
            Get Started
          </p>
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-outer-space leading-tight mb-6">
            Let's Talk
          </h2>
          <p className="text-lg text-feldgrau leading-relaxed">
            Have a question or want to discuss your needs? Fill out the form below and I'll get back to you within 2-3 working days.
          </p>
        </div>

        <div className="bg-white border-2 border-outer-space shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-semibold text-outer-space">
                Your Name (Required)
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your Full Name"
                required
                className="block w-full p-3 border-2 border-outer-space text-base focus:ring-2 focus:ring-amber-500 focus:border-jungle-green"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-semibold text-outer-space">
                Your Email (Required)
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="you@example.com"
                required
                className="block w-full p-3 border-2 border-outer-space text-base focus:ring-2 focus:ring-amber-500 focus:border-jungle-green"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block mb-2 text-sm font-semibold text-outer-space">
                Your Message (Required)
              </label>
              <textarea
                name="message"
                id="message"
                placeholder="Tell me what you need help with..."
                required
                rows={5}
                className="block w-full p-3 border-2 border-outer-space text-base resize-y focus:ring-2 focus:ring-amber-500 focus:border-jungle-green"
              ></textarea>
            </div>

            {/* Privacy Policy */}
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                name="privacyPolicy"
                id="privacyPolicy"
                required
                className="h-4 w-4 mt-1 border-2 border-outer-space focus:ring-2 focus:ring-amber-500"
              />
              <label htmlFor="privacyPolicy" className="text-sm font-medium text-feldgrau">
                I agree to the{" "}
                <Link href="/privacy-policy" className="text-jungle-green underline hover:text-jungle-green">
                  privacy policy
                </Link>
              </label>
            </div>

            {/* Newsletter (Optional) */}
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                name="newsletter"
                id="newsletter"
                className="h-4 w-4 mt-1 border-2 border-outer-space focus:ring-2 focus:ring-amber-500"
              />
              <label htmlFor="newsletter" className="text-sm font-medium text-feldgrau">
                Subscribe to occasional updates and behind-the-scenes notes from Lieu
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "Submitting your message..."}
              className="w-full px-8 py-3 text-base font-semibold text-outer-space bg-mint-green0 hover:bg-jungle-green transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
              {status === "Submitting your message..." ? "Sending..." : "Send Message"}
            </button>

            {/* Status */}
            {status && (
              <p className={`text-sm mt-4 ${status.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
                {status}
              </p>
            )}
          </form>
        </div>
        </div>
      </Container>
    </div>
  );
};
