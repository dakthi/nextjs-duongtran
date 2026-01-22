import React from "react";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/PageHeader";
import { Testimonials } from "@/components/Testimonials";
import { ServiceContactForm } from "@/components/ServiceContactForm";

const services = [
  {
    title: "University application mentoring",
    description: "Navigate the complex university application process with confidence. From selecting the right schools to crafting compelling personal statements, I guide you through every step to help you stand out."
  },
  {
    title: "Scholarship & financial aid consulting",
    description: "Discover scholarship opportunities you didn't know existed. I help you identify the best fits, prepare standout applications, and coach you through interviews to maximize your chances of success."
  },
  {
    title: "Study abroad preparation",
    description: "Dreaming of studying overseas? I'll help you prepare academically and emotionally for international education, from choosing destinations to understanding what to expect when you arrive."
  },
  {
    title: "Career guidance for young professionals",
    description: "Feeling uncertain about your career path? Together we'll explore your interests, skills, and opportunities to create a roadmap that aligns with who you are and where you want to go."
  },
  {
    title: "Personal development coaching",
    description: "Build the soft skills, confidence, and mindset that will serve you throughout life. We work on communication, goal-setting, time management, and developing genuine self-belief."
  }
];

interface ServicePageProps {
  locale: string;
}

export const ServicePage = ({ locale }: ServicePageProps) => {
  return (
    <>
      <PageHeader
        eyebrow="What I offer"
        title="Mentoring services"
        description="I work with students and young professionals who want clarity, not confusion. Whether you're preparing for university, seeking scholarships, or figuring out your career path, I'm here to guide you forward."
      />

      {/* Services - Cards */}
      <div className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-8 xl:px-12">
          <div className="space-y-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-soft hover:shadow-lg transition-all p-8 border-l-4 border-accent-2"
              >
                <h2 className="text-xl font-serif font-bold text-fg mb-3 leading-tight">
                  {service.title}
                </h2>
                <p className="text-base text-muted leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Content Section */}
      <div className="py-20 bg-card">
        <div className="max-w-3xl mx-auto px-8 xl:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-fg mb-8">
            How I work
          </h2>
          <p className="text-lg text-muted leading-relaxed mb-6">
            Every student is different, and I believe mentoring should be too. I take time to understand your unique situation, goals, and challenges before creating a personalized plan.
          </p>
          <p className="text-lg text-muted leading-relaxed">
            My approach is practical and conversational. No lectures, no pressure — just honest guidance from someone who genuinely cares about your success. Whether you need intensive support or occasional check-ins, I'm flexible and always in your corner.
          </p>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-accent">
        <Container className="text-center">
          <p className="text-sm font-medium tracking-widest mb-4 text-accent-2 uppercase">
            Testimonials
          </p>
          <h2 className="max-w-3xl mx-auto text-3xl md:text-4xl font-serif font-bold leading-tight mb-6 text-white">
            Success stories
          </h2>
          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-200 mb-12">
            Hear from students and families who have worked with Duong.
          </p>
        </Container>

        <Testimonials locale={locale} />
      </div>

      {/* Contact Form Section */}
      <ServiceContactForm />
    </>
  );
};
