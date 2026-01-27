import { MobileOverlay } from '@/components/MobileOverlay'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <MobileOverlay />
      {children}
    </div>
  )
}
