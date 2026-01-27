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
              <li className="font-semibold">1. Project overview</li>
              <li className="ml-4">1.1. Background</li>
              <li className="ml-4">1.2. What you get & ownership</li>
              <li className="ml-4">1.3. Design process</li>
              <li className="font-semibold">2. Pricing</li>
              <li className="ml-4">2.1. Base package</li>
              <li className="ml-4">2.2. Optional add-ons</li>
              <li className="ml-4">2.3. Package combinations</li>
              <li className="ml-4">2.4. Timeline</li>
              <li className="ml-4">2.5. Payment terms</li>
              <li className="font-semibold">3. Next steps</li>
            </ul>
          </div>

          {/* Client Info */}
          <div className="mb-8 bg-[#334155] text-white p-4 -mx-2 md:-mx-8 px-2 md:px-8">
            <h3 className="text-slate-300 text-sm font-semibold uppercase mb-2">Prepared for</h3>
            <p className="font-semibold text-lg">Duong Tran TWG</p>
          </div>

          {/* Section 1: Project Overview */}
          <div className="mb-0 pb-8 pt-6 px-2 md:px-8 -mx-2 md:-mx-8 bg-slate-50">
            <h2 className="text-xl font-bold text-[#334155] mb-4">1. Project overview</h2>

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
                <p className="text-sm mt-3"><strong>Tone & feel:</strong> authentic, storytelling, premium but approachable - not cliché or salesy.</p>
              </div>

            </div>

            {/* 1.2 What You Own */}
            <h3 className="text-lg font-bold text-[#334155] mt-6 mb-4">1.2. What you get & ownership</h3>

            <p className="text-sm text-slate-600 mb-4">
              Think of a website like a house: <strong>pages</strong> are the rooms (homepage, blog, contact), <strong>the CMS</strong> (content management system) is like a control panel that lets you add/edit content without touching code, and <strong>features</strong> are the utilities (contact forms, booking systems). Everything works together so visitors can browse your content and get in touch.
            </p>

            <div className="text-slate-700 space-y-2 mb-4">
              <p className="font-semibold">Full ownership - no lock-in:</p>
              <p className="text-sm">You will receive the complete source code and full database (PostgreSQL pg_dump). Built with modern tech stack (Next.js, React, TypeScript, Tailwind CSS) - you own everything and can move anywhere.</p>
            </div>

            {/* Mobile: Stacked cards */}
            <div className="md:hidden space-y-4 mb-6">
              <div className="border-b border-slate-200 pb-3">
                <h4 className="text-slate-700 font-semibold text-sm mb-1">1.2.1. Your responsibility</h4>
                <ul className="list-disc list-inside text-slate-600 text-xs space-y-0.5">
                  <li>Purchase your own domain name (e.g., duongtran.com)</li>
                  <li>Typical cost: £10-15/year from registrars like Namecheap, GoDaddy, or Cloudflare</li>
                  <li>Simple 5-minute instructions provided to point your domain to the server</li>
                </ul>
              </div>
              <div className="border-b border-slate-200 pb-3">
                <h4 className="text-slate-700 font-semibold text-sm mb-1">1.2.2. Hosting included</h4>
                <ul className="list-disc list-inside text-slate-600 text-xs space-y-0.5">
                  <li>First year FREE - hosted on my VPS at no extra cost</li>
                  <li>Includes maintenance, uptime monitoring, and support</li>
                  <li>SSL certificate setup (HTTPS)</li>
                </ul>
              </div>
              <div className="border-b border-slate-200 pb-3">
                <h4 className="text-slate-700 font-semibold text-sm mb-1">1.2.3. After year 1 - your choice</h4>
                <ul className="list-disc list-inside text-slate-600 text-xs space-y-0.5">
                  <li>Option A: Continue with me for £100/year - includes hosting, maintenance, uptime monitoring, and support</li>
                  <li>Option B: Move to your own hosting - I'll provide full source code + database dump, no questions asked</li>
                </ul>
              </div>
            </div>

            {/* Desktop: Table */}
            <div className="hidden md:block overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-[#334155]">
                    <th className="text-left py-2 text-[#334155] font-semibold w-1/3">Item</th>
                    <th className="text-left py-2 text-[#334155] font-semibold">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-200">
                    <td className="py-3 text-slate-700 font-semibold align-top">1.2.1. Your responsibility</td>
                    <td className="py-3 text-slate-600">
                      <ul className="list-disc ml-4 space-y-0.5">
                        <li>Purchase your own domain name (e.g., duongtran.com)</li>
                        <li>Typical cost: £10-15/year from registrars like Namecheap, GoDaddy, or Cloudflare</li>
                        <li>Simple 5-minute instructions provided to point your domain to the server</li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-3 text-slate-700 font-semibold align-top">1.2.2. Hosting included</td>
                    <td className="py-3 text-slate-600">
                      <ul className="list-disc ml-4 space-y-0.5">
                        <li>First year FREE - hosted on my VPS at no extra cost</li>
                        <li>Includes maintenance, uptime monitoring, and support</li>
                        <li>SSL certificate setup (HTTPS)</li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-3 text-slate-700 font-semibold align-top">1.2.3. After year 1 - your choice</td>
                    <td className="py-3 text-slate-600">
                      <ul className="list-disc ml-4 space-y-0.5">
                        <li>Option A: Continue with me for £100/year - includes hosting, maintenance, uptime monitoring, and support</li>
                        <li>Option B: Move to your own hosting - I'll provide full source code + database dump, no questions asked</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-slate-600 text-sm">
              No complicated technical setup on your end. Just buy the domain, follow my quick instructions to update the DNS settings, and you're live.
            </p>

            {/* 1.3 Design Process */}
            <h3 className="text-lg font-bold text-[#334155] mt-6 mb-4">1.3. Design process</h3>
            <p className="font-semibold text-slate-700 mb-3 text-sm">Since we're not involving a designer:</p>

            <div className="space-y-3 text-sm">
              <div>
                <h4 className="font-semibold text-slate-800 mb-1">1.3.1. You send me examples of websites you like</h4>
                <ul className="list-disc list-inside text-slate-600 ml-2 md:ml-4 space-y-0.5 text-xs">
                  <li>Share 3-5 sites with styles/layouts you're drawn to</li>
                  <li>Note what you like (colours, spacing, fonts, section layouts, etc.)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-1">1.3.2. I'll help guide the design</h4>
                <ul className="list-disc list-inside text-slate-600 ml-2 md:ml-4 space-y-0.5 text-xs">
                  <li>Recommend what works well for coaching websites</li>
                  <li>Suggest clean, professional approaches</li>
                  <li>Keep it simple and conversion-focused</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-1">1.3.3. Revision policy:</h4>
                <ul className="list-disc list-inside text-slate-600 ml-2 md:ml-4 space-y-0.5 text-xs">
                  <li>3 revision rounds included for refining the design</li>
                  <li>Style changes, content updates, adding/adjusting sections and components</li>
                  <li>Flexible approach - we'll work together to get it right</li>
                </ul>
                <p className="text-slate-500 italic ml-2 md:ml-4 mt-2 text-xs">*New backend features or complex functionality beyond the original scope would be quoted separately</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-1">1.3.4. Homepage & TWG constraints:</h4>
                <ul className="list-disc list-inside text-slate-600 ml-2 md:ml-4 space-y-0.5 text-xs">
                  <li>Maximum 10 scrolls each (keeps content focused)</li>
                  <li>Essential sections only</li>
                  <li>I'll help you prioritise what matters most</li>
                </ul>
              </div>
            </div>

            <p className="mt-4 text-slate-700 font-semibold text-sm">
              This approach keeps costs down while still giving you a professional, clean website that reflects your brand.
            </p>

          </div>

          {/* Section 2: Pricing */}
          <div className="mb-0 pb-8 pt-6 px-2 md:px-8 -mx-2 md:-mx-8 bg-white">
          <h2 className="text-xl font-bold text-[#334155] mb-4">2. Pricing</h2>

          {/* Base Package */}
          <div className="mb-8">
            <div className="bg-[#334155] text-white px-4 py-3 mb-4">
              <h3 className="text-lg font-bold">2.1. Base package - £250</h3>
            </div>

            <div className="mb-4 text-sm text-slate-700">
              <p className="font-semibold mb-2">Pages included:</p>
              <ul className="list-disc list-inside text-slate-600 ml-2 md:ml-4 space-y-0.5 text-xs">
                <li>Homepage</li>
                <li>Together We Grow (TWG) program page</li>
                <li>Blog/articles section</li>
                <li>Individual blog post page</li>
                <li>Contact page</li>
              </ul>
            </div>

            <h4 className="font-semibold text-[#334155] mb-3 text-base md:text-lg">2.1.1. Core features:</h4>

            {/* Mobile: Stacked cards */}
            <div className="md:hidden space-y-4 mb-6">
              <div className="border-b border-slate-200 pb-3">
                <h4 className="text-slate-700 font-semibold text-sm mb-1">2.1.1.1. Content management system (CMS)</h4>
                <ul className="list-disc list-inside text-slate-600 text-xs space-y-0.5">
                  <li>Full CRUD functionality for blog posts</li>
                  <li>Easy-to-use admin interface</li>
                  <li>Category management and filtering</li>
                </ul>
              </div>
              <div className="border-b border-slate-200 pb-3">
                <h4 className="text-slate-700 font-semibold text-sm mb-1">2.1.1.2. Landing pages</h4>
                <ul className="list-disc list-inside text-slate-600 text-xs space-y-0.5">
                  <li>Homepage design (max 10 scrolls)</li>
                  <li>TWG service page (max 10 scrolls)</li>
                  <li>Design direction help included</li>
                </ul>
              </div>
              <div className="border-b border-slate-200 pb-3">
                <h4 className="text-slate-700 font-semibold text-sm mb-1">2.1.1.3. Contact form integration</h4>
                <ul className="list-disc list-inside text-slate-600 text-xs space-y-0.5">
                  <li>Form submissions to your email</li>
                  <li>Auto logging to Google Sheets</li>
                  <li>Google Apps Script setup included</li>
                </ul>
              </div>
              <div className="border-b border-slate-200 pb-3">
                <h4 className="text-slate-700 font-semibold text-sm mb-1">2.1.1.4. Content migration</h4>
                <ul className="list-disc list-inside text-slate-600 text-xs space-y-0.5">
                  <li>All existing text content migrated</li>
                  <li>All existing images migrated</li>
                  <li>Organised into the new CMS</li>
                </ul>
              </div>
              <div className="border-b border-slate-200 pb-3">
                <h4 className="text-slate-700 font-semibold text-sm mb-1">2.1.1.5. Social media content package</h4>
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
              <h4 className="font-bold">2.2.1. Calendar booking system - +£50</h4>
            </div>
            <p className="text-sm text-slate-700 mb-3">Like Calendly, but built into your website. Clients can book sessions directly without leaving your site.</p>
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
              <h4 className="font-bold">2.2.2. Assessment scorecard system - +£150</h4>
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
          <div className="mb-8">
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
                  <td className="py-3 text-slate-700 font-semibold">Starter</td>
                  <td className="py-3 text-slate-600">CMS, landing pages, contact form, migration, 6mo social content</td>
                  <td className="text-right py-3 text-slate-700 font-bold">£250</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-3 text-slate-700 font-semibold">Practical</td>
                  <td className="py-3 text-slate-600">Starter + calendar booking system</td>
                  <td className="text-right py-3 text-slate-700 font-bold">£300</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-3 text-slate-700 font-semibold">Archive</td>
                  <td className="py-3 text-slate-600">Starter + migrate all Facebook posts to website</td>
                  <td className="text-right py-3 text-slate-700 font-bold">£300</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-3 text-slate-700 font-semibold">Assessor</td>
                  <td className="py-3 text-slate-600">Starter + assessment scorecard system</td>
                  <td className="text-right py-3 text-slate-700 font-bold">£400</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-3 text-slate-700 font-semibold">Publisher</td>
                  <td className="py-3 text-slate-600">Starter + ebook/lead magnet design</td>
                  <td className="text-right py-3 text-slate-700 font-bold">£400</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-3 text-slate-700 font-semibold">Growth</td>
                  <td className="py-3 text-slate-600">Starter + booking + scorecard</td>
                  <td className="text-right py-3 text-slate-700 font-bold">£450</td>
                </tr>
                <tr>
                  <td className="py-3 text-[#C9A227] font-bold">Relaunch</td>
                  <td className="py-3 text-[#C9A227] font-semibold">Starter + booking + scorecard + ebook + FB migration</td>
                  <td className="text-right py-3 text-[#C9A227] font-bold text-lg">£650</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Timeline */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-[#334155] mb-4">2.4. Timeline</h3>
            <div className="space-y-3 text-sm mb-6">
              <div>
                <h4 className="font-semibold text-slate-800 mb-1">2.4.1. Estimated delivery:</h4>
                <ul className="list-disc list-inside text-slate-600 ml-2 md:ml-4 space-y-0.5 text-xs">
                  <li>Starter package: 2 weeks from deposit</li>
                  <li>With add-ons: 3-4 weeks from deposit (depending on options chosen)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-1">2.4.2. Revision process:</h4>
                <ul className="list-disc list-inside text-slate-600 ml-2 md:ml-4 space-y-0.5 text-xs">
                  <li>3 revision rounds for Starter package (homepage, TWG page, overall styling)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">2.4.3. Add-on timelines:</h4>

                {/* Mobile: Stacked cards */}
                <div className="md:hidden space-y-2 text-xs">
                  <div className="flex justify-between border-b border-slate-200 pb-1">
                    <span className="text-slate-700 font-semibold">Calendar booking</span>
                    <span className="text-slate-600">+3 days, 1 revision</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1">
                    <span className="text-slate-700 font-semibold">Assessment scorecard</span>
                    <span className="text-slate-600">+1 week, 2 revisions</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1">
                    <span className="text-slate-700 font-semibold">Ebook design</span>
                    <span className="text-slate-600">+1 week, 2 revisions</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1">
                    <span className="text-slate-700 font-semibold">Facebook migration</span>
                    <span className="text-slate-600">+3 days, 1 revision</span>
                  </div>
                </div>

                {/* Desktop: Table */}
                <div className="hidden md:block">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-slate-300">
                        <th className="text-left py-1 text-slate-700 font-semibold">Add-on</th>
                        <th className="text-center py-1 text-slate-700 font-semibold">Extra time</th>
                        <th className="text-right py-1 text-slate-700 font-semibold">Revisions</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-600">
                      <tr className="border-b border-slate-200">
                        <td className="py-1">Calendar booking</td>
                        <td className="text-center py-1">+3 days</td>
                        <td className="text-right py-1">1 round</td>
                      </tr>
                      <tr className="border-b border-slate-200">
                        <td className="py-1">Assessment scorecard</td>
                        <td className="text-center py-1">+1 week</td>
                        <td className="text-right py-1">2 rounds</td>
                      </tr>
                      <tr className="border-b border-slate-200">
                        <td className="py-1">Ebook design</td>
                        <td className="text-center py-1">+1 week</td>
                        <td className="text-right py-1">2 rounds</td>
                      </tr>
                      <tr className="border-b border-slate-200">
                        <td className="py-1">Facebook migration</td>
                        <td className="text-center py-1">+3 days</td>
                        <td className="text-right py-1">1 round</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-1">2.4.4. Feedback deadlines:</h4>
                <ul className="list-disc list-inside text-slate-600 ml-2 md:ml-4 space-y-0.5 text-xs">
                  <li>Each revision round: client has 5 days to provide feedback after receiving draft</li>
                  <li>If no feedback within 5 days, revision round is considered approved</li>
                  <li>Unused revision rounds cannot be carried forward</li>
                  <li>Delays in feedback may extend the delivery timeline</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-1">2.4.5. Delivery commitment:</h4>
                <ul className="list-disc ml-6 text-slate-600 space-y-0.5 text-xs">
                  <li>Exact delivery date confirmed upon receiving deposit</li>
                  <li>If Charted Consultants delivers late (excluding client-caused delays), £20 discount per day beyond the deadline applied to final balance</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Payment Terms */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-[#334155] mb-4">2.5. Payment terms</h3>
            <p className="text-sm text-slate-700 mb-3">A non-refundable deposit is required to secure your project slot and begin work.</p>
            <table className="w-full text-sm mb-4">
              <thead>
                <tr className="border-b-2 border-[#334155]">
                  <th className="text-left py-2 text-[#334155] font-semibold">Package</th>
                  <th className="text-center py-2 text-[#334155] font-semibold">Total</th>
                  <th className="text-right py-2 text-[#334155] font-semibold">Deposit</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="py-2 text-slate-700">Starter</td>
                  <td className="text-center py-2 text-slate-600">£250</td>
                  <td className="text-right py-2 text-slate-700 font-semibold">£100</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-2 text-slate-700">Practical</td>
                  <td className="text-center py-2 text-slate-600">£300</td>
                  <td className="text-right py-2 text-slate-700 font-semibold">£100</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-2 text-slate-700">Archive</td>
                  <td className="text-center py-2 text-slate-600">£300</td>
                  <td className="text-right py-2 text-slate-700 font-semibold">£100</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-2 text-slate-700">Assessor</td>
                  <td className="text-center py-2 text-slate-600">£400</td>
                  <td className="text-right py-2 text-slate-700 font-semibold">£150</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-2 text-slate-700">Publisher</td>
                  <td className="text-center py-2 text-slate-600">£400</td>
                  <td className="text-right py-2 text-slate-700 font-semibold">£150</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-2 text-slate-700">Growth</td>
                  <td className="text-center py-2 text-slate-600">£450</td>
                  <td className="text-right py-2 text-slate-700 font-semibold">£150</td>
                </tr>
                <tr>
                  <td className="py-2 text-[#C9A227] font-bold">Relaunch</td>
                  <td className="text-center py-2 text-[#C9A227] font-bold">£650</td>
                  <td className="text-right py-2 text-[#C9A227] font-bold">£200</td>
                </tr>
              </tbody>
            </table>
            <p className="text-xs text-slate-500 mb-3">All deposits are non-refundable. Remaining balance due upon project completion. For custom combinations, deposit = Starter (£250) × 40% + add-ons total × 30%.</p>

          </div>
          </div>

          {/* Section 3: Next Steps */}
          <div className="mb-0 pb-8 pt-6 px-2 md:px-8 -mx-2 md:-mx-8 bg-slate-50">
            <h2 className="text-xl font-bold text-[#334155] mb-4">3. Next steps</h2>

            <div className="space-y-3 text-sm">
              <div>
                <h4 className="font-semibold text-slate-800 mb-1">3.1. Review this proposal</h4>
                <p className="text-slate-600 text-xs ml-2 md:ml-4">Take your time to review the packages and add-ons. Let me know if you have any questions.</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-1">3.2. Choose your package</h4>
                <p className="text-slate-600 text-xs ml-2 md:ml-4">Let me know which combination works best for you - Starter or with add-ons.</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-1">3.3. Send inspiration sites</h4>
                <p className="text-slate-600 text-xs ml-2 md:ml-4">Share 3-5 websites you like the look of. Note what you like about each (colours, layout, feel).</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-1">3.4. We start building</h4>
                <p className="text-slate-600 text-xs ml-2 md:ml-4">Once confirmed, I'll begin development and keep you updated throughout the process.</p>
              </div>
            </div>

            <p className="mt-6 text-slate-700 text-sm text-center">
              Looking forward to building something great together!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 bg-[#334155] p-4 flex justify-center">
          <img
            src="https://cdn-duongtran.chartedconsultants.com/proposal/charted-logo-white.png"
            alt="charted consultants"
            className="h-6"
          />
        </div>
      </div>
    </div>
  )
}
