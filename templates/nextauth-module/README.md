# NextAuth Module Template

A complete authentication system for Next.js applications using NextAuth.js v4, PostgreSQL, and Prisma. Based on production-ready patterns with admin user seeding.

## ✨ Features

### Authentication
- **Credentials Provider**: Email/password authentication with bcrypt hashing
- **Session Management**: JWT-based sessions with role-based access control
- **User Roles**: Admin, editor, user roles with database storage
- **Account Status**: Active/inactive user management
- **Secure Passwords**: Bcrypt password hashing with salt rounds

### Database Integration
- **PostgreSQL**: Production-ready database storage
- **Prisma ORM**: Type-safe database operations
- **User Model**: Complete user management with roles and timestamps
- **Account/Session Models**: NextAuth required models included

### Admin Features
- **Admin Seeding**: Automatic admin user creation in seed file
- **User Management**: Admin interface for user management
- **Role Management**: Role-based access control
- **Login Interface**: Custom login page with proper styling

## 📋 Prerequisites

Before installing, ensure you have:

- [ ] **Next.js 14+** project with App Router
- [ ] **PostgreSQL** database running and accessible
- [ ] **Prisma ORM** installed in your project
- [ ] **TypeScript** configured
- [ ] **Tailwind CSS** for styling (optional but recommended)

## 🚀 Quick Start

### 1. Check Your Requirements

Verify your project structure matches:
```
your-project/
├── src/
│   ├── app/
│   ├── components/
│   └── lib/
├── prisma/
├── package.json
└── .env
```

### 2. Install Dependencies

```bash
npm install next-auth @auth/prisma-adapter bcryptjs
npm install -D @types/bcryptjs
```

### 3. Copy Template Files

Copy files from this template to your project:

```bash
# Copy core NextAuth files
cp templates/nextauth-module/lib/* src/lib/
cp templates/nextauth-module/api/* src/app/api/auth/[...nextauth]/
cp templates/nextauth-module/types/* src/types/

# Copy admin components (if you have admin system)
cp templates/nextauth-module/components/* src/components/
```

### 4. Environment Setup

Create or update your `.env.local`:

```env
# Database - Update with your PostgreSQL connection
DATABASE_URL="postgresql://username:password@localhost:5432/your_database"

# NextAuth - Generate random strings for production
NEXTAUTH_SECRET="your-super-secret-key-here-generate-random-string"
NEXTAUTH_URL="http://localhost:3000"

# Optional: Admin user for seeding
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="changeme123"
```

### 5. Database Schema

Your Prisma schema needs these models (add if missing):

```prisma
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

### 6. Run Database Migration

```bash
npx prisma migrate dev --name add-nextauth
npx prisma generate
```

### 7. Seed Admin User

Use the example seed file to create an admin user:

```typescript
// Add to your prisma/seed.ts or use the provided example
import { seedAdminUser } from './templates/nextauth-module/prisma/seed.example'

async function main() {
  await seedAdminUser()
  // ... your other seeding
}
```

Run the seed:
```bash
npx prisma db seed
```

## 📁 Template Structure

```
nextauth-module/
├── README.md                    # This comprehensive guide
├── lib/
│   ├── auth.ts                 # NextAuth configuration
│   ├── auth-utils.ts           # Helper functions
│   └── password.ts             # Password hashing utilities
├── api/
│   └── [...nextauth]/
│       └── route.ts            # NextAuth API route
├── components/
│   ├── LoginForm.tsx           # Custom login form
│   ├── AdminAuth.tsx           # Admin authentication wrapper
│   └── UserManagement.tsx      # User management interface
├── types/
│   └── next-auth.d.ts          # TypeScript type declarations
├── prisma/
│   └── seed.example.ts         # Admin user seeding example
├── middleware/
│   └── auth.middleware.ts      # Optional auth middleware
└── config/
    ├── installation.md         # Detailed setup instructions
    └── environment.example     # Environment variables
```

## 🔐 Security Features

### Password Security
- **Bcrypt Hashing**: All passwords hashed with salt rounds
- **Strong Defaults**: Secure password requirements
- **No Plain Text**: Passwords never stored in plain text

### Session Security
- **JWT Tokens**: Secure, stateless session management
- **Configurable Expiry**: Session timeout configuration
- **CSRF Protection**: Built-in CSRF protection

### Role-Based Access
- **User Roles**: Admin, editor, user roles
- **Access Control**: Role-based route protection
- **Admin Interface**: Secure admin user management

## 🎯 Usage Examples

### Protected API Routes

```typescript
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  return Response.json({ user: session.user })
}
```

### Protected Pages

```tsx
"use client"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function AdminPage() {
  const { data: session, status } = useSession()

  if (status === "loading") return <div>Loading...</div>
  if (!session) redirect("/api/auth/signin")

  return <div>Admin content</div>
}
```

### Login/Logout

```tsx
import { signIn, signOut, useSession } from "next-auth/react"

export function AuthButtons() {
  const { data: session } = useSession()

  if (session) {
    return (
      <button onClick={() => signOut()}>
        Sign out {session.user?.email}
      </button>
    )
  }

  return (
    <button onClick={() => signIn()}>
      Sign in
    </button>
  )
}
```

## 🔧 Customization

### Adding New Providers

```typescript
// In lib/auth.ts, add providers:
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

### Custom User Roles

```typescript
// Update your User model:
model User {
  role String @default("user") // Add custom roles: "admin", "moderator", "premium"
  // ...
}

// Use in auth callbacks:
callbacks: {
  async jwt({ token, user }) {
    if (user?.role) token.role = user.role
    return token
  }
}
```

## 🚀 Production Deployment

### Environment Variables
Set these in production:
```env
DATABASE_URL="your-production-database-url"
NEXTAUTH_SECRET="strong-random-secret-for-production"
NEXTAUTH_URL="https://yourdomain.com"
```

### Security Checklist
- [ ] Strong NEXTAUTH_SECRET generated
- [ ] Database secured with proper credentials
- [ ] HTTPS enabled in production
- [ ] Admin password changed from default
- [ ] User roles properly configured
- [ ] Session timeout configured appropriately

## 🔧 Troubleshooting

### Common Issues

**"Invalid credentials" error**
- Check password hashing (bcrypt.compare)
- Verify user exists and is active
- Check email matching (case sensitivity)

**"Session not persisting"**
- Verify NEXTAUTH_SECRET is set
- Check database session storage
- Ensure cookies are allowed

**"Database connection failed"**
- Verify DATABASE_URL is correct
- Check PostgreSQL is running
- Run `npx prisma migrate dev`

**"Admin user not created"**
- Check seed file ran successfully
- Verify ADMIN_EMAIL/PASSWORD env vars
- Check for database constraints

### Getting Help

1. Check the detailed installation.md guide
2. Verify all environment variables are set
3. Test database connection with Prisma Studio
4. Review NextAuth.js documentation for advanced configuration

---

## 📝 Template Information

**Perfect for**: Any Next.js project needing secure authentication with admin capabilities

**Database**: PostgreSQL (can be adapted for other databases)

**Authentication**: Email/password with role-based access control

**Key Features**:
- ✅ Production-ready security
- ✅ Admin user seeding
- ✅ Role-based access control
- ✅ TypeScript support
- ✅ Prisma integration
- ✅ Custom login interface
- ✅ User management system

**Default Admin User** (created by seed):
- Email: admin@example.com (or ADMIN_EMAIL env var)
- Password: changeme123 (or ADMIN_PASSWORD env var)
- Role: admin
- Status: active

**Important**: Change the default admin password after first login!

---

Created with ❤️ for secure authentication needs.