/**
 * Admin Authentication Wrapper
 *
 * Copy this to: src/components/AdminAuth.tsx
 * Based on existing project patterns - protects admin routes
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  // Show loading if redirecting
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Redirecting to login...</div>
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">
            You don't have permission to access this page.
          </p>
          <p className="text-sm text-gray-500">
            Required role: {requiredRole} | Your role: {userRole || 'none'}
          </p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  // User is authenticated and has required role
  return <>{children}</>
}