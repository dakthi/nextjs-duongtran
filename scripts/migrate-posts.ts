import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface BlogPost {
  title: string;
  content: string;
  slug: string;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function parsePosts(content: string): BlogPost[] {
  const posts: BlogPost[] = [];

  // Split by separator lines (em dash followed by dashes)
  const sections = content.split(/—[-]+/);

  for (const section of sections) {
    const trimmedSection = section.trim();
    if (!trimmedSection) continue;

    const lines = trimmedSection.split('\n');

    // Skip BOM and get first non-empty line as title
    let title = '';
    let contentStartIndex = 0;

    for (let i = 0; i < lines.length; i++) {
      const trimmedLine = lines[i].trim().replace(/^\uFEFF/, ''); // Remove BOM
      if (trimmedLine && !title) {
        title = trimmedLine;
        contentStartIndex = i + 1;
        break;
      }
    }

    if (!title) continue;

    // Get all content after the title
    const contentLines = lines.slice(contentStartIndex).filter(line => {
      const trimmed = line.trim();
      return trimmed.length > 0;
    });

    if (contentLines.length > 0) {
      const content = contentLines.join('\n').trim();
      const slug = generateSlug(title);

      posts.push({
        title,
        content,
        slug,
      });
    }
  }

  return posts;
}

async function main() {
  const filePath = path.join(process.cwd(), 'posts-migrate', 'Lieu Vo - Posts.txt');
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const posts = parsePosts(fileContent);

  console.log(`Found ${posts.length} posts to migrate`);

  for (const post of posts) {
    console.log(`\nMigrating: ${post.title}`);
    console.log(`Slug: ${post.slug}`);

    try {
      // Check if post already exists
      const existing = await prisma.blogPost.findUnique({
        where: {
          locale_slug: {
            locale: 'vi',
            slug: post.slug,
          },
        },
      });

      if (existing) {
        console.log(`⚠️  Post already exists, skipping...`);
        continue;
      }

      // Create the post
      const created = await prisma.blogPost.create({
        data: {
          locale: 'vi',
          slug: post.slug,
          title: post.title,
          content: post.content,
          excerpt: post.content.substring(0, 200) + '...',
          isPublished: true,
          readingTime: Math.ceil(post.content.split(/\s+/).length / 200), // Rough estimate: 200 words per minute
        },
      });

      console.log(`✅ Created post with ID: ${created.id}`);
    } catch (error) {
      console.error(`❌ Error migrating post "${post.title}":`, error);
    }
  }

  console.log('\n✨ Migration complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
