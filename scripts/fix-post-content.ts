import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Convert plain text content to HTML
 * Each line becomes a separate paragraph, unless it's part of a list
 * Handles:
 * - Each line as a separate paragraph
 * - Bullet points (lines starting with •, -, or →)
 * - Emoji markers like 💕
 */
function convertPlainTextToHtml(text: string): string {
  const lines = text.split('\n');
  const htmlParts: string[] = [];
  let currentList: string[] = [];
  let listType: 'ul' | null = null;

  const flushList = () => {
    if (currentList.length > 0 && listType) {
      htmlParts.push(`<${listType}>`);
      currentList.forEach(item => {
        htmlParts.push(`<li>${item}</li>`);
      });
      htmlParts.push(`</${listType}>`);
      currentList = [];
      listType = null;
    }
  };

  for (let line of lines) {
    const trimmed = line.trim();

    // Skip completely empty lines
    if (!trimmed) {
      flushList();
      continue;
    }

    // Check if it's a list item
    const bulletMatch = trimmed.match(/^[•\-→]\s+(.+)$/);

    if (bulletMatch) {
      if (listType !== 'ul') {
        flushList();
        listType = 'ul';
      }
      currentList.push(bulletMatch[1]);
    }
    // Check if it's just an emoji or decorative element (like 💕)
    else if (trimmed.match(/^[💕❤️✨🎯📌⭐️]+$/)) {
      flushList();
      htmlParts.push(`<p class="text-center my-4">${trimmed}</p>`);
    }
    // Regular text line - each line becomes its own paragraph
    else {
      flushList();

      // Check if it looks like a section heading
      if (trimmed.length < 100 && trimmed.match(/^[💕\s]*[A-ZĐÀÁẢÃẠÂẦẤẨẪẬĂẰẮẲẴẶÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴ]/)) {
        htmlParts.push(`<p><strong>${trimmed}</strong></p>`);
      } else {
        htmlParts.push(`<p>${trimmed}</p>`);
      }
    }
  }

  // Flush remaining list
  flushList();

  return htmlParts.join('\n');
}

async function main() {
  console.log('Finding recently migrated posts to fix...\n');

  const posts = await prisma.blogPost.findMany({
    where: {
      locale: 'vi',
      createdAt: {
        gte: new Date(Date.now() - 3 * 60 * 60 * 1000), // Last 3 hours
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  console.log(`Found ${posts.length} posts to update\n`);

  for (const post of posts) {
    console.log(`Processing: ${post.title}`);
    console.log(`  Slug: ${post.slug}`);

    try {
      const contentHtml = convertPlainTextToHtml(post.content);

      // Update the post with HTML content
      await prisma.blogPost.update({
        where: { id: post.id },
        data: { contentHtml },
      });

      console.log(`  ✅ Updated with HTML content\n`);
    } catch (error) {
      console.error(`  ❌ Error updating post:`, error);
    }
  }

  console.log('✨ Content conversion complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
