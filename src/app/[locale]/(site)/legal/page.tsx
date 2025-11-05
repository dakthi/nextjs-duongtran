export default function LegalPage() {
  return (
    <>
      {/* Hero Section */}
      <div className="py-20 bg-amber-50 border-b-4 border-amber-500">
        <div className="max-w-5xl mx-auto px-8 xl:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
              Legal Information
            </h1>
          </div>
        </div>
      </div>

      {/* Content Sections with alternating backgrounds */}
      <div className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-8 xl:px-12">
          <div className="max-w-3xl mx-auto space-y-12">
            <section id="terms">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-6">Terms of Service</h2>
              <div className="space-y-4 text-base text-slate-700 leading-relaxed">
                <p>
                  By accessing or using Lieuvo, you agree to comply with and be bound by these Terms of Service. If you do not agree, you should not use this website.
                </p>
                <p>
                  All content on this site is provided for general informational purposes only and does not constitute professional advice. You are responsible for how you use any information provided.
                </p>
                <p>
                  We reserve the right to update these terms at any time. Changes will take effect immediately upon publication on this page.
                </p>
              </div>
            </section>

            <section id="privacy" className="pt-12 border-t-2 border-slate-200">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-6">Privacy Policy</h2>
              <div className="space-y-4 text-base text-slate-700 leading-relaxed">
                <p>
                  We respect your privacy. Lieuvo does not collect personal data unless you explicitly provide it (e.g. via contact forms or email).
                </p>
                <p>
                  Any information you submit is used solely to respond to inquiries or deliver requested services. We do not sell, rent, or share your information with third parties.
                </p>
                <p>
                  If analytics tools are used, they are configured to anonymise IP addresses and comply with GDPR principles.
                </p>
              </div>
            </section>

            <section id="legal" className="pt-12 border-t-2 border-slate-200">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-6">Legal Notice</h2>
              <div className="space-y-4 text-base text-slate-700 leading-relaxed">
                <p>
                  Lieuvo is a trading name used for branding and communication purposes. All trademarks, logos, and brand names are the property of their respective owners.
                </p>
                <p>
                  This website and its content are provided "as is." We do not guarantee accuracy, completeness, or fitness for any particular purpose.
                </p>
                <p>
                  All content © {new Date().getFullYear()} Lieuvo. All rights reserved.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
