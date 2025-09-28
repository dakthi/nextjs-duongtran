import BlogManager from '@/components/admin/blog/BlogManager'

export default function AdminBlogPage() {
  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Blog Content Management</h1>
        <p className="mt-2 text-gray-600">
          Create and edit blog posts that appear across the site. Posts support markdown content, feature images,
          and optional client or expert highlights.
        </p>
      </div>

      <BlogManager />
    </div>
  )
}
