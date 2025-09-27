"use client"

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

interface AuthSessionProviderProps {
  children: ReactNode
  session?: any
}

export default function AuthSessionProvider({
  children,
  session
}: AuthSessionProviderProps) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}