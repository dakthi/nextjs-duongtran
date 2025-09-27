# NextAuth Module - Detailed Installation Guide

## Prerequisites Verification

Before installing, ensure your project has:

1. **Next.js 14+ with App Router**
   ```bash
   npx create-next-app@latest your-app --typescript --tailwind --eslint --app
   ```

2. **PostgreSQL Database**
   - Local: PostgreSQL server running
   - Remote: Database URL ready
   - Test connection: `psql -h host -U user -d database`

3. **Prisma ORM**
   ```bash
   npm install prisma @prisma/client
   npx prisma init
   ```

## Step-by-Step Installation

### 1. Install Required Dependencies

```bash
# NextAuth and authentication dependencies
npm install next-auth @auth/prisma-adapter

# Password hashing
npm install bcryptjs
npm install -D @types/bcryptjs

# Optional: Session management utilities
npm install jose # For JWT handling if needed
```

### 2. Environment Variables Setup

Create or update `.env.local`:

```env
# Database Connection
DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name"

# NextAuth Configuration
NEXTAUTH_SECRET="your-super-secret-jwt-key-here-minimum-32-characters"
NEXTAUTH_URL="http://localhost:3000"

# Admin User Seeding (optional but recommended)
ADMIN_EMAIL="admin@yourdomain.com"
ADMIN_PASSWORD="your-secure-admin-password-here"
ADMIN_NAME="Admin User"

# Optional: Additional providers
# GOOGLE_CLIENT_ID="your-google-client-id"
# GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

**Important Security Notes**:
- Generate NEXTAUTH_SECRET: `openssl rand -base64 32`
- Use strong admin passwords in production
- Never commit `.env` files to version control

### 3. Database Schema Setup

Add these models to your `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// User model for authentication
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  password      String?   // For credentials provider
  role          String    @default("user")  // "admin", "editor", "user"
  active        Boolean   @default(true)
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")
  lastLogin     DateTime? @map("last_login")

  // NextAuth required relations
  accounts      Account[]
  sessions      Session[]

  @@map("users")
}

// NextAuth required models
model Account {
  id                String  @id @default(cuid())
  userId            String  @map("user_id")
  type              String
  provider          String
  providerAccountId String  @map("provider_account_id")
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique @map("session_token")
  userId       String   @map("user_id")
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

model VerificationToken {
  identifier String
  token      String
  expires    DateTime

  @@unique([identifier, token])
  @@map("verificationtokens")
}
```

### 4. Run Database Migration

```bash
# Create and run migration
npx prisma migrate dev --name add-nextauth-authentication

# Generate Prisma client
npx prisma generate

# Optional: Open Prisma Studio to verify tables
npx prisma studio
```

### 5. Copy Template Files

**Core NextAuth Files**:
```bash
# Create directories if they don't exist
mkdir -p src/lib src/app/api/auth/[...nextauth] src/types src/components

# Copy core files
cp templates/nextauth-module/lib/auth.ts src/lib/auth.ts
cp templates/nextauth-module/lib/password.ts src/lib/password.ts
cp templates/nextauth-module/api/route.ts src/app/api/auth/[...nextauth]/route.ts
cp templates/nextauth-module/types/next-auth.d.ts src/types/next-auth.d.ts

# Copy components
cp templates/nextauth-module/components/AdminAuth.tsx src/components/AdminAuth.tsx
cp templates/nextauth-module/components/LoginForm.tsx src/components/LoginForm.tsx
```

### 6. Create Prisma Client (if not exists)

Create `src/lib/prisma.ts`:
```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### 7. Seed Admin User

**Option A**: Integrate with existing seed file
```typescript
// Add to your existing prisma/seed.ts
import { seedAdminUser } from '../templates/nextauth-module/prisma/seed.example'

async function main() {
  // Your existing seeding
  // ...

  // Add NextAuth seeding
  await seedAdminUser()
}
```

**Option B**: Use standalone seed file
```bash
cp templates/nextauth-module/prisma/seed.example.ts prisma/nextauth-seed.ts
npx tsx prisma/nextauth-seed.ts
```

**Option C**: Manual admin user creation
```bash
# Create admin user script
cp templates/nextauth-module/lib/create-admin.ts src/lib/create-admin.ts
npx tsx src/lib/create-admin.ts
```

### 8. Configure Session Provider

Update your root layout (`src/app/layout.tsx`):

```tsx
import { SessionProvider } from 'next-auth/react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
```

### 9. Create Login Page

Create `src/app/admin/login/page.tsx`:
```tsx
"use client"

import LoginForm from '@/components/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <LoginForm redirectTo="/admin" />
    </div>
  )
}
```

### 10. Test Authentication

1. **Start your development server**:
   ```bash
   npm run dev
   ```

2. **Navigate to login page**:
   ```
   http://localhost:3000/admin/login
   ```

3. **Use seeded admin credentials**:
   - Email: admin@example.com (or your ADMIN_EMAIL)
   - Password: changeme123 (or your ADMIN_PASSWORD)

4. **Verify authentication**:
   - Check session in browser dev tools
   - Navigate to protected routes
   - Test role-based access

## Verification Steps

### Database Verification
```bash
# Check if tables were created
npx prisma studio

# Or using psql
psql $DATABASE_URL -c "\dt"
```

### API Route Testing
```bash
# Test NextAuth API routes
curl http://localhost:3000/api/auth/providers
curl http://localhost:3000/api/auth/session
```

### Session Testing
```typescript
// Test in a component or API route
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function GET() {
  const session = await getServerSession(authOptions)
  return Response.json({ session })
}
```

## Troubleshooting

### Common Issues

**1. "NEXTAUTH_SECRET is not set"**
```bash
# Generate a secret
openssl rand -base64 32

# Add to .env.local
NEXTAUTH_SECRET="generated-secret-here"
```

**2. "Database connection failed"**
- Check DATABASE_URL format
- Verify PostgreSQL is running
- Test connection: `npx prisma migrate status`

**3. "Invalid credentials" on login**
- Check if admin user exists: `npx prisma studio`
- Verify password hashing in seed file
- Check console logs for auth errors

**4. "User role not found"**
- Verify User model includes role field
- Run migration if role field was added later
- Check session callback in auth.ts

**5. "Session not persisting"**
- Check NEXTAUTH_SECRET is set correctly
- Verify cookies are enabled
- Check session configuration in auth.ts

### Debug Mode

Enable debug logging:
```env
# In .env.local
NEXTAUTH_DEBUG=true
```

Check server logs for detailed auth flow information.

### Production Checklist

Before deploying:
- [ ] Strong NEXTAUTH_SECRET set
- [ ] Database migrations run
- [ ] Admin user created with strong password
- [ ] Environment variables configured
- [ ] HTTPS enabled
- [ ] Session timeout configured
- [ ] Cookie security settings reviewed

## Advanced Configuration

### Adding OAuth Providers

```typescript
// In lib/auth.ts
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({ /* existing */ }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  // ...
}
```

### Custom Session Timeout

```typescript
// In lib/auth.ts
session: {
  strategy: "jwt",
  maxAge: 7 * 24 * 60 * 60, // 7 days
  updateAge: 24 * 60 * 60,   // 1 day
}
```

### Role-Based Middleware

Create `src/middleware.ts`:
```typescript
import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Add custom logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Role-based access control
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return token?.role === "admin"
        }
        return !!token
      },
    },
  }
)

export const config = {
  matcher: ["/admin/:path*"]
}
```

## Support

For additional help:
1. Check NextAuth.js documentation: https://next-auth.js.org/
2. Review Prisma documentation: https://www.prisma.io/docs
3. Check template example implementation
4. Enable debug mode for detailed logs

---

**Security Reminder**: Always change default passwords and use strong secrets in production!