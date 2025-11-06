'use client'
import { useState } from 'react'
import { Container } from '@/components/Container'
import { SectionTitle } from '@/components/SectionTitle'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function CVPage() {
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'en'

  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [cvUrl, setCvUrl] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/cv/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Invalid code')
        return
      }

      // Show the CV link
      setCvUrl(data.url)
    } catch (err) {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Header Section */}
      <div className="py-20 bg-amber-50 border-b-4 border-amber-500">
        <Container>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6 leading-tight">
            For Employers & Recruiters
          </h1>
          <p className="text-lg font-medium text-slate-900 leading-relaxed max-w-3xl">
            I'm always interested in meaningful conversations about opportunities where I can leverage my technical expertise,
            automation skills, and client-focused approach to drive financial clarity, operational efficiency, and strategic growth.
          </p>
        </Container>
      </div>

      {/* Introduction Section */}
      <div className="py-20 bg-white">
        <Container>
          <div className="space-y-6 text-slate-700 leading-relaxed">
            <p className="text-lg">
              I'm an ACCA Qualified Chartered Accountant with extensive experience in UK accounting and tax compliance for SMEs.
              I have been working full-time at an accounting practice in London, where I progressed from Trainee to Senior Accountant,
              managing a diverse portfolio of clients and delivering comprehensive accounting services.
            </p>
            <p className="text-lg">
              During this time, I've prepared year-end accounts for companies across various industries, managed self-assessments for
              hundreds of clients with 100% on-time filing rates, and provided strategic tax planning that has helped businesses
              significantly reduce their tax liabilities and drive revenue growth.
            </p>
          </div>
        </Container>
      </div>

      {/* Skills & Experience Section */}
      <div className="py-20 bg-slate-50">
        <Container>
          <SectionTitle
            preTitle="what i bring"
            title="Core Expertise & Experience"
          />

          <div className="mt-12 space-y-0">
            {/* Core Accounting Expertise */}
            <div className="border-l-4 border-amber-500 border-t-2 border-b-2 border-slate-200 pl-4 py-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Core Accounting Expertise</h3>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                My core expertise spans the full spectrum of UK accounting and tax services for SMEs:
              </p>
              <ul className="space-y-0.5 text-lg text-slate-700 leading-relaxed">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-3 mt-1">•</span>
                  <span>Year-end accounts preparation and corporation tax</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-3 mt-1">•</span>
                  <span>Self-assessments with 100% on-time filing rates for hundreds of clients</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-3 mt-1">•</span>
                  <span>VAT returns and payroll management with strict HMRC compliance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-3 mt-1">•</span>
                  <span>Large client portfolio management with proven track record</span>
                </li>
              </ul>
            </div>

            {/* Process Automation */}
            <div className="border-l-4 border-amber-500 border-b-2 border-slate-200 pl-4 py-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Process Automation & Workflow Optimization</h3>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                One of my key strengths is leveraging technology to improve efficiency and accuracy:
              </p>
              <ul className="space-y-0.5 text-lg text-slate-700 leading-relaxed">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-3 mt-1">•</span>
                  <span>Python scripting and Excel automation for streamlined workflows</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-3 mt-1">•</span>
                  <span>Custom solutions that reduce manual workload and improve accuracy</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-3 mt-1">•</span>
                  <span>Saved hundreds of hours while increasing quality and reliability</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-3 mt-1">•</span>
                  <span>Freed up time for higher-value advisory work</span>
                </li>
              </ul>
            </div>

            {/* Tax Planning */}
            <div className="border-l-4 border-amber-500 border-b-2 border-slate-200 pl-4 py-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Strategic Tax Planning & Advisory</h3>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Beyond compliance work, I provide strategic advisory services that deliver tangible results:
              </p>
              <ul className="space-y-0.5 text-lg text-slate-700 leading-relaxed">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-3 mt-1">•</span>
                  <span>Careful planning around income structure, dividends, and VAT strategies</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-3 mt-1">•</span>
                  <span>Significantly reduced tax liabilities for clients</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-3 mt-1">•</span>
                  <span>Enabled businesses to reinvest savings into growth</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-3 mt-1">•</span>
                  <span>Clients have seen substantial revenue increases from recommendations</span>
                </li>
              </ul>
            </div>

            {/* Technical Skills */}
            <div className="border-l-4 border-amber-500 border-b-2 border-slate-200 pl-4 py-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Technical Skills & Platforms</h3>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Proficient in industry-standard platforms and modern technologies:
              </p>
              <ul className="space-y-0.5 text-lg text-slate-700 leading-relaxed">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-3 mt-1">•</span>
                  <span>CCH, Sage 50, BrightPay, IRIS</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-3 mt-1">•</span>
                  <span>Companies House and HMRC services</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-3 mt-1">•</span>
                  <span>Python, Google Apps Script, AI tools</span>
                </li>
              </ul>
            </div>

            {/* Leadership */}
            <div className="border-l-4 border-amber-500 border-b-2 border-slate-200 pl-4 py-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Leadership & Team Development</h3>
              <ul className="space-y-0.5 text-lg text-slate-700 leading-relaxed">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-3 mt-1">•</span>
                  <span>Trained and mentored junior staff, cutting onboarding time significantly</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-3 mt-1">•</span>
                  <span>Built more capable, self-sufficient teams</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-3 mt-1">•</span>
                  <span>Maintained high client satisfaction and strong retention rates</span>
                </li>
              </ul>
            </div>

            {/* Community Impact */}
            <div className="border-l-4 border-amber-500 border-b-2 border-slate-200 pl-4 py-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Community Education Impact</h3>
              <ul className="space-y-0.5 text-lg text-slate-700 leading-relaxed">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-3 mt-1">•</span>
                  <span>Founded UK tax education initiative for Vietnamese community</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-3 mt-1">•</span>
                  <span>Grown engaged audience of thousands</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-3 mt-1">•</span>
                  <span>Clear, actionable content simplifying complex HMRC rules</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-3 mt-1">•</span>
                  <span>Helped reduce penalties and improve financial decisions</span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>

      {/* Qualifications Section */}
      <div className="py-20 bg-white">
        <Container>
          <SectionTitle
            preTitle="qualifications"
            title="Professional Credentials"
          />

          <div className="mt-12 space-y-4">
            <div className="bg-amber-50 border-2 border-slate-800 shadow-md p-6 flex items-start gap-4">
              <svg className="w-8 h-8 text-amber-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">ACCA Qualified Chartered Accountant</h3>
                <p className="text-slate-700">All 13 exams passed on first attempt</p>
              </div>
            </div>

            <div className="bg-amber-50 border-2 border-slate-800 shadow-md p-6 flex items-start gap-4">
              <svg className="w-8 h-8 text-amber-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">MSc Accounting and Finance</h3>
                <p className="text-slate-700">Advanced Diploma - First Class</p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Call to Action Section */}
      <div className="py-20 bg-slate-50">
        <Container>
          <div className="bg-amber-50 border-l-4 border-slate-800 shadow-md p-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-4 leading-tight">
              Let's Connect
            </h2>
            <p className="text-lg text-slate-900 font-medium leading-relaxed mb-4">
              I'm always open to meaningful conversations with professionals in the accounting and finance space.
              Whether you're exploring ways to streamline operations, enhance strategic tax guidance, or leverage automation
              to drive efficiency, I'd welcome the opportunity to connect.
            </p>
            <p className="text-lg text-slate-900 font-medium leading-relaxed mb-6">
              For networking, collaboration discussions, or to explore potential opportunities, please feel free to{' '}
              <Link href={`/${locale}/contact`} className="text-amber-600 font-bold underline hover:text-amber-500 transition-colors">
                reach out via the contact form
              </Link>
              . I'm happy to share my full CV for those interested in learning more about my background and experience.
            </p>
          </div>
        </Container>
      </div>

      {/* CV Access Section */}
      <div className="py-20 bg-slate-800">
        <Container>
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4 text-center leading-tight">
              Access Full CV
            </h2>

            {!cvUrl ? (
              <>
                <p className="text-slate-200 mb-8 text-center text-lg">
                  If you have an access code, enter it below to view my complete CV with detailed information.
                </p>
                <form onSubmit={handleSubmit} className="bg-white border-2 border-amber-500 shadow-lg p-8">
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter access code"
                    className="w-full px-4 py-3 border-2 border-slate-800 mb-4 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                  />
                  {error && (
                    <p className="text-red-600 font-semibold text-sm mb-4 bg-red-50 border-l-4 border-red-600 p-3">
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={loading || !code.trim()}
                    className="w-full px-8 py-3 bg-amber-500 text-slate-900 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold text-base"
                  >
                    {loading ? 'Verifying...' : 'Access CV'}
                  </button>
                  <p className="text-sm text-slate-600 mt-6 text-center">
                    Don't have a code?{' '}
                    <Link href={`/${locale}/contact`} className="text-slate-900 font-semibold hover:text-amber-600 underline transition-colors">
                      Contact me to request one
                    </Link>
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center bg-white border-2 border-amber-500 shadow-lg p-8">
                <div className="mb-6 p-6 bg-amber-50 border-2 border-amber-500">
                  <svg className="w-16 h-16 text-amber-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-slate-900 font-bold text-lg">Access granted!</p>
                </div>
                <a
                  href={cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 bg-amber-500 text-slate-900 hover:bg-amber-400 transition-colors font-semibold mb-4"
                >
                  View Full CV (PDF)
                </a>
                <p className="text-sm text-slate-600">
                  The CV will open in a new tab
                </p>
              </div>
            )}
          </div>
        </Container>
      </div>
    </>
  )
}
