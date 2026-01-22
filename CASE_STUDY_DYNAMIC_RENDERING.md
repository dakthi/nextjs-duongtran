# Case Study: Fixing Blog Post Cache Issue in Next.js

## Problem Statement

Individual blog post pages were not reflecting database updates in production builds. When content was modified through the CMS admin interface, the changes would not appear on the live site, even though the database was successfully updated.

## Environment

- **Framework**: Next.js 14+ (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Issue Location**: Individual blog post detail pages (`/blog/[slug]`)
- **Scope**: Production builds only (development mode worked correctly)

## Investigation

### Symptoms

1. Database updates were successful (confirmed through logs):
   ```
   [api/blog/[id]] PUT - received slug: the-day-a-company-is-born
   [blog-service] Updated post slug: the-day-a-company-is-born
   [api/blog/[id]] PUT - returned post slug: the-day-a-company-is-born
   ```

2. The blog listing page showed updated content immediately
3. Individual post pages served stale, cached content
4. Issue only occurred after running `npm run build`

### Root Cause Analysis

Next.js App Router uses **Static Site Generation (SSG)** by default for pages that can be pre-rendered. The blog post detail page at `src/app/[locale]/(site)/blog/[slug]/page.tsx` was being statically generated during the build process with the following behavior:

1. During build time, Next.js called `generateStaticParams()` to get all blog post slugs
2. Each slug was pre-rendered into a static HTML page
3. These static pages were cached and served to users
4. Database updates had no effect because the static pages were never regenerated

The blog listing page worked correctly because it already had the `dynamic = 'force-dynamic'` export, forcing it to fetch fresh data on each request.

## Solution

### Implementation

Added a single line to force dynamic rendering in `src/app/[locale]/(site)/blog/[slug]/page.tsx`:

```typescript
// Force dynamic rendering to always fetch fresh data
export const dynamic = 'force-dynamic'
```

### Complete Context

```typescript
import { getPostBySlug, getPostSlugs } from '@/lib/post'
import { notFound } from 'next/navigation'
import { Container } from '@/components/Container'
import Image from 'next/image'
import { isMediaRemoteUrl } from '@/lib/media/media-client'
import { generateMetadata as genMeta, generateBlogPostingSchema, generateBreadcrumbSchema, siteConfig } from '@/lib/seo'
import { BlogContent } from '@/components/blog/BlogContent'
import type { Metadata } from 'next'

// Force dynamic rendering to always fetch fresh data
export const dynamic = 'force-dynamic'

type Params = {
  params: { slug: string; locale: string };
};

export async function generateStaticParams(): Promise<{ slug: string; locale: string }[]> {
  const slugs = await getPostSlugs()
  return slugs.flatMap((slug) => [
    { slug, locale: 'en' },
    { slug, locale: 'vi' }
  ])
}
```

## Results

### Before
- Static pages served from cache
- Database updates invisible to users
- Required rebuild and redeploy for content changes
- CMS updates took 5-10 minutes to appear (full CI/CD cycle)

### After
- Pages render dynamically on each request
- Database updates immediately visible
- No rebuild required for content changes
- CMS updates appear instantly

## Technical Deep Dive

### Next.js Rendering Modes

Next.js App Router supports multiple rendering strategies:

1. **Static Generation (default)**: Pages built at build time
2. **Dynamic Rendering**: Pages built on each request
3. **Incremental Static Regeneration (ISR)**: Static pages with revalidation period

### Why `export const dynamic = 'force-dynamic'` Works

This export tells Next.js to:
- Skip static generation during build
- Render the page on-demand for each request
- Always fetch fresh data from the database
- Bypass Next.js cache for this route

### Alternative Solutions Considered

1. **Incremental Static Regeneration (ISR)**
   ```typescript
   export const revalidate = 60 // Revalidate every 60 seconds
   ```
   - Pros: Better performance than full dynamic rendering
   - Cons: Still has delay between updates and visibility

2. **On-Demand Revalidation**
   ```typescript
   // In API route after update
   revalidatePath(`/blog/${slug}`)
   ```
   - Pros: Best of both worlds (static performance + instant updates)
   - Cons: More complex implementation, requires API integration

3. **Client-Side Data Fetching**
   - Pros: Always fresh data
   - Cons: Poor SEO, slower initial page load, more client-side JavaScript

## Commit History

### Commit e3f22d6
**Message**: "fix: enable dynamic rendering for individual blog posts"

**Changes**: Added `export const dynamic = 'force-dynamic'` to blog post detail page

**Files Modified**:
- `src/app/[locale]/(site)/blog/[slug]/page.tsx` (+3 lines)

**Impact**: Resolved cache issue, enabled instant CMS updates

### Related Commits

- **1fb3390**: Added validation for slug conflicts and debug logging
- **cd4d622**: Fixed blog post content update issue in TipTap editor

## Lessons Learned

1. **Default behavior matters**: Understanding framework defaults (SSG in Next.js) is crucial
2. **Development vs Production**: Issues may only appear in production builds
3. **Consistency across routes**: Blog listing and detail pages should have matching caching strategies
4. **Simple solutions first**: A single line configuration change solved the problem
5. **Performance trade-offs**: Dynamic rendering trades build-time performance for data freshness

## Performance Considerations

### Trade-offs

**Static Generation (Before)**:
- ✓ Fastest possible page loads
- ✓ Lower server load
- ✗ Stale content
- ✗ Requires rebuilds for updates

**Dynamic Rendering (After)**:
- ✓ Always fresh content
- ✓ No rebuild required
- ✗ Slightly slower page loads (database query on each request)
- ✗ Higher server load

### Optimization Opportunities

For future improvement, consider implementing on-demand revalidation:

```typescript
// In src/app/api/blog/[id]/route.ts
import { revalidatePath } from 'next/cache'

export async function PUT(request: Request) {
  // ... update blog post ...

  // Revalidate the specific post page
  revalidatePath(`/blog/${updatedPost.slug}`)
  revalidatePath(`/${locale}/blog/${updatedPost.slug}`)

  return Response.json(updatedPost)
}
```

This would enable:
- Static generation for performance
- Instant updates when content changes
- Best of both worlds

## Conclusion

The blog post cache issue was resolved by forcing dynamic rendering on individual post pages to match the behavior of the blog listing page. This ensures CMS updates are immediately visible without requiring application rebuilds, at the cost of slightly increased server load per request.

For a content-heavy CMS where updates need to be immediately visible, this trade-off is acceptable. Future optimization with on-demand revalidation could restore static generation benefits while maintaining instant update capability.

## References

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Next.js Data Fetching and Caching](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating)
- [Route Segment Config: dynamic](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic)
- [Incremental Static Regeneration](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)

---

**Date**: December 3, 2025
**Author**: Thi Nguyen with Claude Code
**Project**: nextjs-duongtran
**Status**: Resolved
