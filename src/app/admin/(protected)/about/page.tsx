import AboutManager from '@/components/admin/about/AboutManager'

export default function AdminAboutPage() {
  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">About Page Management</h1>
        <p className="mt-2 text-gray-600">
          Control the narrative for the About page. Update section titles, imagery, and storytelling paragraphs to keep
          the page aligned with the latest positioning.
        </p>
      </div>

      <AboutManager />
    </div>
  )
}
