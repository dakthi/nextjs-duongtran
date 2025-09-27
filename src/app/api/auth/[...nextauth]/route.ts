/**
 * NextAuth API Route
 *
 * Handles all NextAuth.js authentication routes
 */

import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

// Create NextAuth handler
const handler = NextAuth(authOptions)

// Export for both GET and POST requests
export { handler as GET, handler as POST }
