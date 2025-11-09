import TestimonialsManager from '@/components/admin/testimonials/TestimonialsManager'

export default function AdminTestimonialsPage() {
  return (
    <div className="pb-12">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-feldgrau mb-4">
          Content Management
        </p>
        <h1 className="text-3xl md:text-4xl font-sans font-bold text-outer-space leading-tight mb-6">
          Testimonials
        </h1>
        <p className="text-lg font-medium text-outer-space leading-relaxed max-w-3xl">
          Curate the voices that appear on the site. Add new testimonials, update content, and control visibility and ordering.
        </p>
      </div>

      <TestimonialsManager />
    </div>
  )
}
