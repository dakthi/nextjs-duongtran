# News & Blog Module - Installation Guide

This guide walks you through integrating the comprehensive News & Blog Module into your Next.js project.

## Prerequisites

- Next.js 14+ project with TypeScript
- Database (PostgreSQL, MySQL, or SQLite)
- Prisma ORM set up in your project
- Authentication system (NextAuth.js recommended)

## Step-by-Step Installation

### 1. Install Dependencies

```bash
# Core dependencies
npm install @prisma/client prisma next-auth

# Optional form handling (recommended)
npm install react-hook-form zod @hookform/resolvers

# Dev dependencies
npm install --save-dev @types/node @types/react @types/react-dom
```

### 2. Database Schema

Add the NewsPost model to your `prisma/schema.prisma`:

```prisma
model NewsPost {
  id           Int       @id @default(autoincrement())
  title        String
  slug         String    @unique
  excerpt      String?
  content      String
  imageUrl     String?   @map("image_url")
  category     String    @default("general")
  tags         String?
  author       String?
  featured     Boolean   @default(false)
  published    Boolean   @default(false)
  publishedAt  DateTime? @map("published_at")
  displayOrder Int       @default(0) @map("display_order")
  viewCount    Int       @default(0) @map("view_count")
  createdAt    DateTime  @default(now()) @map("created_at")
  updatedAt    DateTime  @updatedAt @map("updated_at")

  @@index([published, featured, publishedAt])
  @@index([category, published])
  @@index([slug])
  @@index([author, published])
  @@map("news_posts")
}
```

Run the migration:

```bash
npx prisma migrate dev --name add_news_posts
npx prisma generate
```

### 3. Environment Variables

Copy `config/environment.example` to your `.env.local` and configure:

```bash
cp config/environment.example .env.local
```

**Required variables:**
```bash
DATABASE_URL="your-database-url"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

**Optional configuration:**
```bash
NEWS_POSTS_PER_PAGE="10"
NEWS_DEFAULT_CATEGORY="general"
SITE_NAME="Your Website"
ENABLE_RSS_FEED="true"
```

### 4. Copy Module Files

Copy the module files to your project:

```bash
# Frontend components and pages
cp -r frontend/pages/* src/app/
cp -r frontend/utils/* src/lib/

# Backend API routes and services
cp -r backend/api/* src/app/api/
cp -r backend/lib/* src/lib/

# Types (adjust path as needed)
cp -r types/* src/types/
```

### 5. Required Dependencies Setup

Ensure you have these core services in your project:

#### A. Prisma Client
```typescript
// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

#### B. NextAuth Configuration
```typescript
// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
// or other providers

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // Add other providers as needed
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    authorized: ({ token }) => !!token,
  },
})

export { handler as GET, handler as POST }
```

### 6. Route Setup

#### A. Public News Pages
```typescript
// src/app/news/page.tsx - News listing
import NewsIndex from '@/templates/news-blog-module/frontend/pages/NewsIndex'
export default NewsIndex

// src/app/news/[slug]/page.tsx - Individual post
import NewsPost from '@/templates/news-blog-module/frontend/pages/NewsPost'
export default NewsPost
```

#### B. Admin Interface
```typescript
// src/app/admin/news/page.tsx - Admin news management
import AdminNews from '@/templates/news-blog-module/frontend/pages/AdminNews'
export default AdminNews
```

### 7. Styling Setup

The module uses Tailwind CSS classes. Ensure your `tailwind.config.js` includes:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './templates/**/*.{js,ts,jsx,tsx,mdx}', // Include templates
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // For prose content
  ],
}
```

### 8. Navigation Integration

Add news links to your navigation:

```typescript
// Example navigation component
const navigationLinks = [
  { name: 'Home', href: '/' },
  { name: 'News', href: '/news' },
  { name: 'About', href: '/about' },
  // ... other links
]

// Admin navigation
const adminLinks = [
  { name: 'Dashboard', href: '/admin' },
  { name: 'News', href: '/admin/news' },
  // ... other admin links
]
```

### 9. SEO and Meta Tags Setup

```typescript
// src/app/news/layout.tsx
export const metadata = {
  title: 'News & Announcements',
  description: 'Stay updated with our latest news',
}

// Individual post metadata is handled in NewsPost.tsx
```

### 10. RSS Feed Setup (Optional)

```typescript
// src/app/feed.xml/route.ts
import { getNews } from '@/lib/news-service'

export async function GET() {
  const posts = await getNews({ limit: 20 })

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>${process.env.SITE_NAME}</title>
        <description>Latest news and updates</description>
        <link>${process.env.SITE_URL}</link>
        ${posts.map(post => `
          <item>
            <title>${post.title}</title>
            <description>${post.excerpt || ''}</description>
            <link>${process.env.SITE_URL}/news/${post.slug}</link>
            <pubDate>${new Date(post.publishedAt || post.createdAt).toUTCString()}</pubDate>
          </item>
        `).join('')}
      </channel>
    </rss>`

  return new Response(rss, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
```

## Usage Examples

### Basic News Display
```tsx
import { getNews } from '@/lib/news-service'

export default async function HomePage() {
  const featuredNews = await getNews({ featured: true, limit: 3 })

  return (
    <div>
      <h2>Latest News</h2>
      {featuredNews.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
          <a href={`/news/${post.slug}`}>Read more</a>
        </div>
      ))}
    </div>
  )
}
```

### Custom Admin Form
```tsx
import { useState } from 'react'
import { NewsPost } from '@/types/news.types'

function NewsForm({ onSubmit, initialData }: {
  onSubmit: (data: any) => void
  initialData?: NewsPost
}) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    category: initialData?.category || 'general',
    published: initialData?.published || false,
  })

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      onSubmit(formData)
    }}>
      {/* Form fields here */}
    </form>
  )
}
```

## Advanced Configuration

### Custom Categories
Modify the categories in `types/news.types.ts`:

```typescript
export const NEWS_CATEGORIES: NewsCategory[] = [
  {
    value: 'announcements',
    label: 'Announcements',
    color: 'bg-blue-100 text-blue-800',
    description: 'Important announcements'
  },
  // Add your custom categories
]
```

### Rich Text Editor Integration
```bash
npm install @tiptap/react @tiptap/starter-kit
```

```tsx
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

function RichTextEditor({ content, onChange }: {
  content: string
  onChange: (content: string) => void
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  return <EditorContent editor={editor} />
}
```

### Search Integration
```typescript
// Advanced search with filters
export async function searchNews(query: string, filters: NewsFilters) {
  const where: any = {
    published: true,
    OR: [
      { title: { contains: query, mode: 'insensitive' } },
      { content: { contains: query, mode: 'insensitive' } },
      { excerpt: { contains: query, mode: 'insensitive' } },
    ],
  }

  if (filters.category) {
    where.category = filters.category
  }

  return await prisma.newsPost.findMany({ where })
}
```

## Security Considerations

1. **Authentication**: All admin operations require valid authentication
2. **Input Validation**: Server-side validation for all inputs
3. **SQL Injection**: Protected by Prisma ORM
4. **XSS Prevention**: Sanitize content display
5. **Slug Uniqueness**: Automatic unique slug generation

## Performance Optimization

1. **Database Indexes**: Pre-configured for common queries
2. **Pagination**: Built-in pagination support
3. **Caching**: Redis-ready query structure
4. **Image Optimization**: Next.js Image component ready

## Troubleshooting

### Common Issues

1. **Database Connection**: Verify DATABASE_URL is correct
2. **Authentication**: Ensure NextAuth is properly configured
3. **Slugs**: Check for duplicate slug conflicts
4. **Images**: Verify media upload integration

### Debug Mode

Set `DEBUG_NEWS_MODULE=true` in environment for detailed logging.

## Production Deployment

1. **Environment Variables**: Set all required production variables
2. **Database Migration**: Run migrations in production
3. **Image Optimization**: Configure image CDN
4. **Caching Strategy**: Implement Redis or similar
5. **Monitoring**: Set up error tracking and analytics

## Customization

### Extending the Schema
```prisma
model NewsPost {
  // ... existing fields

  // Add custom fields
  readingTime    Int?
  featured_until DateTime?
  customMeta     Json?
}
```

### Custom API Endpoints
```typescript
// src/app/api/news/trending/route.ts
export async function GET() {
  const trending = await prisma.newsPost.findMany({
    where: { published: true },
    orderBy: { viewCount: 'desc' },
    take: 10
  })

  return NextResponse.json(trending)
}
```

---

For additional support and advanced customization options, refer to the main README.md or create an issue in your project repository.

🚀 Your news and blog system is now ready for production use!