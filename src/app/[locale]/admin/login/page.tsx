"use client"

import LoginForm from '@/components/LoginForm'
import { useParams } from 'next/navigation'

export default function LoginPage() {
  const params = useParams()
  const locale = params.locale as string

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <LoginForm redirectTo={`/${locale}/admin`} />
      </div>
    </div>
  )
}