'use client'

import { useState } from 'react'

interface Question {
  id: string
  question: string
  type: 'radio' | 'text' | 'select' | 'dual-text'
  options?: Array<{ label: string; points: number }>
  required: boolean
  fields?: Array<{ id: string; label: string; type: string; placeholder: string }>
  conditionalOn?: {
    questionId: string
    includeValues?: string[]
    excludeValues?: string[]
  }
}

const questions: Question[] = [
  {
    id: 'workEnvironment',
    question: 'What type of position is this for?',
    type: 'radio',
    options: [
      { label: 'Accounting/Tax Practice (serving multiple clients)', points: 10 },
      { label: 'In-house (single company finance/accounting team)', points: 0 }
    ],
    required: true
  },
  {
    id: 'clientBase',
    question: 'What is your typical client base?',
    type: 'radio',
    options: [
      { label: 'SMEs across various industries', points: 10 },
      { label: 'Mix of individuals and small businesses', points: 8 },
      { label: 'Large corporations and enterprises', points: 5 },
      { label: 'Primarily individuals (personal tax)', points: 3 },
      { label: 'Niche industry focus', points: 7 }
    ],
    required: true
  },
  {
    id: 'companySize',
    question: 'What is your company/practice size?',
    type: 'radio',
    options: [
      { label: '1-10 employees', points: 0 },
      { label: '11-50 employees', points: 10 },
      { label: '51-200 employees', points: 10 },
      { label: '201-500 employees', points: 5 },
      { label: '500+ employees', points: 0 }
    ],
    required: true
  },
  {
    id: 'industry',
    question: 'What industry is your business in?',
    type: 'radio',
    options: [
      { label: 'Professional Services (Accounting, Legal, Consulting)', points: 10 },
      { label: 'Technology / SaaS', points: 10 },
      { label: 'Finance / Fintech', points: 10 },
      { label: 'Healthcare / Medical', points: 8 },
      { label: 'E-commerce / Retail', points: 8 },
      { label: 'Hospitality (Restaurants, Hotels)', points: 0 },
      { label: 'Beauty / Personal Care (Nail Salons, Spas)', points: 0 },
      { label: 'Grocery / Supermarkets', points: 0 },
      { label: 'Other', points: 5 }
    ],
    required: true
  },
  {
    id: 'hiringSoon',
    question: 'Are you actively hiring for an accounting position?',
    type: 'radio',
    options: [
      { label: 'Yes, immediately', points: 10 },
      { label: 'Yes, within 3 months', points: 8 },
      { label: 'Exploring options for the future', points: 5 },
      { label: 'Not currently, just keen to connect and learn more', points: 3 }
    ],
    required: true
  },
  {
    id: 'role',
    question: 'What role are you hiring for?',
    type: 'radio',
    options: [
      { label: 'Senior Accountant', points: 10 },
      { label: 'Accounts Manager / Assistant Manager', points: 10 },
      { label: 'Tax Specialist', points: 10 },
      { label: 'Finance Manager', points: 8 },
      { label: 'Junior Accountant', points: 3 },
      { label: 'Bookkeeper', points: 2 },
      { label: 'Other', points: 5 }
    ],
    required: true,
    conditionalOn: { questionId: 'hiringSoon', excludeValues: ['Not currently, just keen to connect and learn more'] }
  },
  {
    id: 'learningInterest',
    question: 'What would you like to learn more about?',
    type: 'radio',
    options: [
      { label: 'Tax planning and compliance strategies', points: 10 },
      { label: 'Process automation in accounting', points: 10 },
      { label: 'Best practices for UK accounting firms', points: 8 },
      { label: 'Client portfolio management', points: 7 },
      { label: 'ACCA qualification journey', points: 5 },
      { label: 'General accounting career advice', points: 5 }
    ],
    required: true,
    conditionalOn: { questionId: 'hiringSoon', includeValues: ['Not currently, just keen to connect and learn more'] }
  },
  {
    id: 'cultureFit',
    question: 'Which best describes your team culture?',
    type: 'radio',
    options: [
      { label: 'Collaborative and supportive', points: 10 },
      { label: 'Fast-paced, results-driven', points: 8 },
      { label: 'Independent and self-directed', points: 7 },
      { label: 'Traditional and structured', points: 5 }
    ],
    required: true,
    conditionalOn: { questionId: 'hiringSoon', excludeValues: ['Not currently, just keen to connect and learn more'] }
  },
  {
    id: 'connectionReason',
    question: 'What brings you to connect today?',
    type: 'radio',
    options: [
      { label: 'Exploring potential future collaboration', points: 10 },
      { label: 'Seeking professional insights and advice', points: 8 },
      { label: 'Networking within the accounting industry', points: 7 },
      { label: 'Just browsing and learning', points: 5 }
    ],
    required: true,
    conditionalOn: { questionId: 'hiringSoon', includeValues: ['Not currently, just keen to connect and learn more'] }
  },
  {
    id: 'priorities',
    question: 'What matters most in an accounting hire?',
    type: 'radio',
    options: [
      { label: 'Technical expertise and qualifications', points: 10 },
      { label: 'Process improvement and automation skills', points: 10 },
      { label: 'Client relationship management', points: 8 },
      { label: 'Team mentoring and leadership', points: 7 }
    ],
    required: true,
    conditionalOn: { questionId: 'hiringSoon', excludeValues: ['Not currently, just keen to connect and learn more'] }
  },
  {
    id: 'learningGoals',
    question: 'What would be most valuable for you to gain from connecting?',
    type: 'radio',
    options: [
      { label: 'Understanding how to improve efficiency in practice', points: 10 },
      { label: 'Learning about career progression in accounting', points: 8 },
      { label: 'Insights on building a successful client base', points: 9 },
      { label: 'Knowledge about professional qualifications', points: 6 }
    ],
    required: true,
    conditionalOn: { questionId: 'hiringSoon', includeValues: ['Not currently, just keen to connect and learn more'] }
  },
  {
    id: 'challenges',
    question: 'What are your main accounting challenges?',
    type: 'radio',
    options: [
      { label: 'Need for better automation and efficiency', points: 10 },
      { label: 'Tax planning and advisory work', points: 10 },
      { label: 'High volume of clients/transactions', points: 8 },
      { label: 'Staff training and development', points: 7 }
    ],
    required: true,
    conditionalOn: { questionId: 'hiringSoon', excludeValues: ['Not currently, just keen to connect and learn more'] }
  },
  {
    id: 'currentFocus',
    question: 'What are you currently focussing on in your role?',
    type: 'radio',
    options: [
      { label: 'Growing and scaling the practice', points: 10 },
      { label: 'Improving service quality and efficiency', points: 10 },
      { label: 'Developing my own skills and expertise', points: 8 },
      { label: 'Building professional connections', points: 7 }
    ],
    required: true,
    conditionalOn: { questionId: 'hiringSoon', includeValues: ['Not currently, just keen to connect and learn more'] }
  },
  {
    id: 'innovation',
    question: 'How open is your firm to innovation and new approaches?',
    type: 'radio',
    options: [
      { label: 'Very open - we actively encourage new ideas and technology', points: 10 },
      { label: 'Open - we support innovation with proper justification', points: 8 },
      { label: 'Somewhat open - we prefer proven methods but consider changes', points: 5 },
      { label: 'Traditional - we stick to established processes', points: 2 }
    ],
    required: true
  },
  {
    id: 'aiPerspective',
    question: 'What do you think about this statement: "AI is a huge risk to the accounting industry"?',
    type: 'radio',
    options: [
      { label: 'Disagree - AI is an opportunity that will enhance our services', points: 10 },
      { label: 'Partially agree - AI poses challenges but also opportunities', points: 8 },
      { label: 'Neutral - I\'m still evaluating the impact of AI', points: 5 },
      { label: 'Agree - AI threatens traditional accounting roles', points: 0 }
    ],
    required: true,
    conditionalOn: { questionId: 'hiringSoon', excludeValues: ['Not currently, just keen to connect and learn more'] }
  },
  {
    id: 'aiInterest',
    question: 'How interested are you in AI and automation in accounting?',
    type: 'radio',
    options: [
      { label: 'Very interested - actively exploring how to implement it', points: 10 },
      { label: 'Interested - keen to learn more about the possibilities', points: 8 },
      { label: 'Somewhat interested - curious but cautious', points: 5 },
      { label: 'Not very interested - prefer traditional methods', points: 2 }
    ],
    required: true,
    conditionalOn: { questionId: 'hiringSoon', includeValues: ['Not currently, just keen to connect and learn more'] }
  }
]

interface EmployerCompatibilityTestProps {
  onComplete: (data: any) => void
  loading: boolean
  error?: string
}

export function EmployerCompatibilityTest({ onComplete, loading, error }: EmployerCompatibilityTestProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [validationError, setValidationError] = useState<string>('')
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactInfo, setContactInfo] = useState({ companyName: '', email: '', notes: '' })

  // Check if user selected in-house to conditionally skip client base question
  const isInHouse = answers.workEnvironment?.value === 'In-house (single company finance/accounting team)'

  // Filter questions based on conditions
  const getActiveQuestions = () => {
    return questions.filter(q => {
      // Skip client base if in-house
      if (q.id === 'clientBase' && isInHouse) {
        return false
      }

      // Handle conditional questions
      if (q.conditionalOn) {
        const dependentAnswer = answers[q.conditionalOn.questionId]?.value

        // If includeValues is specified, only show if answer matches
        if (q.conditionalOn.includeValues) {
          return q.conditionalOn.includeValues.includes(dependentAnswer)
        }

        // If excludeValues is specified, only show if answer doesn't match
        if (q.conditionalOn.excludeValues) {
          return !q.conditionalOn.excludeValues.includes(dependentAnswer)
        }
      }

      return true
    })
  }

  const activeQuestions = getActiveQuestions()
  const currentQuestion = activeQuestions[currentStep]
  const isLastQuestion = currentStep === activeQuestions.length - 1

  const handleAnswer = (value: string, points?: number) => {
    if (points !== undefined) {
      setAnswers({ ...answers, [currentQuestion.id]: { value, points } })
    } else {
      setAnswers({ ...answers, [currentQuestion.id]: value })
    }
    setValidationError('')
  }

  const handleDualTextAnswer = (fieldId: string, value: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: {
        ...answers[currentQuestion.id],
        [fieldId]: value
      }
    })
    setValidationError('')
  }

  const calculateScore = () => {
    let totalScore = 0
    questions.forEach((q) => {
      const answer = answers[q.id]
      if (answer && typeof answer === 'object' && 'points' in answer) {
        totalScore += answer.points
      }
    })
    return totalScore
  }

  const handleNext = () => {
    // Validate current question
    if (currentQuestion.type === 'dual-text') {
      const contactInfo = answers[currentQuestion.id] || {}
      if (!contactInfo.companyName || !contactInfo.email) {
        setValidationError('Both fields are required')
        return
      }
      if (!contactInfo.email.includes('@') || !contactInfo.email.includes('.')) {
        setValidationError('Please enter a valid email address')
        return
      }
    } else if (currentQuestion.required && !answers[currentQuestion.id]) {
      setValidationError('This field is required')
      return
    }

    if (isLastQuestion) {
      // Calculate score and show results
      const finalScore = calculateScore()
      setScore(finalScore)
      setShowResults(true)
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleSubmitContactInfo = () => {
    // Validate contact info
    if (!contactInfo.companyName || !contactInfo.email) {
      setValidationError('Company name and email are required')
      return
    }
    if (!contactInfo.email.includes('@') || !contactInfo.email.includes('.')) {
      setValidationError('Please enter a valid email address')
      return
    }

    // Prepare data for submission
    const submissionData = {
      companyName: contactInfo.companyName,
      email: contactInfo.email,
      notes: contactInfo.notes,
      companySize: answers.companySize?.value,
      role: answers.role?.value,
      score: score,
      testAnswers: answers
    }
    onComplete(submissionData)
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setValidationError('')
    }
  }

  const renderQuestionInput = () => {
    if (currentQuestion.type === 'dual-text') {
      const contactInfo = answers[currentQuestion.id] || {}
      return (
        <div className="space-y-4">
          {currentQuestion.fields?.map((field) => (
            <div key={field.id}>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {field.label}
              </label>
              <input
                type={field.type}
                value={contactInfo[field.id] || ''}
                onChange={(e) => handleDualTextAnswer(field.id, e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                placeholder={field.placeholder}
                disabled={loading}
              />
            </div>
          ))}
        </div>
      )
    }

    if (currentQuestion.type === 'radio') {
      const currentAnswer = answers[currentQuestion.id]
      return (
        <div className="space-y-3">
          {currentQuestion.options?.map((option) => (
            <label
              key={option.label}
              className={`flex items-start p-4 border-2 cursor-pointer transition-all ${
                currentAnswer?.value === option.label
                  ? 'border-amber-500 bg-amber-50'
                  : 'border-slate-300 hover:border-slate-400 bg-white'
              } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <input
                type="radio"
                name={currentQuestion.id}
                value={option.label}
                checked={currentAnswer?.value === option.label}
                onChange={() => handleAnswer(option.label, option.points)}
                className="mt-1 w-4 h-4 text-amber-500 focus:ring-amber-500"
                disabled={loading}
              />
              <span className="ml-3 text-slate-900">{option.label}</span>
            </label>
          ))}
        </div>
      )
    }

    return null
  }

  const getResultsMessage = () => {
    // Max score depends on whether they're in-house (9 questions) or practice (10 questions with clientBase)
    const maxScore = isInHouse ? 90 : 100
    const percentage = (score / maxScore) * 100

    if (isInHouse) {
      return {
        title: "Thank you for your interest",
        message: "I appreciate you taking the time to complete this assessment. Currently, my primary focus is on client-facing roles within accounting and tax practices where I can leverage my experience serving multiple clients. However, I'm always open to conversations about unique opportunities. If you'd like to discuss your position further, please feel free to get in touch.",
        icon: "contact",
        canProceed: false,
        showContactOption: true
      }
    }

    if (percentage >= 70) {
      return {
        title: "Excellent match!",
        message: "Based on your responses, there's a strong alignment between your needs and my expertise. Your company size, industry, and priorities align well with my experience in UK accounting, tax compliance, and process automation for mid-sized professional service firms.",
        icon: "success",
        canProceed: true,
        showContactOption: false
      }
    } else if (percentage >= 50) {
      return {
        title: "Good potential fit",
        message: "Your requirements show some alignment with my background. Whilst there may be areas where we can collaborate effectively, I want to ensure we're both confident this is the right match. Let's connect to discuss further.",
        icon: "good",
        canProceed: true,
        showContactOption: false
      }
    } else {
      return {
        title: "Thank you for your interest",
        message: "Based on your responses, it appears there may be a mismatch between your current needs and my core expertise. I specialise in working with mid-sized businesses in professional services, technology, and finance sectors, focussing on strategic tax planning and process automation. I'd be happy to recommend other professionals who might be a better fit for your specific requirements.",
        icon: "mismatch",
        canProceed: false,
        showContactOption: false
      }
    }
  }

  if (showResults) {
    const results = getResultsMessage()
    return (
      <div className="bg-white border-2 border-amber-500 shadow-lg p-8">
        <div className="text-center">
          {/* Icon */}
          <div className="mb-6">
            {results.icon === 'success' && (
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
            {results.icon === 'good' && (
              <div className="mx-auto w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            )}
            {results.icon === 'mismatch' && (
              <div className="mx-auto w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            {results.title}
          </h3>

          {/* Score */}
          <div className="mb-6 p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-600 mb-1">Compatibility score</p>
            <p className="text-3xl font-bold text-slate-900">
              {Math.round((score / (isInHouse ? 90 : 100)) * 100)}%
            </p>
          </div>

          {/* Message */}
          <p className="text-slate-700 leading-relaxed mb-8">
            {results.message}
          </p>

          {/* Action buttons */}
          {results.canProceed && !showContactForm ? (
            <div className="space-y-3">
              <button
                onClick={() => setShowContactForm(true)}
                className="w-full px-8 py-3 bg-amber-500 text-slate-900 hover:bg-amber-400 font-semibold transition-colors"
              >
                Let's connect!
              </button>
              <p className="text-sm text-slate-600">
                I'll review your details and be in touch within 2-3 business days
              </p>
            </div>
          ) : results.canProceed && showContactForm ? (
            <div className="space-y-4 text-left">
              <div className="border-t-2 border-slate-200 pt-6">
                <h4 className="text-lg font-bold text-slate-900 mb-4">Your contact information</h4>
                <p className="text-sm text-slate-600 mb-4 bg-amber-50 border-l-4 border-amber-500 p-3">
                  Please use your company email address for faster verification and response
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Company name
                    </label>
                    <input
                      type="text"
                      value={contactInfo.companyName}
                      onChange={(e) => setContactInfo({ ...contactInfo, companyName: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                      placeholder="Enter company name"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Work email
                    </label>
                    <input
                      type="email"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                      placeholder="your.email@company.com"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Additional notes (optional)
                    </label>
                    <textarea
                      value={contactInfo.notes}
                      onChange={(e) => setContactInfo({ ...contactInfo, notes: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 min-h-[120px]"
                      placeholder="Tell me a bit more about your role, what you're looking for, or anything else you'd like to share..."
                      disabled={loading}
                      rows={4}
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Feel free to share any additional context that might help our conversation
                    </p>
                  </div>
                </div>
                {validationError && (
                  <p className="text-red-600 text-sm mt-2 bg-red-50 border-l-4 border-red-600 p-2">
                    {validationError}
                  </p>
                )}
                {error && (
                  <p className="text-red-600 font-semibold text-sm mt-2 bg-red-50 border-l-4 border-red-600 p-3">
                    {error}
                  </p>
                )}
                <button
                  onClick={handleSubmitContactInfo}
                  disabled={loading}
                  className="w-full mt-4 px-8 py-3 bg-amber-500 text-slate-900 hover:bg-amber-400 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Submitting...' : 'Submit information'}
                </button>
              </div>
            </div>
          ) : results.showContactOption ? (
            <div className="space-y-3">
              <a
                href={`/${typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : 'en'}/contact`}
                className="inline-block w-full px-8 py-3 bg-slate-900 text-white hover:bg-slate-700 text-center font-semibold transition-colors"
              >
                Contact me directly
              </a>
              <p className="text-sm text-slate-600">
                I'd be happy to discuss your opportunity in more detail
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-slate-600 italic">
                Whilst this might not be the perfect match right now, I appreciate your time in completing this assessment.
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border-2 border-amber-500 shadow-lg p-8">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-slate-600">
            Question {currentStep + 1} of {activeQuestions.length}
          </span>
          <span className="text-sm text-slate-600">
            {Math.round(((currentStep + 1) / activeQuestions.length) * 100)}% complete
          </span>
        </div>
        <div className="w-full bg-slate-200 h-2">
          <div
            className="bg-amber-500 h-2 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / activeQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-4">
          {currentQuestion.question}
          {currentQuestion.required && <span className="text-red-500 ml-1">*</span>}
        </h3>
        {renderQuestionInput()}
        {validationError && (
          <p className="text-red-600 text-sm mt-2 bg-red-50 border-l-4 border-red-600 p-2">
            {validationError}
          </p>
        )}
        {error && (
          <p className="text-red-600 font-semibold text-sm mt-2 bg-red-50 border-l-4 border-red-600 p-3">
            {error}
          </p>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0 || loading}
          className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={loading}
          className="px-6 py-3 bg-amber-500 text-slate-900 hover:bg-amber-400 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLastQuestion ? 'See results' : 'Next'}
        </button>
      </div>
    </div>
  )
}
