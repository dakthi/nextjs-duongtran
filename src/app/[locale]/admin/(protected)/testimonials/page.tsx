import TestimonialsManager from '@/components/admin/testimonials/TestimonialsManager'

export default function AdminTestimonialsPage() {
  return (
    <div className="pb-12">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-3">
          Content Management
        </p>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 leading-tight mb-4">
          Testimonials
        </h1>
        <p className="text-lg font-medium text-slate-700 leading-relaxed max-w-3xl">
          Curate the voices that appear on the site. Add new testimonials, update content, and control visibility and ordering.
        </p>
      </div>

      <TestimonialsManager />
    </div>
  )
}
