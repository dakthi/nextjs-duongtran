"use client"

import AdminLayout from "@/components/admin/AdminLayout"
import AdminAuth from "@/components/AdminAuth"

export default function AdminLayoutShell({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminAuth requiredRole="admin">
      <AdminLayout>{children}</AdminLayout>
    </AdminAuth>
  )
}
