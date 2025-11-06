import BlogManager from '@/components/admin/blog/BlogManager'

export default function AdminBlogPage() {
  return (
    <div className="pb-12">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-4">
          Content Management
        </p>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 leading-tight mb-6">
          Blog Posts
        </h1>
        <p className="text-lg font-medium text-slate-900 leading-relaxed max-w-3xl">
          Create and edit blog posts that appear across the site. Posts support rich text content, feature images,
          and optional client or expert highlights.
        </p>
      </div>

      <BlogManager />
    </div>
  )
}
