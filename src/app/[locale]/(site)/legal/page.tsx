import { Container } from "@/components/Container";

export default function LegalPage() {
  return (
    <Container>
      <div className="max-w-3xl mx-auto space-y-12 px-4 py-12">
        <section id="terms">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Terms of Service</h2>
          <p className="text-gray-700 text-base leading-relaxed mb-3">
            By accessing or using Lieuvo, you agree to comply with and be bound by these Terms of Service. If you do not agree, you should not use this website.
          </p>
          <p className="text-gray-700 text-base leading-relaxed mb-3">
            All content on this site is provided for general informational purposes only and does not constitute professional advice. You are responsible for how you use any information provided.
          </p>
          <p className="text-gray-700 text-base leading-relaxed">
            We reserve the right to update these terms at any time. Changes will take effect immediately upon publication on this page.
          </p>
        </section>

        <section id="privacy">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Privacy Policy</h2>
          <p className="text-gray-700 text-base leading-relaxed mb-3">
            We respect your privacy. Lieuvo does not collect personal data unless you explicitly provide it (e.g. via contact forms or email).
          </p>
          <p className="text-gray-700 text-base leading-relaxed mb-3">
            Any information you submit is used solely to respond to inquiries or deliver requested services. We do not sell, rent, or share your information with third parties.
          </p>
          <p className="text-gray-700 text-base leading-relaxed">
            If analytics tools are used, they are configured to anonymise IP addresses and comply with GDPR principles.
          </p>
        </section>

        <section id="legal">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Legal Notice</h2>
          <p className="text-gray-700 text-base leading-relaxed mb-3">
            Lieuvo is a trading name used for branding and communication purposes. All trademarks, logos, and brand names are the property of their respective owners.
          </p>
          <p className="text-gray-700 text-base leading-relaxed mb-3">
            This website and its content are provided “as is.” We do not guarantee accuracy, completeness, or fitness for any particular purpose.
          </p>
          <p className="text-gray-700 text-base leading-relaxed">
            All content © {new Date().getFullYear()} Lieuvo. All rights reserved.
          </p>
        </section>
      </div>
    </Container>
  );
}
