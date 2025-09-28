# Admin System Architecture Guide

## Overview
Complete admin panel implementation with authentication, authorization, role-based access control, and dashboard analytics.

## Architecture Components

```
┌────────────────────────────────────────────────────┐
│                   Admin Frontend                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐    │
│  │Dashboard │  │   CRUD   │  │   Analytics  │    │
│  │  Pages   │  │  Pages   │  │  Components  │    │
│  └──────────┘  └──────────┘  └──────────────┘    │
└────────────────────────────────────────────────────┘
                         │
                         ▼
┌────────────────────────────────────────────────────┐
│              Authentication Layer                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐    │
│  │NextAuth  │  │   JWT    │  │   Session    │    │
│  │Provider  │  │  Tokens  │  │  Management  │    │
│  └──────────┘  └──────────┘  └──────────────┘    │
└────────────────────────────────────────────────────┘
                         │
                         ▼
┌────────────────────────────────────────────────────┐
│              Authorization Layer                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐    │
│  │   RBAC   │  │Middleware│  │ Permission   │    │
│  │  System  │  │  Guards  │  │   Checks     │    │
│  └──────────┘  └──────────┘  └──────────────┘    │
└────────────────────────────────────────────────────┘
```

## Authentication System

### 1. NextAuth Configuration

```typescript
// lib/auth.ts
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import { compare } from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "admin@example.com"
        },
        password: {
          label: "Password",
          type: "password"
        }
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: {
            role: {
              include: {
                permissions: true
              }
            }
          }
        });

        if (!user || !user.password) {
          throw new Error('User not found');
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        // Log authentication attempt
        await prisma.authLog.create({
          data: {
            userId: user.id,
            action: 'LOGIN',
            ipAddress: credentials.ipAddress || 'unknown',
            success: true
          }
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role?.name || 'user',
          permissions: user.role?.permissions.map(p => p.name) || []
        };
      }
    })
  ],

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.permissions = user.permissions;
      }

      // Handle session updates
      if (trigger === 'update' && session) {
        token = { ...token, ...session };
      }

      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.permissions = token.permissions as string[];
      }

      return session;
    }
  },

  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },

  events: {
    async signOut({ token }) {
      if (token?.id) {
        await prisma.authLog.create({
          data: {
            userId: token.id as string,
            action: 'LOGOUT',
            success: true
          }
        });
      }
    }
  }
};
```

### 2. Database Schema for Auth

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  password      String?
  name          String?
  image         String?
  emailVerified DateTime? @map("email_verified")

  roleId        String?   @map("role_id")
  role          Role?     @relation(fields: [roleId], references: [id])

  active        Boolean   @default(true)
  lastLogin     DateTime? @map("last_login")

  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")

  authLogs      AuthLog[]
  sessions      Session[]

  @@map("users")
}

model Role {
  id          String       @id @default(cuid())
  name        String       @unique
  description String?

  permissions Permission[]
  users       User[]

  createdAt   DateTime     @default(now()) @map("created_at")
  updatedAt   DateTime     @updatedAt @map("updated_at")

  @@map("roles")
}

model Permission {
  id          String   @id @default(cuid())
  name        String   @unique
  description String?
  resource    String   // e.g., 'users', 'bookings', 'facilities'
  action      String   // e.g., 'create', 'read', 'update', 'delete'

  roles       Role[]

  @@unique([resource, action])
  @@map("permissions")
}

model AuthLog {
  id        String   @id @default(cuid())
  userId    String   @map("user_id")
  user      User     @relation(fields: [userId], references: [id])

  action    String   // LOGIN, LOGOUT, FAILED_LOGIN, PASSWORD_RESET
  ipAddress String?  @map("ip_address")
  userAgent String?  @map("user_agent")
  success   Boolean  @default(true)

  createdAt DateTime @default(now()) @map("created_at")

  @@index([userId])
  @@index([createdAt])
  @@map("auth_logs")
}
```

## Authorization System

### 1. Role-Based Access Control (RBAC)

```typescript
// lib/rbac.ts
export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MANAGER: 'manager',
  STAFF: 'staff',
  USER: 'user'
} as const;

export const PERMISSIONS = {
  // User management
  USER_CREATE: 'user:create',
  USER_READ: 'user:read',
  USER_UPDATE: 'user:update',
  USER_DELETE: 'user:delete',

  // Booking management
  BOOKING_CREATE: 'booking:create',
  BOOKING_READ: 'booking:read',
  BOOKING_UPDATE: 'booking:update',
  BOOKING_DELETE: 'booking:delete',
  BOOKING_APPROVE: 'booking:approve',

  // Facility management
  FACILITY_CREATE: 'facility:create',
  FACILITY_READ: 'facility:read',
  FACILITY_UPDATE: 'facility:update',
  FACILITY_DELETE: 'facility:delete',

  // Analytics
  ANALYTICS_VIEW: 'analytics:view',
  ANALYTICS_EXPORT: 'analytics:export',

  // System
  SYSTEM_CONFIG: 'system:config',
  SYSTEM_LOGS: 'system:logs'
} as const;

// Role-Permission Mapping
export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: Object.values(PERMISSIONS),

  [ROLES.ADMIN]: [
    PERMISSIONS.USER_CREATE,
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_UPDATE,
    PERMISSIONS.BOOKING_CREATE,
    PERMISSIONS.BOOKING_READ,
    PERMISSIONS.BOOKING_UPDATE,
    PERMISSIONS.BOOKING_DELETE,
    PERMISSIONS.BOOKING_APPROVE,
    PERMISSIONS.FACILITY_READ,
    PERMISSIONS.FACILITY_UPDATE,
    PERMISSIONS.ANALYTICS_VIEW
  ],

  [ROLES.MANAGER]: [
    PERMISSIONS.USER_READ,
    PERMISSIONS.BOOKING_CREATE,
    PERMISSIONS.BOOKING_READ,
    PERMISSIONS.BOOKING_UPDATE,
    PERMISSIONS.BOOKING_APPROVE,
    PERMISSIONS.FACILITY_READ,
    PERMISSIONS.ANALYTICS_VIEW
  ],

  [ROLES.STAFF]: [
    PERMISSIONS.BOOKING_CREATE,
    PERMISSIONS.BOOKING_READ,
    PERMISSIONS.FACILITY_READ
  ],

  [ROLES.USER]: [
    PERMISSIONS.BOOKING_CREATE,
    PERMISSIONS.BOOKING_READ
  ]
};
```

### 2. Permission Checking Utilities

```typescript
// lib/permissions.ts
import { getServerSession } from 'next-auth';
import { authOptions } from './auth';

export async function checkPermission(permission: string): Promise<boolean> {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return false;
  }

  // Super admin has all permissions
  if (session.user.role === ROLES.SUPER_ADMIN) {
    return true;
  }

  return session.user.permissions?.includes(permission) || false;
}

export async function requirePermission(permission: string) {
  const hasPermission = await checkPermission(permission);

  if (!hasPermission) {
    throw new Error(`Permission denied: ${permission}`);
  }
}

// HOC for client components
export function withPermission<P extends object>(
  Component: React.ComponentType<P>,
  permission: string
) {
  return function PermissionWrapper(props: P) {
    const { data: session } = useSession();

    if (!session?.user.permissions?.includes(permission)) {
      return <AccessDenied />;
    }

    return <Component {...props} />;
  };
}
```

### 3. Middleware Protection

```typescript
// middleware.ts
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Check role-based access
    if (path.startsWith('/admin/users') && token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/admin/unauthorized', req.url));
    }

    if (path.startsWith('/admin/system') && token?.role !== 'super_admin') {
      return NextResponse.redirect(new URL('/admin/unauthorized', req.url));
    }

    // Log admin access
    logAdminAccess({
      userId: token?.id,
      path,
      method: req.method,
      ip: req.ip
    });

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
);

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*'
  ]
};
```

## Admin Dashboard Components

### 1. Dashboard Layout

```tsx
// components/AdminLayout.tsx
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { data: session } = useSession();
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: HomeIcon },
    { name: 'Bookings', href: '/admin/bookings', icon: CalendarIcon, permission: 'booking:read' },
    { name: 'Facilities', href: '/admin/facilities', icon: BuildingIcon, permission: 'facility:read' },
    { name: 'Users', href: '/admin/users', icon: UsersIcon, permission: 'user:read' },
    { name: 'Analytics', href: '/admin/analytics', icon: ChartIcon, permission: 'analytics:view' },
    { name: 'Settings', href: '/admin/settings', icon: CogIcon, permission: 'system:config' },
  ];

  const visibleNavigation = navigation.filter(item =>
    !item.permission || session?.user.permissions?.includes(item.permission)
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-gray-900">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="px-4 py-5 bg-gray-800">
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {visibleNavigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    group flex items-center px-2 py-2 text-sm font-medium rounded-md
                    ${isActive
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }
                  `}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Menu */}
          <div className="px-4 py-4 border-t border-gray-700">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-white">
                  {session?.user.name}
                </p>
                <p className="text-xs text-gray-400">
                  {session?.user.role}
                </p>
              </div>
              <button
                onClick={() => signOut()}
                className="p-2 text-gray-400 hover:text-white"
              >
                <LogoutIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="px-4 py-4 sm:px-6 lg:px-8">
            <Breadcrumbs />
          </div>
        </header>

        {/* Page Content */}
        <main className="py-6">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
```

### 2. Dashboard Statistics

```tsx
// app/admin/page.tsx
import { Suspense } from 'react';
import { requirePermission } from '@/lib/permissions';
import { AdminLayout } from '@/components/AdminLayout';

async function getStats() {
  const [users, bookings, facilities, revenue] = await Promise.all([
    prisma.user.count(),
    prisma.booking.count({ where: { status: 'confirmed' } }),
    prisma.facility.count({ where: { active: true } }),
    prisma.booking.aggregate({
      _sum: { totalAmount: true },
      where: {
        status: 'confirmed',
        createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
      }
    })
  ]);

  return {
    totalUsers: users,
    activeBookings: bookings,
    facilities: facilities,
    monthlyRevenue: revenue._sum.totalAmount || 0
  };
}

export default async function AdminDashboard() {
  await requirePermission('analytics:view');
  const stats = await getStats();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={UsersIcon}
            trend="+12%"
            trendUp={true}
          />
          <StatCard
            title="Active Bookings"
            value={stats.activeBookings}
            icon={CalendarIcon}
            trend="+5%"
            trendUp={true}
          />
          <StatCard
            title="Facilities"
            value={stats.facilities}
            icon={BuildingIcon}
          />
          <StatCard
            title="Monthly Revenue"
            value={`$${stats.monthlyRevenue.toLocaleString()}`}
            icon={DollarIcon}
            trend="+18%"
            trendUp={true}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Suspense fallback={<ChartSkeleton />}>
            <BookingTrendsChart />
          </Suspense>
          <Suspense fallback={<ChartSkeleton />}>
            <RevenueChart />
          </Suspense>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
          </div>
          <Suspense fallback={<ActivitySkeleton />}>
            <RecentActivity />
          </Suspense>
        </div>
      </div>
    </AdminLayout>
  );
}

// Stat Card Component
function StatCard({ title, value, icon: Icon, trend, trendUp }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
              {trend} from last month
            </p>
          )}
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
      </div>
    </div>
  );
}
```

### 3. CRUD Interface Example

```tsx
// app/admin/users/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { DataTable } from '@/components/DataTable';
import { UserForm } from '@/components/UserForm';

export default function UsersPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({ role: 'all', status: 'all' });

  const canCreate = session?.user.permissions?.includes('user:create');
  const canUpdate = session?.user.permissions?.includes('user:update');
  const canDelete = session?.user.permissions?.includes('user:delete');

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  async function fetchUsers() {
    const params = new URLSearchParams(filters);
    const response = await fetch(`/api/admin/users?${params}`);
    const data = await response.json();
    setUsers(data);
  }

  async function handleSave(userData) {
    const method = selectedUser ? 'PUT' : 'POST';
    const url = selectedUser
      ? `/api/admin/users/${selectedUser.id}`
      : '/api/admin/users';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    if (response.ok) {
      fetchUsers();
      setShowForm(false);
      setSelectedUser(null);
    }
  }

  async function handleDelete(userId) {
    if (!confirm('Are you sure you want to delete this user?')) return;

    const response = await fetch(`/api/admin/users/${userId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      fetchUsers();
    }
  }

  const columns = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (user) => (
        <div>
          <p className="font-medium">{user.name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      )
    },
    {
      key: 'role',
      label: 'Role',
      sortable: true,
      render: (user) => (
        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
          {user.role?.name || 'User'}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (user) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {user.active ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      key: 'lastLogin',
      label: 'Last Login',
      render: (user) => user.lastLogin
        ? new Date(user.lastLogin).toLocaleDateString()
        : 'Never'
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (user) => (
        <div className="flex gap-2">
          {canUpdate && (
            <button
              onClick={() => {
                setSelectedUser(user);
                setShowForm(true);
              }}
              className="text-blue-600 hover:text-blue-800"
            >
              Edit
            </button>
          )}
          {canDelete && (
            <button
              onClick={() => handleDelete(user.id)}
              className="text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Users</h1>
          {canCreate && (
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add User
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <select
            value={filters.role}
            onChange={(e) => setFilters({ ...filters, role: e.target.value })}
            className="px-3 py-2 border rounded"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="staff">Staff</option>
            <option value="user">User</option>
          </select>

          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-3 py-2 border rounded"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={users}
          searchKeys={['name', 'email']}
        />

        {/* User Form Modal */}
        {showForm && (
          <Modal onClose={() => {
            setShowForm(false);
            setSelectedUser(null);
          }}>
            <UserForm
              user={selectedUser}
              onSave={handleSave}
              onCancel={() => {
                setShowForm(false);
                setSelectedUser(null);
              }}
            />
          </Modal>
        )}
      </div>
    </AdminLayout>
  );
}
```

## Security Best Practices

### 1. Session Security

```typescript
// lib/session-security.ts
export async function validateSession(sessionId: string) {
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true }
  });

  if (!session) return null;

  // Check if session expired
  if (session.expiresAt < new Date()) {
    await prisma.session.delete({ where: { id: sessionId } });
    return null;
  }

  // Check if user is still active
  if (!session.user.active) {
    await prisma.session.delete({ where: { id: sessionId } });
    return null;
  }

  // Update last activity
  await prisma.session.update({
    where: { id: sessionId },
    data: { lastActivity: new Date() }
  });

  return session;
}
```

### 2. Rate Limiting

```typescript
// lib/rate-limiter.ts
import { LRUCache } from 'lru-cache';

const rateLimiters = new Map<string, LRUCache<string, number>>();

export function createRateLimiter(name: string, options: {
  max: number;
  window: number;
}) {
  const limiter = new LRUCache<string, number>({
    max: 500,
    ttl: options.window
  });

  rateLimiters.set(name, limiter);
  return limiter;
}

export async function checkRateLimit(
  limiter: string,
  identifier: string,
  limit: number = 10
): Promise<boolean> {
  const cache = rateLimiters.get(limiter);
  if (!cache) return true;

  const current = cache.get(identifier) || 0;

  if (current >= limit) {
    return false;
  }

  cache.set(identifier, current + 1);
  return true;
}

// Usage in API route
export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';

  if (!await checkRateLimit('login', ip, 5)) {
    return NextResponse.json(
      { error: 'Too many attempts' },
      { status: 429 }
    );
  }

  // Process login
}
```

### 3. Audit Logging

```typescript
// lib/audit.ts
interface AuditLogEntry {
  userId: string;
  action: string;
  resource: string;
  resourceId?: string;
  oldValue?: any;
  newValue?: any;
  metadata?: Record<string, any>;
}

export async function logAudit(entry: AuditLogEntry) {
  await prisma.auditLog.create({
    data: {
      ...entry,
      oldValue: entry.oldValue ? JSON.stringify(entry.oldValue) : null,
      newValue: entry.newValue ? JSON.stringify(entry.newValue) : null,
      metadata: entry.metadata ? JSON.stringify(entry.metadata) : null,
      timestamp: new Date()
    }
  });
}

// Usage example
await logAudit({
  userId: session.user.id,
  action: 'UPDATE',
  resource: 'user',
  resourceId: userId,
  oldValue: { role: 'staff' },
  newValue: { role: 'manager' },
  metadata: { reason: 'Promotion' }
});
```

## Testing Admin Features

```typescript
// __tests__/admin/auth.test.ts
describe('Admin Authentication', () => {
  it('should allow admin login with valid credentials', async () => {
    const response = await fetch('/api/auth/callback/credentials', {
      method: 'POST',
      body: JSON.stringify({
        email: 'admin@test.com',
        password: 'admin123'
      })
    });

    expect(response.status).toBe(200);
    const session = await response.json();
    expect(session.user.role).toBe('admin');
  });

  it('should prevent access to admin routes without auth', async () => {
    const response = await fetch('/admin/users');
    expect(response.status).toBe(401);
  });

  it('should enforce role-based access', async () => {
    // Login as staff user
    const session = await loginAs('staff@test.com');

    // Try to access admin-only route
    const response = await fetch('/admin/users', {
      headers: {
        'Cookie': `session=${session.token}`
      }
    });

    expect(response.status).toBe(403);
  });
});
```

## Deployment Considerations

### 1. Environment Variables
```env
# Production .env
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=generate-strong-secret
DATABASE_URL=postgresql://...

# Security
SESSION_MAX_AGE=86400
MAX_LOGIN_ATTEMPTS=5
RATE_LIMIT_WINDOW=900000

# Admin
SUPER_ADMIN_EMAIL=super@yourdomain.com
DEFAULT_ADMIN_PASSWORD=change-this-immediately
```

### 2. Initial Setup Script
```typescript
// scripts/setup-admin.ts
async function setupAdmin() {
  // Create default roles
  const roles = ['super_admin', 'admin', 'manager', 'staff', 'user'];

  for (const roleName of roles) {
    await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: {
        name: roleName,
        permissions: {
          connect: ROLE_PERMISSIONS[roleName].map(p => ({ name: p }))
        }
      }
    });
  }

  // Create super admin user
  const hashedPassword = await hash(process.env.DEFAULT_ADMIN_PASSWORD!, 12);

  await prisma.user.upsert({
    where: { email: process.env.SUPER_ADMIN_EMAIL! },
    update: {},
    create: {
      email: process.env.SUPER_ADMIN_EMAIL!,
      password: hashedPassword,
      name: 'Super Admin',
      role: {
        connect: { name: 'super_admin' }
      }
    }
  });

  console.log('Admin setup complete');
}
```

This admin system provides a complete, production-ready foundation for managing your application with proper authentication, authorization, and security measures in place.