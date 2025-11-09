import AboutEditor from '@/components/admin/about/AboutEditorNew'

export default function AdminAboutPage() {
  return (
    <div className="pb-12">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-feldgrau mb-3">
          Content Management
        </p>
        <h1 className="text-3xl md:text-4xl font-sans font-bold text-outer-space leading-tight mb-4">
          About Page
        </h1>
        <p className="text-lg font-medium text-feldgrau leading-relaxed max-w-3xl">
          Create and edit the about page content using a rich text editor. The content will be displayed in a single-column blog-style layout.
        </p>
      </div>

      <AboutEditor />
    </div>
  )
}
