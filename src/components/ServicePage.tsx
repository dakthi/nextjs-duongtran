import React from "react";
import { Container } from "@/components/Container";
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

      {/* Services - Horizontal Cards */}
      <div className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-8 xl:px-12">
          <div className="space-y-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white border-l-4 border-gray-300 hover:border-jungle-green shadow-md hover:shadow-xl transition-all rounded-r-lg p-8"
              >
                <h2 className="text-2xl font-sans font-bold text-jungle-green mb-4 leading-tight">
                  {service.title}
                </h2>
                <p className="text-base text-feldgrau leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Content Section */}
      <div className="py-20 bg-mint-green">
        <div className="max-w-5xl mx-auto px-8 xl:px-12">
          <div className="prose prose-slate prose-lg max-w-none
            prose-headings:font-sans prose-headings:font-bold prose-headings:text-outer-space prose-headings:leading-tight
            prose-h2:text-3xl prose-h2:md:text-4xl prose-h2:mb-8
            prose-p:text-lg prose-p:font-medium prose-p:text-outer-space prose-p:leading-relaxed prose-p:mb-6">

            <h2>How I work</h2>

            <p>
              Every student is different, and I believe mentoring should be too. I take time to understand your unique situation, goals, and challenges before creating a personalized plan.
            </p>

            <p>
              My approach is practical and conversational. No lectures, no pressure — just honest guidance from someone who genuinely cares about your success. Whether you need intensive support or occasional check-ins, I'm flexible and always in your corner.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-feldgrau">
        <Container className="text-center">
          <div className="text-xs font-semibold tracking-widest mb-3 text-jungle-green">
            Testimonials
          </div>
          <h2 className="max-w-3xl mx-auto text-3xl md:text-4xl font-sans font-bold leading-tight mb-6 text-white">
            Success stories
          </h2>
          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-mint-green font-medium mb-12">
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
