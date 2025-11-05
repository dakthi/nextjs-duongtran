"use client";

import React, { useState } from "react";
import Link from "next/link";

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
      <div className="max-w-3xl mx-auto px-8 xl:px-12">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-4">
            Get Started
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 leading-tight mb-6">
            Let's Talk
          </h2>
          <p className="text-lg text-slate-700 leading-relaxed">
            Have a question or want to discuss your needs? Fill out the form below and I'll get back to you within 2-3 working days.
          </p>
        </div>

        <div className="bg-white border-2 border-slate-800 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-semibold text-slate-900">
                Your Name (Required)
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your Full Name"
                required
                className="block w-full p-3 border-2 border-slate-800 text-base focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-semibold text-slate-900">
                Your Email (Required)
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="you@example.com"
                required
                className="block w-full p-3 border-2 border-slate-800 text-base focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block mb-2 text-sm font-semibold text-slate-900">
                Your Message (Required)
              </label>
              <textarea
                name="message"
                id="message"
                placeholder="Tell me what you need help with..."
                required
                rows={5}
                className="block w-full p-3 border-2 border-slate-800 text-base resize-y focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              ></textarea>
            </div>

            {/* Privacy Policy */}
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                name="privacyPolicy"
                id="privacyPolicy"
                required
                className="h-4 w-4 mt-1 border-2 border-slate-800 focus:ring-2 focus:ring-amber-500"
              />
              <label htmlFor="privacyPolicy" className="text-sm font-medium text-slate-700">
                I agree to the{" "}
                <Link href="/privacy-policy" className="text-amber-600 underline hover:text-amber-500">
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
                className="h-4 w-4 mt-1 border-2 border-slate-800 focus:ring-2 focus:ring-amber-500"
              />
              <label htmlFor="newsletter" className="text-sm font-medium text-slate-700">
                Subscribe to occasional updates and behind-the-scenes notes from Lieu
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "Submitting your message..."}
              className="w-full px-8 py-3 text-base font-semibold text-slate-900 bg-amber-500 hover:bg-amber-400 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
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
    </div>
  );
};
