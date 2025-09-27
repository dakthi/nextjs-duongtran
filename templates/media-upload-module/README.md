# Media Upload Module Template

A complete, production-ready media upload system for Next.js applications with both frontend and backend components.

## Features

- **Complete Upload System**: Drag & drop file upload with validation
- **Media Library**: Grid-based media management interface
- **Metadata Management**: Alt text and caption editing
- **Dual Storage**: Supports both Cloudflare R2 and local file storage
- **Security**: File signature validation, rate limiting, authentication
- **TypeScript**: Fully typed for better developer experience

## Quick Start

1. **Copy Template Files**: Copy the contents of this template to your project
2. **Install Dependencies**: Add required packages (see `config/dependencies.json`)
3. **Database Setup**: Add media schema to your Prisma database
4. **Environment Variables**: Configure storage settings (see `config/environment.example`)
5. **Import Components**: Use the components in your application

## File Structure

```
templates/media-upload-module/
├── README.md                    # This file
├── frontend/
│   ├── components/
│   │   ├── FileUpload.tsx      # Main upload component
│   │   └── MediaLibrary.tsx    # Media management interface
│   └── utils/
│       └── image-utils.ts      # Client-side utilities
├── backend/
│   ├── api/
│   │   ├── media/
│   │   │   ├── route.ts       # Upload endpoints
│   │   │   └── [id]/route.ts  # Media item operations
│   │   └── media-status.ts    # Storage status
│   ├── lib/
│   │   ├── r2-storage.ts      # Cloud storage
│   │   └── media-processor.ts # Server processing
│   └── database/
│       └── schema.prisma      # Database schema
├── types/
│   └── media.types.ts         # Shared interfaces
└── config/
    ├── dependencies.json      # Required packages
    ├── environment.example    # Environment variables
    └── installation.md        # Detailed setup
```

## Usage Examples

### Basic File Upload Component

```tsx
import FileUpload from './components/FileUpload'

function MyPage() {
  const handleFileSelect = (mediaItem) => {
    console.log('File uploaded:', mediaItem)
    // Handle the uploaded file
  }

  return (
    <FileUpload
      onFileSelect={handleFileSelect}
      label="Upload Your Image"
      accept="image/*"
      showMediaLibrary={true}
    />
  )
}
```

### Media Library Interface

```tsx
import MediaLibrary from './components/MediaLibrary'

function AdminMediaPage() {
  return <MediaLibrary />
}
```

## Configuration

### Required Environment Variables

```bash
# Database
DATABASE_URL="your-database-url"

# Cloudflare R2 (optional - falls back to local storage)
R2_ACCOUNT_ID="your-account-id"
R2_ACCESS_KEY_ID="your-access-key"
R2_SECRET_ACCESS_KEY="your-secret-key"
R2_BUCKET_NAME="your-bucket-name"
R2_PUBLIC_URL="https://your-domain.com" # Optional for public URLs
```

### Storage Options

1. **Cloudflare R2 (Recommended)**: Configure R2 environment variables for cloud storage
2. **Local Storage**: Files stored in `public/uploads/` if R2 not configured

## Integration Steps

See `config/installation.md` for detailed integration instructions.

## Customization

- **File Types**: Modify `allowedTypes` in validation utilities
- **File Size Limits**: Adjust `maxSize` in both frontend and backend
- **UI Styling**: Customize Tailwind CSS classes
- **Storage Logic**: Extend or modify storage providers

## Dependencies

This module requires specific packages. See `config/dependencies.json` for the complete list.

## Security Features

- File signature (magic number) validation
- File type validation
- File size limits
- Rate limiting for uploads
- Authentication middleware
- Secure filename generation

## Database Schema

The module uses Prisma with a `MediaItem` model. See `database/schema.prisma` for the complete schema.

## Support

This template is based on production code from a Next.js community center website. It handles real-world use cases including:

- Multiple file formats (JPG, PNG, GIF, WebP)
- Large file handling
- Error recovery
- Metadata management
- Storage provider flexibility

---

Created with ❤️ for modular Next.js development