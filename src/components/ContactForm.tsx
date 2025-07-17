"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/Container";

export const ContactForm = () => {
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
      console.log("Response from contact form endpoint:", result);

      if (res.ok) {
        setStatus("✅ Message sent successfully! I’ll be in touch shortly.");
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
    <Container className="py-12 lg:py-20 px-5">
      <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-16">
        <h1 className="text-4xl font-extrabold text-[#0C1631] mb-4">Get in Touch</h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          If you&apos;re a founder or small business owner and you&apos;d like to connect, I&apos;d love to hear from you.
          Whether it&apos;s a specific question, a collaboration idea, or just something you&apos;d like to share —
          feel free to reach out.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 max-w-5xl mx-auto">
        {/* About Lieu */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-bold text-[#0C1631] mb-4">About Me</h2>
<p>
  If you&apos;re a founder or small business owner and you&apos;d like to connect, I&apos;d love to hear from you.
  Whether it&apos;s a specific question, a collaboration idea, or just something you&apos;d like to share —
  feel free to reach out.
</p>
          <p className="text-gray-600">
            I specialise in working with startups, solo founders, and small teams — and I love turning complexity
            into something calm and actionable.
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-bold text-[#0C1631] mb-4">Send a Message</h2>
          <p className="text-gray-600 mb-6">
            Fill out the form below — I usually respond within 2–3 working days.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">
                Your Name (Required)
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your Full Name"
                required
                className="block w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-black focus:border-black"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                Your Email (Required)
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="you@example.com"
                required
                className="block w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-black focus:border-black"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block mb-1 text-sm font-medium text-gray-700">
                Your Message (Required)
              </label>
              <textarea
                name="message"
                id="message"
                placeholder="Tell me what’s on your mind..."
                required
                rows={5}
                className="block w-full p-3 border border-gray-300 rounded-lg text-sm resize-y focus:ring-black focus:border-black"
              ></textarea>
            </div>

            {/* Privacy Policy */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="privacyPolicy"
                id="privacyPolicy"
                required
                className="h-4 w-4 border border-gray-300 rounded focus:ring-2 focus:ring-black accent-black"
              />
              <label htmlFor="privacyPolicy" className="text-sm font-medium text-gray-700">
                I agree to the{" "}
                <Link href="/privacy-policy" className="underline hover:text-black">
                  privacy policy
                </Link>
              </label>
            </div>

            {/* Newsletter (Optional) */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="newsletter"
                id="newsletter"
                className="h-4 w-4 border border-gray-300 rounded focus:ring-2 focus:ring-black accent-black"
              />
              <label htmlFor="newsletter" className="text-sm font-medium text-gray-700">
                Subscribe to occasional updates and behind-the-scenes notes from Lieu
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "Submitting your message..."}
              className="w-full py-3 text-sm font-semibold text-white bg-black rounded-lg shadow-md hover:bg-gray-800 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {status === "Submitting your message..." ? "Sending..." : "SEND MESSAGE"}
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
  );
};
