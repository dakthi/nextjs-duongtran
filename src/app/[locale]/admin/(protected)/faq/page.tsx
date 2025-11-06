export default function AdminFaqPage() {
  return (
    <div className="pb-12">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-3">
          Content Management
        </p>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 leading-tight mb-4">
          FAQ Management
        </h1>
        <p className="text-lg font-medium text-slate-700 leading-relaxed max-w-3xl">
          FAQ management tools are under construction. In the meantime you can update FAQ content via Prisma or direct database edits.
        </p>
      </div>

      <div className="bg-amber-50 border-2 border-slate-800 p-8 shadow-md text-center">
        <p className="text-xl font-serif font-bold text-slate-900 mb-2">Coming Soon</p>
        <p className="text-base text-slate-700">
          Full FAQ editor with rich text support will be available in a future update.
        </p>
      </div>
    </div>
  )
}
