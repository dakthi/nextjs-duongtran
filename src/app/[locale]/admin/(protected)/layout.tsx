import AdminLayoutShell from "@/components/admin/AdminLayoutShell"

export default function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminLayoutShell>{children}</AdminLayoutShell>
}
