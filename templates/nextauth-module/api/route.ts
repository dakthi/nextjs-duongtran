/**
 * NextAuth API Route
 *
 * Copy this to: src/app/api/auth/[...nextauth]/route.ts
 * Handles all NextAuth.js authentication routes
 */

import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

// Create NextAuth handler
const handler = NextAuth(authOptions)

// Export for both GET and POST requests
export { handler as GET, handler as POST }

// Optional: Export authOptions for use in other files
export { authOptions }