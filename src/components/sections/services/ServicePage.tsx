import React from "react";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/PageHeader";
import { Testimonials } from "@/components/Testimonials";
import { ServiceContactForm } from "@/components/ServiceContactForm";

const services = [
  {
    title: "Bookkeeping & Financial Records",
    description: "Clean, accurate bookkeeping that gives you a clear view of your business. From monthly reconciliation to year-end preparation, I ensure your records are always audit-ready and easy to understand."
  },
  {
    title: "Tax Planning & Compliance",
    description: "Navigate tax season with confidence. I help you understand your obligations, identify opportunities for tax efficiency, and ensure timely, accurate submissions to HMRC."
  },
  {
    title: "Business Structure & Strategy",
    description: "Choosing the right structure matters. Whether you're starting as a sole trader or incorporating a limited company, I'll guide you through the implications and help you make informed decisions."
  },
  {
    title: "Workflow Automation & Systems",
    description: "Save time with smarter systems. I create custom automation using Python and APIs to streamline repetitive tasks, giving you more time to focus on growing your business."
  }
];

interface ServicePageProps {
  locale: string;
}

export const ServicePage = ({ locale }: ServicePageProps) => {
  return (
    <>
      <PageHeader
        eyebrow="What I Offer"
        title="Services"
        description="I offer practical, hands-on support to small business owners and founders who want clarity, not confusion. Whether it's managing your books, planning for tax, or automating workflows, I'm here to help you move forward with confidence."
      />

      {/* Services - Horizontal Cards */}
      <div className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-8 xl:px-12">
          <div className="space-y-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white border-2 border-outer-space shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[6px_6px_0px_0px_rgba(245,158,11,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                <div className="p-8 border-l-4 border-jungle-green">
                  <h2 className="text-2xl font-sans font-bold text-outer-space mb-4 leading-tight">
                    {service.title}
                  </h2>
                  <p className="text-base text-feldgrau leading-relaxed">
                    {service.description}
                  </p>
                </div>
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

            <h2>How I Work</h2>

            <p>
              I believe in doing things properly, but without unnecessary complexity. You'll get clear communication, timely responses, and work that's done right the first time.
            </p>

            <p>
              Every business is different, so I take time to understand your specific situation before recommending solutions. Whether you need ongoing support or help with a one-off project, I'm flexible and straightforward.
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
            What Clients Say
          </h2>
          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-mint-green font-medium mb-12">
            Hear from businesses and founders who have worked with Lieu.
          </p>
        </Container>

        <Testimonials locale={locale} />
      </div>

      {/* Contact Form Section */}
      <ServiceContactForm />
    </>
  );
};
