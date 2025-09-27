# Hero CMS Module Template

A complete Content Management System for homepage hero sections in Next.js applications with PostgreSQL, NextAuth, and existing admin infrastructure.

## ✨ Features

### Content Management
- **PostgreSQL-Based**: Uses existing SiteSetting model for data storage
- **NextAuth Integration**: Secure admin access using existing authentication
- **Fallback Content**: Safe defaults ensure hero always displays properly
- **Image Management**: Integrates with existing FileUpload component
- **Statistics Display**: Customizable metrics with live database updates

### Admin Interface
- **Existing Admin Integration**: Uses AdminLayout and AdminAuth components
- **Mobile-First Design**: Responsive interface matching existing admin style
- **Real-time Updates**: Changes appear immediately on homepage
- **Error Handling**: Graceful fallbacks with user-friendly error messages
- **Live Preview**: Direct link to view changes on homepage

### Technical Features
- **Database Integration**: Uses existing SiteSetting Prisma model
- **API Compatibility**: Works with existing /api/settings endpoints
- **TypeScript Support**: Fully typed for better development experience
- **Responsive Design**: Mobile-first approach matching project standards
- **Production Ready**: Includes error handling and fallback systems

## 🚀 Quick Start

**Prerequisites**: Next.js 14+, PostgreSQL, NextAuth, existing admin system

1. **Check Your Current Hero**: Look at your existing Hero component fallback values
2. **Copy Template Files**: Copy files to match your project structure
3. **Update Seed Data**: Use example seed file with your actual content
4. **Add Admin Route**: Include hero management in your admin navigation
5. **Test**: Verify everything works with your existing infrastructure

## 📁 File Structure

```
hero-cms-module/
├── README.md                          # This comprehensive guide
├── frontend/
│   ├── components/                    # Hero display components
│   │   ├── HeroEditor.tsx             # Full hero editing interface
│   │   ├── HeroPreview.tsx            # Live preview component
│   │   └── HeroDisplay.tsx            # Public hero display
│   └── pages/
│       └── HeroAdmin.tsx              # Complete admin page using existing patterns
├── backend/
│   ├── api/
│   │   └── hero/
│   │       └── route.ts               # Hero-specific API endpoints
│   └── lib/
│       ├── hero-service.ts            # Hero business logic
│       └── hero-validation.ts         # Validation schemas
├── prisma/
│   └── seed.example.ts                # Example seed file with instructions
├── types/
│   └── hero.types.ts                  # TypeScript interfaces
└── config/
    ├── installation.md                # Detailed installation guide
    ├── dependencies.json              # Required packages
    └── environment.example            # Environment variables
```

## 📋 Integration Checklist

Before installing, verify your project has:

- [ ] **PostgreSQL** database running
- [ ] **Prisma ORM** with SiteSetting model
- [ ] **NextAuth** configured for admin authentication
- [ ] **AdminLayout** component for admin pages
- [ ] **AdminAuth** component for authentication
- [ ] **FileUpload** component for image management
- [ ] **Existing Hero component** on homepage

## 🎯 Usage Examples

### 1. Installation Steps

**Step 1**: Check your current Hero component
```tsx
// Look at your existing Hero component (src/components/Hero.tsx)
// Note the fallback values and structure

export function Hero({ settings }: HeroProps) {
  const siteTitle = settings?.site_title || 'YOUR_DEFAULT_TITLE_HERE'
  const heroSubtitle = settings?.hero_subtitle || 'YOUR_DEFAULT_SUBTITLE_HERE'
  // ... copy these defaults to your seed file
}
```

**Step 2**: Copy the admin page to your project
```bash
# Copy the admin page
cp templates/hero-cms-module/frontend/pages/HeroAdmin.tsx src/app/admin/hero/page.tsx
```

**Step 3**: Update your seed file
```typescript
// In your prisma/seed.ts, replace placeholders:
const DEFAULT_HERO_CONTENT = {
  hero_title: 'Your Actual Title Here',        // From your Hero component
  hero_subtitle: 'Your Actual Subtitle...',    // From your Hero component
  hero_background_image: '/img/your-image.jpg', // Your actual image path
  // ... etc
}
```

### 2. Admin Integration

**Add to AdminLayout navigation** (src/components/AdminLayout.tsx):
```tsx
// Add to your navigation items
{
  name: 'Hero Section',
  href: '/admin/hero',
  icon: HomeIcon,
  current: pathname === '/admin/hero'
}
```

### 3. API Usage (Uses Existing Endpoints)

The template uses your existing `/api/settings` endpoint:

```typescript
// Fetch hero settings (automatic)
const response = await fetch('/api/settings')
const settings = await response.json()

// Save hero settings (automatic)
const response = await fetch('/api/settings', {
  method: 'PUT',
  body: JSON.stringify({ settings: heroSettingsArray })
})
```

## 🛠 Hero Settings Structure

The module manages these hero-related settings:

### Core Content
- `hero_title`: Main headline text
- `hero_subtitle`: Supporting subtitle text
- `hero_description`: Detailed description
- `hero_background_image`: Background image URL

### Call-to-Action
- `hero_cta_button_text`: Primary button text
- `hero_cta_button_link`: Primary button URL
- `hero_secondary_button_text`: Secondary button text
- `hero_secondary_button_link`: Secondary button URL

### Statistics Display
- `residents_served`: Number of residents served
- `weekly_programs`: Number of weekly programs
- `opening_hours_text`: Operating days/hours
- `main_hall_capacity`: Facility capacity

## 🎨 Customization Options

### Visual Styling
- **Color Scheme**: Modify Tailwind CSS classes for brand colors
- **Typography**: Customize font sizes and weights
- **Layout**: Adjust grid and spacing configurations
- **Animations**: Extend with custom animations

### Field Configuration
- **Add Fields**: Extend with additional hero elements
- **Field Types**: Support for text, textarea, image, boolean, number
- **Validation**: Custom validation rules per field
- **Organization**: Group related fields together

### Preview Features
- **Live Updates**: Real-time preview while editing
- **Responsive Preview**: Preview across different screen sizes
- **Interactive Elements**: Preview CTA button interactions
- **Background Preview**: Real-time background image changes

## 🔐 Security Features

- **Authentication Required**: All admin operations require valid auth
- **Input Validation**: Server-side validation for all inputs
- **File Upload Security**: Secure image upload with validation
- **CSRF Protection**: Built-in Next.js protections
- **Role-based Access**: Configurable admin roles

## 📊 Database Integration

Uses existing `SiteSetting` model structure:
- **Key-Value Storage**: Flexible settings storage
- **Type Support**: String, boolean, number, JSON types
- **Caching**: Intelligent caching with invalidation
- **Bulk Updates**: Efficient batch operations

## 🚀 Production Ready

This module includes:
- **Error Boundaries**: Graceful error handling
- **Loading States**: Professional loading indicators
- **Form Validation**: Real-time validation feedback
- **Responsive Design**: Mobile-first approach
- **Performance**: Optimized database queries
- **SEO**: Meta tag and structured data ready

## 🔧 Advanced Features

### Auto-save
- Configurable auto-save intervals
- Draft state management
- Conflict resolution
- Change tracking

### Content Versioning
- Settings change history
- Rollback capabilities
- Audit trail
- Backup/restore

### Multi-environment
- Development/staging/production settings
- Environment-specific configurations
- Setting synchronization
- Configuration management

## 🚀 Production Deployment

### Before Deployment
1. **Test Locally**: Ensure hero admin works with your existing infrastructure
2. **Database Ready**: Run migrations and seed data in production
3. **Environment Variables**: Set all required environment variables
4. **Image Optimization**: Configure Next.js Image component for production
5. **Admin Access**: Verify admin user can access hero management

### Production Checklist
- [ ] PostgreSQL database accessible
- [ ] All environment variables set
- [ ] Database migrations run
- [ ] Hero seed data populated
- [ ] Admin user created/verified
- [ ] Hero admin page accessible
- [ ] Homepage displays hero correctly
- [ ] Image uploads working (if using FileUpload)

## 🔧 Troubleshooting

### Common Issues

**"Hero content not updating"**
- Check if settings are saving to database (check Network tab)
- Verify SiteSetting model exists with correct fields
- Ensure `/api/settings` endpoint is working

**"Admin page not accessible"**
- Check NextAuth configuration
- Verify admin user exists and is active
- Check AdminLayout and AdminAuth components

**"Images not displaying"**
- Verify image paths are correct
- Check public folder structure
- Ensure FileUpload component is working

**"Database connection errors"**
- Check DATABASE_URL environment variable
- Verify PostgreSQL is running
- Run `npx prisma migrate dev` if needed

### Getting Help

1. Check your existing Hero component for reference
2. Review the installation.md guide thoroughly
3. Test individual components separately
4. Verify database schema matches requirements

---

## 📝 Template Information

**Perfect for**: Community centers, business sites, portfolios, corporate websites, service organizations

**Designed for**: Projects with existing NextAuth + PostgreSQL + Prisma admin systems

**Template Approach**:
- ✅ Uses existing infrastructure
- ✅ Follows existing patterns
- ✅ PostgreSQL + Prisma ready
- ✅ NextAuth compatible
- ✅ Fallback content included
- ✅ Production-ready error handling

**Key Files**:
- `frontend/pages/HeroAdmin.tsx` - Complete admin interface
- `prisma/seed.example.ts` - Seed file template with instructions
- `config/installation.md` - Detailed setup guide

**Next Steps**: After installation, customize the hero fields and statistics to match your organization's needs.

---

Created with ❤️ for modern content management needs.