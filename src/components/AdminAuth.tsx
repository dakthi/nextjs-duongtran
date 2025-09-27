/**
 * Admin Authentication Wrapper
 *
 * Protects admin routes based on user role
 */

"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, ReactNode } from "react"

interface AdminAuthProps {
  children: ReactNode
  requiredRole?: 'admin' | 'editor' | 'user'
  redirectTo?: string
}

export default function AdminAuth({
  children,
  requiredRole = 'admin',
  redirectTo = '/admin/login'
}: AdminAuthProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    // Show loading state while checking auth
    if (status === 'loading') return

    // Redirect to login if not authenticated
    if (!session) {
      router.push(redirectTo)
      return
    }

    // Check if user has required role
    const userRole = (session.user as any)?.role
    if (requiredRole === 'admin' && userRole !== 'admin') {
      router.push('/unauthorized') // or your error page
      return
    }

    if (requiredRole === 'editor' && !['admin', 'editor'].includes(userRole)) {
      router.push('/unauthorized')
      return
    }

    // User role and editor role can access most content
    // Add additional role checks as needed
  }, [session, status, router, requiredRole, redirectTo])

  // Show loading spinner while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    )
  }

  // Show loading if redirecting
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-gray-600 dark:text-gray-300">Redirecting to login...</div>
      </div>
    )
  }

  // Check role access
  const userRole = (session.user as any)?.role
  const hasAccess =
    requiredRole === 'user' ||
    (requiredRole === 'editor' && ['admin', 'editor'].includes(userRole)) ||
    (requiredRole === 'admin' && userRole === 'admin')

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="text-red-500 text-6xl mb-6">⚠️</div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Access Denied</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            You don't have permission to access this page.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            Required role: <span className="font-medium">{requiredRole}</span> |
            Your role: <span className="font-medium">{userRole || 'none'}</span>
          </p>
          <div className="space-x-4">
            <button
              onClick={() => router.back()}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Go Back
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  // User is authenticated and has required role
  return <>{children}</>
}