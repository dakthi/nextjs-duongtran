import AdminLayoutShell from "@/components/admin/AdminLayoutShell"

// Prevent static generation of admin pages during build
export const dynamic = 'force-dynamic'
export const dynamicParams = true

export default function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminLayoutShell>{children}</AdminLayoutShell>
}
