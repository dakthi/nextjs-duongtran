import AboutEditor from '@/components/admin/about/AboutEditorNew'

export default function AdminAboutPage() {
  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-3xl font-serif font-bold text-slate-900">About Page Management</h1>
        <p className="mt-2 text-base text-slate-700">
          Create and edit the about page content using a rich text editor. The content will be displayed in a single-column blog-style layout.
        </p>
      </div>

      <AboutEditor />
    </div>
  )
}
