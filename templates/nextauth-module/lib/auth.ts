/**
 * NextAuth Configuration
 *
 * Copy this to: src/lib/auth.ts
 * Based on production-ready patterns with credentials authentication
 */

import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma" // Adjust import path as needed
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  // Use Prisma adapter for database persistence
  adapter: PrismaAdapter(prisma) as any,

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "admin@example.com"
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password"
        }
      },
      async authorize(credentials) {
        // Validate input
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials")
          return null
        }

        try {
          // Find user by email
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email.toLowerCase().trim()
            }
          })

          // Check if user exists
          if (!user) {
            console.log("User not found:", credentials.email)
            return null
          }

          // Check if user is active
          if (!user.active) {
            console.log("User account is deactivated:", credentials.email)
            return null
          }

          // Check if user has a password (for credentials login)
          if (!user.password) {
            console.log("User has no password set:", credentials.email)
            return null
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isPasswordValid) {
            console.log("Invalid password for user:", credentials.email)
            return null
          }

          // Update last login (optional)
          await prisma.user.update({
            where: { id: user.id },
            data: { updatedAt: new Date() }
          })

          console.log("Successfully authenticated user:", user.email)

          // Return user object for session
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch (error) {
          console.error("Authentication error:", error)
          return null
        }
      }
    })

    // Add other providers here as needed:
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // })
  ],

  // Use JWT strategy for stateless sessions
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60,    // 24 hours
  },

  // JWT and session callbacks
  callbacks: {
    async jwt({ token, user, account }) {
      // Persist user data in token
      if (user) {
        token.id = user.id
        token.role = (user as any).role
        token.email = user.email
        token.name = user.name
      }

      return token
    },

    async session({ session, token }) {
      // Send properties to the client
      if (session?.user && token) {
        (session.user as any).id = token.id
        (session.user as any).role = token.role
        session.user.email = token.email
        session.user.name = token.name
      }

      return session
    },

    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },

  // Custom pages
  pages: {
    signIn: "/admin/login",    // Custom login page
    signOut: "/admin/login",   // Redirect after signout
    error: "/admin/login",     // Error page
  },

  // Enable debug messages in development
  debug: process.env.NODE_ENV === "development",

  // Security options
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === "production" ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },

  // Events for logging (optional)
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      console.log(`User signed in: ${user.email}`)
    },
    async signOut({ session, token }) {
      console.log(`User signed out: ${token?.email || 'unknown'}`)
    },
  },
}

// Export for use in API routes and middleware
export default authOptions