'use client'

import Link from 'next/link'

export default function ProposalPage({ params }: { params: { locale: string } }) {
  const locale = params.locale || 'vi'

  return (
    <div className="min-h-screen py-4 md:py-8 bg-gray-100">
      Test content
    </div>
  )
}
