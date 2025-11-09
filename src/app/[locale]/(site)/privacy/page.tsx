import { PageHeader } from '@/components/PageHeader'

export default function PrivacyPolicy() {
  return (
    <>
      <PageHeader title="Privacy Policy" />

      {/* Content Section */}
      <div className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-8 xl:px-12">
          <div className="max-w-3xl mx-auto space-y-8">
            <p className="text-sm text-feldgrau">Last updated: July 2025</p>

            <p className="text-lg font-medium text-outer-space leading-relaxed">
              Your privacy matters to me. This Privacy Policy explains how I collect, use, and protect your information when you visit my website or work with me.
            </p>

            <div className="space-y-6">
              <section>
                <h2 className="text-2xl md:text-3xl font-sans font-bold text-outer-space mb-4">What I Collect</h2>
                <ul className="list-disc pl-6 space-y-2 text-base text-feldgrau leading-relaxed">
                  <li>Your name, email, and message when you fill out my contact form</li>
                  <li>Any additional information you choose to share during our communication</li>
                  <li>Basic usage data (like page views) to help improve the website</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl md:text-3xl font-sans font-bold text-outer-space mb-4">How I Use Your Information</h2>
                <p className="text-base text-feldgrau leading-relaxed">
                  I only use your data to respond to enquiries, provide services, or share relevant updates if you&apos;ve opted in. I do not sell or share your data with third parties.
                </p>
              </section>

              <section>
                <h2 className="text-2xl md:text-3xl font-sans font-bold text-outer-space mb-4">Your Rights</h2>
                <p className="text-base text-feldgrau leading-relaxed">
                  You can request to access, update, or delete your personal data at any time by using the <a href="/contact" className="text-jungle-green underline hover:text-jungle-green">contact form</a>.
                </p>
              </section>

              <section>
                <h2 className="text-2xl md:text-3xl font-sans font-bold text-outer-space mb-4">Cookies</h2>
                <p className="text-base text-feldgrau leading-relaxed">
                  This website may use minimal cookies to ensure a smooth experience. No tracking or advertising cookies are used.
                </p>
              </section>

              <section>
                <h2 className="text-2xl md:text-3xl font-sans font-bold text-outer-space mb-4">Questions?</h2>
                <p className="text-base text-feldgrau leading-relaxed">
                  If you have any questions about this policy, feel free to get in touch.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
