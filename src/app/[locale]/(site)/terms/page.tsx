import { PageHeader } from '@/components/PageHeader'
import { generateMetadata as genMeta } from "@/lib/seo";
import type { Metadata } from "next";

interface TermsPageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: TermsPageProps): Promise<Metadata> {
  const { locale } = params;
  return genMeta({
    title: "Terms of Service",
    description: "Terms of service for accounting, tax, and payroll services provided by Lieu Vo. Review our professional service agreements and policies.",
    locale,
    path: '/terms',
    noIndex: true,
  });
}

export default function TermsOfService() {
  return (
    <>
      <PageHeader title="Terms of Service" />

      {/* Content Section */}
      <div className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-8 xl:px-12">
          <div className="max-w-3xl mx-auto space-y-8">
            <p className="text-sm text-feldgrau">Last updated: July 2025</p>

            <p className="text-lg font-medium text-outer-space leading-relaxed">
              By using this website or working with me, you agree to the following terms. These terms are here to ensure clarity and professionalism in our interactions.
            </p>

            <div className="space-y-6">
              <section>
                <h2 className="text-2xl md:text-3xl font-sans font-bold text-outer-space mb-4">Services</h2>
                <p className="text-base text-feldgrau leading-relaxed">
                  I provide accounting, tax, payroll, and consultancy services as agreed in writing or via email. All advice is based on the information you provide.
                </p>
              </section>

              <section>
                <h2 className="text-2xl md:text-3xl font-sans font-bold text-outer-space mb-4">Accuracy of Information</h2>
                <p className="text-base text-feldgrau leading-relaxed">
                  You are responsible for ensuring the accuracy of documents and information shared with me. I do my best to offer accurate guidance based on the details you give.
                </p>
              </section>

              <section>
                <h2 className="text-2xl md:text-3xl font-sans font-bold text-outer-space mb-4">Liability</h2>
                <p className="text-base text-feldgrau leading-relaxed">
                  While I take every care in my work, I cannot be held liable for decisions you make based on my advice without proper context or documentation.
                </p>
              </section>

              <section>
                <h2 className="text-2xl md:text-3xl font-sans font-bold text-outer-space mb-4">Copyright</h2>
                <p className="text-base text-feldgrau leading-relaxed">
                  All content on this website is owned by me unless otherwise stated. Please don't copy or redistribute it without permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl md:text-3xl font-sans font-bold text-outer-space mb-4">Changes</h2>
                <p className="text-base text-feldgrau leading-relaxed">
                  I may update these terms from time to time. Any changes will be posted here with a new "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl md:text-3xl font-sans font-bold text-outer-space mb-4">Contact</h2>
                <p className="text-base text-feldgrau leading-relaxed">
                  If you have any questions about these terms, feel free to <a href="/contact" className="text-jungle-green underline hover:text-jungle-green">contact me</a>.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
