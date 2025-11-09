export default function AdminFaqPage() {
  return (
    <div className="pb-12">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-feldgrau mb-3">
          Content Management
        </p>
        <h1 className="text-3xl md:text-4xl font-sans font-bold text-outer-space leading-tight mb-4">
          FAQ Management
        </h1>
        <p className="text-lg font-medium text-feldgrau leading-relaxed max-w-3xl">
          FAQ management tools are under construction. In the meantime you can update FAQ content via Prisma or direct database edits.
        </p>
      </div>

      <div className="bg-mint-green border-2 border-outer-space p-8 shadow-md text-center">
        <p className="text-xl font-sans font-bold text-outer-space mb-2">Coming Soon</p>
        <p className="text-base text-feldgrau">
          Full FAQ editor with rich text support will be available in a future update.
        </p>
      </div>
    </div>
  )
}
