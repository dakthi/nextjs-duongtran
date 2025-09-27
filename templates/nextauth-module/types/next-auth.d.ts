/**
 * NextAuth TypeScript Declarations
 *
 * Copy this to: src/types/next-auth.d.ts
 * Extends NextAuth types to include custom user properties
 */

import { DefaultSession, DefaultUser } from "next-auth"
import { JWT } from "next-auth/jwt"

// Extend the built-in session and user types
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
      email: string
      name?: string
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    id: string
    role: string
    email: string
    name?: string
    active?: boolean
  }
}

// Extend the JWT type
declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: string
    email: string
    name?: string
  }
}

// Define user roles for better type safety
export type UserRole = 'admin' | 'editor' | 'user'

// Custom user interface for your application
export interface AppUser {
  id: string
  email: string
  name?: string
  role: UserRole
  active: boolean
  createdAt: Date
  updatedAt: Date
}

// Auth state interface for components
export interface AuthState {
  user: AppUser | null
  isLoading: boolean
  isAuthenticated: boolean
  hasRole: (role: UserRole | UserRole[]) => boolean
}

// Login form interface
export interface LoginCredentials {
  email: string
  password: string
}

// Registration form interface (if implementing registration)
export interface RegisterData {
  email: string
  name: string
  password: string
  confirmPassword: string
}