# Media Upload Module - Installation Guide

This guide walks you through integrating the Media Upload Module into your Next.js project.

## Prerequisites

- Next.js 14+ project with TypeScript
- Database (PostgreSQL, MySQL, or SQLite)
- Prisma ORM set up in your project

## Step-by-Step Installation

### 1. Install Dependencies

```bash
# Core dependencies
npm install @prisma/client prisma

# Cloud storage (optional - for R2/S3 support)
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner

# Image processing (optional - for optimization)
npm install sharp

# Dev dependencies
npm install --save-dev @types/node
```

### 2. Database Schema

Add the MediaItem model to your `prisma/schema.prisma`:

```prisma
model MediaItem {
  id           Int      @id @default(autoincrement())
  filename     String
  originalName String
  filePath     String
  fileType     String
  fileSize     Int?
  altText      String?
  caption      String?
  uploadedAt   DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@map("media_items")
}
```

Run the migration:

```bash
npx prisma migrate dev --name add_media_items
npx prisma generate
```

### 3. Environment Variables

Copy `config/environment.example` to your `.env.local` and configure:

```bash
cp config/environment.example .env.local
```

**Required variables:**
- `DATABASE_URL`: Your database connection string
- `NEXTAUTH_SECRET`: For authentication (you'll need auth middleware)

**Optional (for cloud storage):**
- `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`

### 4. Copy Module Files

Copy the module files to your project:

```bash
# Frontend components
cp -r frontend/components/* src/components/
cp -r frontend/utils/* src/lib/

# Backend API routes
cp -r backend/api/* src/app/api/
cp -r backend/lib/* src/lib/

# Types (choose location that fits your project)
cp -r types/* src/types/
```

### 5. Required Dependencies Setup

You need to implement or have these in your project:

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

#### B. Authentication Middleware
```typescript
// src/lib/auth-middleware.ts
import { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function checkAuth(request: NextRequest): Promise<boolean> {
  try {
    const token = await getToken({ req: request })
    return !!token // Return true if user is authenticated
  } catch {
    return false
  }
}
```

#### C. Rate Limiter (Basic Implementation)
```typescript
// src/lib/rate-limiter.ts
interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetTime: number
}

class SimpleRateLimiter {
  private attempts = new Map<string, { count: number; resetTime: number }>()

  checkLimit(ip: string): RateLimitResult {
    const now = Date.now()
    const windowMs = 15 * 60 * 1000 // 15 minutes
    const maxAttempts = 10

    const existing = this.attempts.get(ip)

    if (!existing || now > existing.resetTime) {
      this.attempts.set(ip, { count: 1, resetTime: now + windowMs })
      return { allowed: true, remaining: maxAttempts - 1, resetTime: now + windowMs }
    }

    if (existing.count >= maxAttempts) {
      return { allowed: false, remaining: 0, resetTime: existing.resetTime }
    }

    existing.count++
    return {
      allowed: true,
      remaining: maxAttempts - existing.count,
      resetTime: existing.resetTime
    }
  }
}

export const uploadRateLimiter = new SimpleRateLimiter()

export function getClientIp(request: NextRequest): string {
  return request.ip ??
         request.headers.get('x-forwarded-for') ??
         request.headers.get('x-real-ip') ??
         'unknown'
}
```

### 6. File Upload API Route (Additional)

If you need a file serving route for local storage:

```typescript
// src/app/api/media/file/[filename]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename
    const uploadDir = process.env.UPLOAD_PATH || path.join(process.cwd(), 'public', 'uploads')
    const filePath = path.join(uploadDir, filename)

    const fileBuffer = await readFile(filePath)

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'image/*', // Adjust based on file type
        'Cache-Control': 'public, max-age=31536000'
      }
    })
  } catch (error) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 })
  }
}
```

### 7. Create Upload Directory

```bash
mkdir -p public/uploads
echo "*" > public/uploads/.gitignore
echo "!.gitignore" >> public/uploads/.gitignore
```

### 8. Usage Example

```tsx
// pages/admin/media.tsx or app/admin/media/page.tsx
import MediaLibrary from '@/components/MediaLibrary'

export default function AdminMediaPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <MediaLibrary />
    </div>
  )
}
```

```tsx
// In a form component
import FileUpload from '@/components/FileUpload'
import { MediaItem } from '@/types/media.types'

function MyForm() {
  const [selectedImage, setSelectedImage] = useState<MediaItem | null>(null)

  return (
    <form>
      <FileUpload
        onFileSelect={setSelectedImage}
        currentImage={selectedImage?.filePath}
        label="Choose Hero Image"
        accept="image/*"
        showMediaLibrary={true}
      />
    </form>
  )
}
```

## Configuration Options

### Cloud Storage (Cloudflare R2)

1. Create R2 bucket in Cloudflare dashboard
2. Generate API keys with read/write permissions
3. Configure environment variables
4. Optional: Set up custom domain for public URLs

### Local Storage

Files stored in `public/uploads/` by default. Configure `UPLOAD_PATH` to change location.

## Security Considerations

1. **File Validation**: Module validates file signatures (magic numbers)
2. **Size Limits**: Default 5MB limit, configurable
3. **Type Restrictions**: Only allows image types by default
4. **Rate Limiting**: Prevents abuse with configurable limits
5. **Authentication**: Requires valid auth token for uploads
6. **Path Traversal**: Sanitizes filenames

## Customization

### File Types
Modify `allowedTypes` array in `backend/api/media/route.ts`

### Size Limits
Change `maxSize` in both frontend validation and backend processing

### Storage Location
Set `UPLOAD_PATH` environment variable for local storage

### UI Styling
Modify Tailwind CSS classes in components

### Image Processing
Enable/disable Sharp processing via environment variables

## Troubleshooting

### Common Issues

1. **Sharp Installation**: Platform-specific, may need rebuild on deployment
2. **File Permissions**: Ensure upload directory is writable
3. **R2 CORS**: Configure CORS policy for browser uploads
4. **Database Connection**: Verify DATABASE_URL is correct
5. **Auth Middleware**: Implement proper authentication checks

### Debug Mode

Set `DEBUG_MEDIA_UPLOADS=true` in environment for detailed logging.

## Production Deployment

1. Build and deploy normally
2. Ensure upload directory exists and is writable
3. Configure CDN for better performance
4. Set up backup strategy for uploaded files
5. Monitor disk usage for local storage
6. Set up log rotation for upload logs

---

For additional support or customization, refer to the module's README.md or create an issue in your project repository.