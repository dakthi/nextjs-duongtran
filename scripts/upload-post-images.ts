import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import * as crypto from 'crypto';

const prisma = new PrismaClient();

const s3Client = new S3Client({
  region: process.env.R2_REGION || 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

interface ImageMapping {
  filename: string;
  title: string;
}

const imageMappings: ImageMapping[] = [
  {
    filename: 'Mở và duy trì công ty ở Anh ngày càng đắt đỏ hơn.jpg',
    title: 'Mở và duy trì công ty ở Anh ngày càng đắt đỏ hơn',
  },
  {
    filename: 'Vì sao năm thuế ở Anh bắt đầu từ ngày 6_4 mà không phải 1_1 hay 1_4_.jpg',
    title: 'Vì sao năm thuế ở Anh bắt đầu từ ngày 6/4 mà không phải 1/1 hay 1/4?',
  },
  {
    filename: 'Không muốn tốn phí ngân hàng, có thể dùng tài khoản cá nhân cho business được không_.jpg',
    title: 'Không muốn tốn phí ngân hàng, có thể dùng tài khoản cá nhân cho business được không?',
  },
  {
    filename: 'Nợ thuế không trả, HMRC có thể rút tiền trực tiếp từ tài khoản, kể cả ISA.jpg',
    title: 'Nợ thuế không trả, HMRC có thể rút tiền trực tiếp từ tài khoản, kể cả ISA',
  },
  {
    filename: 'Cần bao nhiêu tiền để về hưu ở Anh_.jpg',
    title: 'Cần bao nhiêu tiền để về hưu ở Anh?',
  },
  {
    filename: '30 Days Tax Tips - Day 6_ Giữa hai người cùng mức thu nhập, chỉ một người biết cách chia lương thông minh.jpg',
    title: '30 Days Tax Tips - Day 6',
  },
  {
    filename: 'Khách hàng xui xẻo nhất Liệu từng gặp, mọi người đọc để rút kinh nghiệm nha.jpg',
    title: 'Khách hàng xui xẻo nhất Liệu từng gặp, mọi người đọc để rút kinh nghiệm nha',
  },
  {
    filename: 'Mạng xã hội như một sân khấu mở, nơi ai cũng có thể bước lên, cầm micro và cất tiếng nói.jpg',
    title: 'Ngày trước, để được nhiều người biết đến, bạn phải phụ thuộc vào những kênh truyền thông lớn: TV, báo chí, radio.',
  },
  {
    filename: '30 Days Tax Tips - Day 5_ Một trong những lý do bạn đóng nhiều thuế hơn người ta khi đều có thu nhập cho thuê nhà.JPG',
    title: '30 Days Tax Tips - Day 5',
  },
  {
    filename: 'Để công ty tồn tại hợp pháp thì đây là những việc cần làm.jpg',
    title: 'Để công ty tồn tại hợp pháp thì đây là những việc cần làm',
  },
  {
    filename: 'Là kế toán, Liệu rất sợ AI.jpg',
    title: 'Là kế toán, Liệu rất sợ AI',
  },
];

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

async function uploadImage(filePath: string, filename: string): Promise<string> {
  const fileBuffer = fs.readFileSync(filePath);
  const fileExtension = path.extname(filename).toLowerCase();

  // Generate unique filename
  const hash = crypto.createHash('md5').update(fileBuffer).digest('hex').substring(0, 8);
  const slug = generateSlug(path.basename(filename, fileExtension));
  const uniqueFilename = `blog/${slug}-${hash}${fileExtension}`;

  const contentType = fileExtension === '.jpg' || fileExtension === '.jpeg'
    ? 'image/jpeg'
    : 'image/png';

  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: uniqueFilename,
    Body: fileBuffer,
    ContentType: contentType,
  });

  await s3Client.send(command);

  const publicUrl = `${process.env.R2_PUBLIC_URL}/${uniqueFilename}`;
  return publicUrl;
}

async function main() {
  const postsDir = path.join(process.cwd(), 'posts-migrate');
  const publicUrl = process.env.NEXT_PUBLIC_MEDIA_BASE_URL || process.env.R2_PUBLIC_URL;

  console.log('Starting image upload and post update...\n');

  for (const mapping of imageMappings) {
    const imagePath = path.join(postsDir, mapping.filename);

    if (!fs.existsSync(imagePath)) {
      console.log(`⚠️  Image not found: ${mapping.filename}`);
      continue;
    }

    console.log(`Processing: ${mapping.title}`);

    // Find the post by title
    const post = await prisma.blogPost.findFirst({
      where: {
        locale: 'vi',
        title: mapping.title,
      },
    });

    if (!post) {
      console.log(`⚠️  Post not found: ${mapping.title}`);
      continue;
    }

    try {
      // Upload image to R2
      console.log(`  📤 Uploading image: ${mapping.filename}`);
      const imageUrl = await uploadImage(imagePath, mapping.filename);
      console.log(`  ✅ Uploaded to: ${imageUrl}`);

      // Update post with image URL
      await prisma.blogPost.update({
        where: { id: post.id },
        data: { image: imageUrl },
      });

      console.log(`  ✅ Updated post with image URL\n`);
    } catch (error) {
      console.error(`  ❌ Error processing ${mapping.filename}:`, error);
    }
  }

  console.log('✨ Image upload complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
