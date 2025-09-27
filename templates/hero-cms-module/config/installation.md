# Hero CMS Module Installation Guide

This guide will walk you through integrating the Hero CMS Module into your Next.js application.

## Prerequisites

- Next.js 13+ application
- Prisma ORM with PostgreSQL/MySQL database
- Existing `SiteSetting` model in your schema
- NextAuth.js for authentication (optional but recommended)
- Tailwind CSS for styling

## Installation Steps

### 1. Database Setup

The Hero CMS Module uses the existing `SiteSetting` model. Ensure your Prisma schema includes:

```prisma
model SiteSetting {
  id          Int      @id @default(autoincrement())
  key         String   @unique
  value       String?
  type        String
  description String?
  updatedAt   DateTime @updatedAt @map("updated_at")

  @@map("site_settings")
}
```

If you don't have this model, add it to your `schema.prisma` and run:

```bash
npx prisma migrate dev --name add-site-settings
```

### 2. Copy Template Files

Copy the template files to your project:

```bash
# Copy backend files
cp -r templates/hero-cms-module/backend/* src/
cp -r templates/hero-cms-module/types/* src/

# Copy frontend components
mkdir -p src/components/hero
cp templates/hero-cms-module/frontend/components/* src/components/hero/

# Copy admin page (adjust path as needed for your admin setup)
mkdir -p src/app/admin/hero
cp templates/hero-cms-module/frontend/pages/HeroAdmin.tsx src/app/admin/hero/page.tsx
```

### 3. Install Required Dependencies

The module uses existing dependencies, but ensure you have:

```json
{
  "dependencies": {
    "@prisma/client": "^5.0.0",
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "prisma": "^5.0.0",
    "tailwindcss": "^3.0.0",
    "typescript": "^5.0.0"
  }
}
```

### 4. Update Your Imports

Create an index file for easy imports:

```typescript
// src/components/hero/index.ts
export { HeroDisplay, useHeroData } from './HeroDisplay'
export { HeroEditor } from './HeroEditor'
export { HeroPreview, HeroPreviewWithFrames, HeroPreviewMini } from './HeroPreview'
```

### 5. Configure API Routes

Ensure your authentication middleware is set up. The module expects:

```typescript
// src/lib/auth-middleware.ts (example)
import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'

export async function checkAuth(request: NextRequest): Promise<boolean> {
  // Your authentication logic here
  // Return true if authenticated, false otherwise
  const session = await getServerSession(/* your config */)
  return !!session?.user
}
```

### 6. Add Admin Route

Add the hero management to your admin navigation:

```tsx
// src/app/admin/layout.tsx (example)
const adminNavigation = [
  // ... other nav items
  {
    name: 'Hero Section',
    href: '/admin/hero',
    icon: /* your icon */
  }
]
```

### 7. Update Your Homepage

Replace your existing hero implementation:

```tsx
// src/app/page.tsx
import { HeroDisplay, useHeroData } from '@/components/hero'
import { getHeroSettings } from '@/backend/lib/hero-service'

export default async function HomePage() {
  const heroData = await getHeroSettings()

  return (
    <div>
      <HeroDisplay
        title={heroData.hero_title}
        subtitle={heroData.hero_subtitle}
        description={heroData.hero_description}
        backgroundImage={heroData.hero_background_image}
        primaryButton={heroData.hero_cta_button_text ? {
          text: heroData.hero_cta_button_text,
          link: heroData.hero_cta_button_link || '#'
        } : undefined}
        secondaryButton={heroData.hero_secondary_button_text ? {
          text: heroData.hero_secondary_button_text,
          link: heroData.hero_secondary_button_link || '#'
        } : undefined}
        stats={{
          residentsServed: heroData.residents_served || '2,000+',
          weeklyPrograms: heroData.weekly_programs || '15+',
          openingHours: heroData.opening_hours_text || '7 days',
          mainHallCapacity: heroData.main_hall_capacity || '120'
        }}
      />
      {/* Rest of your homepage */}
    </div>
  )
}
```

### 8. Environment Variables

The module doesn't require additional environment variables if you're using existing database and authentication setup.

### 9. Database Seeding (Optional)

Add default hero settings to your database:

```typescript
// prisma/seed.ts (example)
const heroSettings = [
  {
    key: 'hero_title',
    value: 'Your Organization Name',
    type: 'string',
    description: 'Main hero section title'
  },
  {
    key: 'hero_subtitle',
    value: 'Serving the community with excellence',
    type: 'string',
    description: 'Hero section subtitle'
  },
  {
    key: 'hero_background_image',
    value: '/img/hero-bg.jpg',
    type: 'image',
    description: 'Hero background image URL'
  },
  // Add other settings...
]

await prisma.siteSetting.createMany({
  data: heroSettings,
  skipDuplicates: true
})
```

## Customization Options

### Field Configuration

Modify the field groups in `HeroEditor.tsx` to add or remove fields:

```typescript
const fieldGroups: HeroFieldGroup[] = [
  {
    title: 'Custom Section',
    description: 'Your custom fields',
    fields: [
      {
        key: 'custom_field',
        label: 'Custom Field',
        type: 'text',
        placeholder: 'Enter value...',
        required: true
      }
    ]
  }
]
```

### Styling Customization

The module uses Tailwind CSS classes. Customize by:

1. **Colors**: Update `primary-600`, `primary-700` classes in components
2. **Typography**: Modify font sizes and weights in `HeroDisplay.tsx`
3. **Layout**: Adjust grid and spacing classes
4. **Animations**: Add custom animations to buttons and elements

### API Endpoints

Extend the API functionality by modifying:

- `backend/api/hero/route.ts` - Add new endpoints
- `backend/lib/hero-service.ts` - Add business logic
- `types/hero.types.ts` - Add new interfaces

## Testing

1. **Database**: Verify settings are saved correctly
```bash
npx prisma studio
# Check site_settings table for hero data
```

2. **API**: Test endpoints manually
```bash
curl http://localhost:3000/api/hero
```

3. **Frontend**: Test the admin interface
   - Navigate to `/admin/hero`
   - Make changes and verify they appear on homepage
   - Test validation and error handling

## Troubleshooting

### Common Issues

1. **Authentication Errors**: Ensure `checkAuth` function is properly implemented
2. **Database Errors**: Check Prisma schema and database connection
3. **Image Loading**: Verify image URLs are accessible
4. **Styling Issues**: Ensure Tailwind CSS is configured correctly

### Debug Mode

Enable debug logging by adding to your API routes:

```typescript
const DEBUG = process.env.NODE_ENV === 'development'

if (DEBUG) {
  console.log('Hero API Debug:', { method, data })
}
```

## Production Deployment

1. **Build**: Ensure the module builds without errors
```bash
npm run build
```

2. **Database**: Run migrations on production
```bash
npx prisma migrate deploy
```

3. **Environment**: Set production environment variables
4. **Caching**: Consider adding Redis for enhanced caching

## Support

- **Documentation**: Refer to component JSDoc comments
- **Examples**: Check the template files for usage examples
- **Community**: Join discussions about Next.js CMS patterns

---

The Hero CMS Module is now ready to use! Navigate to `/admin/hero` to start customizing your homepage hero section.