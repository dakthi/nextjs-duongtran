import Link from "next/link";

interface ProposalProps {
  params: { locale: string };
}

export default function ProposalPage({ params }: ProposalProps) {
  const { locale } = params;

  return (
    <div className="min-h-screen py-4 md:py-8 bg-gray-100">

      <div className="max-w-[210mm] mx-auto bg-white shadow-lg px-2 md:px-0">
        {/* Header */}
        <div className="bg-[#334155] text-white p-3 md:p-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl md:text-3xl font-bold">PROPOSAL</h1>
              <p className="text-slate-300 mt-1 text-xs md:text-base">Website development</p>
            </div>
            <div>
              <img
                src="https://cdn-duongtran.chartedconsultants.com/proposal/charted-logo-white.png"
                alt="Charted Consultants"
                className="h-6 md:h-12"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-2 md:p-8">
          {/* Friendly Intro */}
          <div className="mb-6 pb-6 border-b border-slate-200">
            <p className="text-slate-700 leading-relaxed text-sm md:text-base">
              Hope you're enjoying viewing this! To take it a step further, we'd like to suggest the following comprehensive packages designed specifically for your coaching business.
            </p>
          </div>

          {/* Table of Contents */}
          <div className="mb-6 pb-6 border-b border-slate-200">
            <h3 className="text-slate-500 text-sm font-semibold uppercase mb-3">Table of contents</h3>
            <ul className="text-sm text-slate-700 space-y-1">
              <li className="font-semibold">1. Summary and project brief</li>
              <li className="font-semibold">2. Pricing</li>
              <li className="ml-4">2.1. Base package</li>
              <li className="ml-4">2.2. Optional add-ons</li>
              <li className="ml-4">2.3. Package combinations</li>
              <li className="font-semibold">3. Design process</li>
              <li className="font-semibold">4. What you get & ownership</li>
            </ul>
          </div>

          {/* Client Info */}
          <div className="mb-8 bg-[#334155] text-white p-4 -mx-2 md:-mx-8 px-2 md:px-8">
            <h3 className="text-slate-300 text-sm font-semibold uppercase mb-2">Prepared for</h3>
            <p className="font-semibold text-lg">Duong Tran TWG</p>
          </div>

          {/* Section 1: Summary */}
          <div className="mb-0 pb-8 pt-6 px-2 md:px-8 -mx-2 md:-mx-8 bg-slate-50">
            <h2 className="text-xl font-bold text-[#334155] mb-4">1. Summary and project brief</h2>

            <div className="text-slate-700 space-y-4">
              <div>
                <p className="font-semibold mb-2">1.1. Background:</p>
                <p className="text-sm mb-2">Building a personal website for Duong Tran, founder of "Together We Grow" - a mentoring service for parents and students at international schools in Vietnam. Currently content is mainly on Facebook, but needs a professional personal platform to:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Create a structured reading experience for your content</li>
                  <li>Easy to share with potential clients - just send one link</li>
                  <li>Increase credibility (AI/search engines can find info about you)</li>
                  <li>Backup content - not dependent on Facebook</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2">1.2. Requirements:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li><strong>Tone:</strong> authentic, storytelling, not cliché/salesy</li>
                  <li><strong>Vibe:</strong> premium but approachable, conversational</li>
                  <li><strong>Pages:</strong> homepage, TWG program page, blog/articles, contact</li>
                  <li><strong>Features:</strong> admin panel for self-editing, contact form → Google Sheets</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2">1.3. Design approach:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>No separate designer to keep costs down</li>
                  <li>Clean, basic design - you send examples of sites you like</li>
                  <li>Homepage and TWG page: max 10 scrolls each (focused content)</li>
                  <li>3 revision rounds to refine the look</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 2: Pricing */}
          <div className="mb-0 pb-8 pt-6 px-2 md:px-8 -mx-2 md:-mx-8 bg-white">
          <h2 className="text-xl font-bold text-[#334155] mb-4">2. Pricing</h2>

          {/* Base Package */}
          <div className="mb-8">
            <div className="bg-[#334155] text-white px-4 py-3 mb-4">
              <h3 className="text-lg font-bold">2.1. Base package - £250</h3>
            </div>

            <h4 className="font-semibold text-[#334155] mb-3 text-base md:text-lg">2.1.1. Core features:</h4>

            {/* Mobile: Stacked cards */}
            <div className="md:hidden space-y-4 mb-6">
              <div className="border-b border-slate-200 pb-3">
                <h4 className="text-slate-700 font-semibold text-sm mb-1">2.1.1. Content management system (CMS)</h4>
                <ul className="list-disc list-inside text-slate-600 text-xs space-y-0.5">
                  <li>Full CRUD functionality for blog posts</li>
                  <li>Easy-to-use admin interface</li>
                  <li>Category management and filtering</li>
                </ul>
              </div>
              <div className="border-b border-slate-200 pb-3">
                <h4 className="text-slate-700 font-semibold text-sm mb-1">2.1.2. Landing pages</h4>
                <ul className="list-disc list-inside text-slate-600 text-xs space-y-0.5">
                  <li>Homepage design (max 10 scrolls)</li>
                  <li>TWG service page (max 10 scrolls)</li>
                  <li>Up to 3 revision rounds</li>
                  <li>Design direction help included</li>
                </ul>
              </div>
              <div className="border-b border-slate-200 pb-3">
                <h4 className="text-slate-700 font-semibold text-sm mb-1">2.1.3. Contact form integration</h4>
                <ul className="list-disc list-inside text-slate-600 text-xs space-y-0.5">
                  <li>Form submissions to your email</li>
                  <li>Auto logging to Google Sheets</li>
                  <li>Google Apps Script setup included</li>
                </ul>
              </div>
              <div className="border-b border-slate-200 pb-3">
                <h4 className="text-slate-700 font-semibold text-sm mb-1">2.1.4. Content migration</h4>
                <ul className="list-disc list-inside text-slate-600 text-xs space-y-0.5">
                  <li>All existing text content migrated</li>
                  <li>All existing images migrated</li>
                  <li>Organised into the new CMS</li>
                </ul>
              </div>
              <div className="border-b border-slate-200 pb-3">
                <h4 className="text-slate-700 font-semibold text-sm mb-1">2.1.5. Social media content package</h4>
                <ul className="list-disc list-inside text-slate-600 text-xs space-y-0.5">
                  <li>6 months of pre-prepared Facebook content</li>
                  <li>Ready to post and maintain engagement</li>
                </ul>
              </div>
            </div>

            {/* Desktop: Table */}
            <div className="hidden md:block overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-[#334155]">
                  <th className="text-left py-2 text-[#334155] font-semibold w-1/3">Feature</th>
                  <th className="text-left py-2 text-[#334155] font-semibold">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="py-3 text-slate-700 font-semibold align-top">2.1.1.1. Content management system (CMS)</td>
                  <td className="py-3 text-slate-600">
                    <ul className="list-disc list-inside space-y-0.5">
                      <li>Full CRUD functionality for blog posts (Create, Read, Update, Delete)</li>
                      <li>Easy-to-use admin interface for managing all content</li>
                      <li>Category management and filtering</li>
                    </ul>
                  </td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-3 text-slate-700 font-semibold align-top">2.1.1.2. Landing pages</td>
                  <td className="py-3 text-slate-600">
                    <ul className="list-disc list-inside space-y-0.5">
                      <li>Homepage design and development (max 10 scrolls)</li>
                      <li>Together We Grow (TWG) service page (max 10 scrolls)</li>
                      <li>Up to 3 revision rounds for these pages</li>
                      <li>I'll help you with design direction</li>
                      <li>You can send sites you like for inspiration</li>
                    </ul>
                  </td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-3 text-slate-700 font-semibold align-top">2.1.1.3. Contact form integration</td>
                  <td className="py-3 text-slate-600">
                    <ul className="list-disc list-inside space-y-0.5">
                      <li>Form submissions sent to your email</li>
                      <li>Automatic logging to Google Sheets for tracking</li>
                      <li>Google Apps Script setup included (uses your Google account)</li>
                    </ul>
                  </td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-3 text-slate-700 font-semibold align-top">2.1.1.4. Content migration</td>
                  <td className="py-3 text-slate-600">
                    <ul className="list-disc list-inside space-y-0.5">
                      <li>Migration of all existing text content as-is</li>
                      <li>Migration of all existing images</li>
                      <li>Organised into the new CMS</li>
                    </ul>
                  </td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-3 text-slate-700 font-semibold align-top">2.1.1.5. Social media content package</td>
                  <td className="py-3 text-slate-600">
                    <ul className="list-disc list-inside space-y-0.5">
                      <li>6 months of pre-prepared content for Facebook</li>
                      <li>Ready to post and maintain engagement</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
            </div>

          </div>

          {/* Optional Add-Ons */}
          <h3 className="text-lg font-bold text-[#334155] mb-4">2.2. Optional add-ons</h3>

          {/* Calendar Booking */}
          <div className="mb-6">
            <div className="bg-[#C9A227] text-white px-4 py-2 mb-3">
              <h4 className="font-bold">2.2.1. Calendar booking system - +£50 (Total: £300)</h4>
            </div>
            <h4 className="font-semibold text-slate-800 mb-2 text-sm">Features:</h4>
            <ul className="list-disc list-inside text-slate-600 text-sm ml-2 md:ml-4 space-y-0.5">
              <li>Integration with your Google Calendar</li>
              <li>Real-time availability checking (shows busy/free times)</li>
              <li>Client self-service booking for coaching sessions</li>
              <li>Automatic calendar sync when bookings are made</li>
              <li>Email confirmations for both you and clients</li>
            </ul>
          </div>

          {/* Assessment Scorecard */}
          <div className="mb-6">
            <div className="bg-[#C9A227] text-white px-4 py-2 mb-3">
              <h4 className="font-bold">2.2.2. Assessment scorecard system - +£150 (Total: £400)</h4>
            </div>
            <p className="text-sm text-slate-700 mb-3">Custom quiz/assessment tool (like ScoreApp, but you own it). ScoreApp charges £348-£888/year - you pay £150 once and own it forever.</p>
            <h4 className="font-semibold text-slate-800 mb-2 text-sm">Features:</h4>
            <ul className="list-disc list-inside text-slate-600 text-sm ml-2 md:ml-4 space-y-0.5">
              <li>Custom assessments with scoring and personalised results</li>
              <li>Lead capture with Google Sheets export</li>
              <li>Branded design matching your website</li>
            </ul>
          </div>

          {/* Ebook Design */}
          <div className="mb-6">
            <div className="bg-[#C9A227] text-white px-4 py-2 mb-3">
              <h4 className="font-bold">2.2.3. Ebook / lead magnet design - +£150</h4>
            </div>
            <h4 className="font-semibold text-slate-800 mb-2 text-sm">Features:</h4>
            <ul className="list-disc list-inside text-slate-600 text-sm ml-2 md:ml-4 space-y-0.5">
              <li>Professional ebook design matching your brand</li>
              <li>Cover design and interior layout</li>
              <li>PDF format ready for download/distribution</li>
              <li>Perfect for lead magnets, guides, or resources for your audience</li>
            </ul>
          </div>

          {/* Facebook Posts Migration */}
          <div className="mb-8">
            <div className="bg-[#C9A227] text-white px-4 py-2 mb-3">
              <h4 className="font-bold">2.2.4. Facebook posts migration - +£50</h4>
            </div>
            <h4 className="font-semibold text-slate-800 mb-2 text-sm">Features:</h4>
            <ul className="list-disc list-inside text-slate-600 text-sm ml-2 md:ml-4 space-y-0.5">
              <li>Crawl and migrate all your existing Facebook posts to the website</li>
              <li>Includes posts from Together We Grow Facebook page</li>
              <li>You can edit and select which posts to show/hide</li>
              <li>All content backed up and searchable on your own platform</li>
            </ul>
          </div>

          {/* Package Combinations Table */}
          <div className="mb-8 pb-8 border-b-2 border-slate-200">
            <h3 className="text-lg font-bold text-[#334155] mb-4">2.3. Package combinations</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-[#334155]">
                  <th className="text-left py-3 text-[#334155] font-semibold uppercase">Package</th>
                  <th className="text-left py-3 text-[#334155] font-semibold uppercase">Features</th>
                  <th className="text-right py-3 text-[#334155] font-semibold uppercase">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="py-3 text-slate-700 font-semibold">Base</td>
                  <td className="py-3 text-slate-600">CMS, landing pages, contact form, migration, 6mo social content</td>
                  <td className="text-right py-3 text-slate-700 font-bold">£250</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-3 text-slate-700 font-semibold">Base + booking</td>
                  <td className="py-3 text-slate-600">Base + calendar booking system</td>
                  <td className="text-right py-3 text-slate-700 font-bold">£300</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-3 text-slate-700 font-semibold">Base + FB migration</td>
                  <td className="py-3 text-slate-600">Base + migrate all Facebook posts to website</td>
                  <td className="text-right py-3 text-slate-700 font-bold">£300</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-3 text-slate-700 font-semibold">Base + scorecard</td>
                  <td className="py-3 text-slate-600">Base + assessment scorecard system</td>
                  <td className="text-right py-3 text-slate-700 font-bold">£400</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-3 text-slate-700 font-semibold">Base + ebook</td>
                  <td className="py-3 text-slate-600">Base + ebook/lead magnet design</td>
                  <td className="text-right py-3 text-slate-700 font-bold">£400</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-3 text-slate-700 font-semibold">Base + booking + scorecard</td>
                  <td className="py-3 text-slate-600">Base + booking + scorecard</td>
                  <td className="text-right py-3 text-slate-700 font-bold">£450</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-3 text-[#C9A227] font-bold">Complete package</td>
                  <td className="py-3 text-slate-700 font-semibold">Base + booking + scorecard + ebook + FB migration</td>
                  <td className="text-right py-3 text-[#C9A227] font-bold text-lg">£650</td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>

          {/* Section 3: Design Process */}
          <div className="mb-0 pb-8 pt-6 px-2 md:px-8 -mx-2 md:-mx-8 bg-slate-50">
            <h2 className="text-xl font-bold text-[#334155] mb-4">3. Design process - how we'll work together</h2>
            <p className="font-semibold text-slate-700 mb-3 text-sm">Since we're not involving a designer:</p>

            <div className="space-y-3 text-sm">
              <div>
                <h4 className="font-semibold text-slate-800 mb-1">3.1. You send me examples of websites you like</h4>
                <ul className="list-disc list-inside text-slate-600 ml-2 md:ml-4 space-y-0.5 text-xs">
                  <li>Share 3-5 sites with styles/layouts you're drawn to</li>
                  <li>Note what you like (colors, spacing, fonts, section layouts, etc.)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-1">3.2. I'll help guide the design</h4>
                <ul className="list-disc list-inside text-slate-600 ml-2 md:ml-4 space-y-0.5 text-xs">
                  <li>Recommend what works well for coaching websites</li>
                  <li>Suggest clean, professional approaches</li>
                  <li>Keep it simple and conversion-focused</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-1">3.3. Revision policy (3 rounds included):</h4>
                <ul className="list-disc list-inside text-slate-600 ml-2 md:ml-4 space-y-0.5 text-xs">
                  <li>Round 1: Initial design feedback, adjust colors/fonts/spacing</li>
                  <li>Round 2: Refine based on your inspiration sites</li>
                  <li>Round 3: Final polish</li>
                </ul>
                <p className="text-slate-600 ml-2 md:ml-4 mt-2 text-xs">What's included: style modifications (colors, fonts, spacing), content updates, minor layout adjustments. Tracked via revision sheet.</p>
                <p className="text-slate-500 italic ml-2 md:ml-4 mt-1 text-xs">*Structural changes (major layout overhauls, new sections) not included</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-1">3.4. Homepage & TWG constraints:</h4>
                <ul className="list-disc list-inside text-slate-600 ml-2 md:ml-4 space-y-0.5 text-xs">
                  <li>Maximum 10 scrolls each (keeps content focused)</li>
                  <li>Essential sections only</li>
                  <li>I'll help you prioritize what matters most</li>
                </ul>
              </div>
            </div>

            <p className="mt-4 text-slate-700 font-semibold text-sm">
              This approach keeps costs down while still giving you a professional, clean website that reflects your brand.
            </p>
          </div>

          {/* Section 4: What You Own */}
          <div className="mb-0 pb-8 pt-6 px-2 md:px-8 -mx-2 md:-mx-8 bg-white">
            <h2 className="text-xl font-bold text-[#334155] mb-4">4. What you get & ownership</h2>

            <div className="text-slate-700 space-y-2 mb-4">
              <p className="font-semibold">Full ownership - no lock-in:</p>
              <p className="text-sm">You will receive the complete source code and full database (PostgreSQL pg_dump). Built with modern tech stack (Next.js, React, TypeScript, Tailwind CSS) - you own everything and can move anywhere.</p>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <h4 className="font-semibold text-slate-800 mb-1">Your responsibility:</h4>
                <ul className="list-disc list-inside text-slate-600 ml-2 md:ml-4 space-y-0.5 text-xs">
                  <li>Purchase your own domain name (e.g., duongtran.com)</li>
                  <li>Typical cost: £10-15/year from registrars like Namecheap, GoDaddy, or Cloudflare</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-1">Hosting included:</h4>
                <ul className="list-disc list-inside text-slate-600 ml-2 md:ml-4 space-y-0.5 text-xs">
                  <li>First year FREE - hosted on my VPS at no extra cost</li>
                  <li>Simple 5-minute instructions to point your domain to the server</li>
                  <li>SSL certificate setup (HTTPS) - free and automatic</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-1">After year 1 - your choice:</h4>
                <ul className="list-disc list-inside text-slate-600 ml-2 md:ml-4 space-y-0.5 text-xs">
                  <li>Option A: Continue with me for £100/year - includes hosting, maintenance, uptime monitoring, and support</li>
                  <li>Option B: Move to your own hosting - I'll provide full source code + database dump, no questions asked</li>
                </ul>
              </div>
            </div>

            <p className="mt-4 text-slate-600 text-sm">
              No complicated technical setup on your end. Just buy the domain, follow my quick instructions to update the DNS settings, and you're live.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 bg-slate-50 p-8">
          <div className="text-center">
            <p className="text-[#334155] text-lg font-medium mb-2">Ready to get started?</p>
            <p className="text-sm text-slate-600 mb-4">Let's build your professional coaching website together.</p>
            <Link
              href={`/${locale}/contact`}
              className="inline-block bg-[#334155] text-white px-8 py-3 rounded hover:bg-slate-700 transition-colors font-semibold"
            >
              Contact me to begin
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
