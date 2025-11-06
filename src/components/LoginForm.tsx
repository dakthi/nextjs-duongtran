/**
 * Custom Login Form Component
 *
 * Custom login form matching LieuVo project styles
 */

"use client"

import { useState, FormEvent } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter } from "next/navigation"

interface LoginFormProps {
  redirectTo?: string
  className?: string
}

export default function LoginForm({
  redirectTo = "/admin",
  className = ""
}: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      console.log("Attempting login with:", { email: email.trim().toLowerCase() })

      const result = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      })

      console.log("SignIn result:", result)

      if (result?.error) {
        setError("Invalid email or password. Please try again.")
        console.error("Login error:", result.error)
      } else if (result?.ok) {
        console.log("Login successful, redirecting to:", redirectTo)

        // Force a small delay to ensure session is set
        setTimeout(() => {
          router.push(redirectTo)
          router.refresh()
        }, 100)
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="bg-white border-2 border-slate-800 shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 leading-tight">
            LieuVo Admin
          </h2>
          <p className="mt-3 text-base text-slate-700">
            Enter your credentials to access the admin panel
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 mb-6 text-sm">
            {error}
          </div>
        )}

        {/* Email Field */}
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border-2 border-slate-800 shadow-md placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
            placeholder="admin@lieuvo.com"
            disabled={isLoading}
          />
        </div>

        {/* Password Field */}
        <div className="mb-8">
          <label htmlFor="password" className="block text-sm font-semibold text-slate-900 mb-2">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border-2 border-slate-800 shadow-md placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
            placeholder="Enter your password"
            disabled={isLoading}
          />
        </div>

        {/* Submit Button */}
        <div className="mb-6">
          <button
            type="submit"
            disabled={isLoading || !email || !password}
            className="w-full flex justify-center py-3 px-8 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-900 mr-2"></div>
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </div>

        {/* Development Info */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-amber-50 border-l-4 border-amber-500 text-slate-900 px-4 py-3 text-sm">
            <p className="font-semibold">Development Mode</p>
            <p className="mt-1 text-slate-700">
              Default admin: admin@lieuvo.com / LieuVoAdmin123!
            </p>
          </div>
        )}
      </form>
    </div>
  )
}