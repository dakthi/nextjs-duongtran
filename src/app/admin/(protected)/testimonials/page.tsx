import TestimonialsManager from '@/components/admin/testimonials/TestimonialsManager'

export default function AdminTestimonialsPage() {
  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Testimonials Management</h1>
        <p className="mt-2 text-gray-600">
          Curate the voices that appear on the site. Add new testimonials, update content, and control visibility and
          ordering.
        </p>
      </div>

      <TestimonialsManager />
    </div>
  )
}
