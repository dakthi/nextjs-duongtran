import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper to convert plain text to TipTap JSON
function textToTipTapJson(lines: string[]): any {
  const content: any[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Check if it's a bullet point
    if (trimmed.startsWith('•')) {
      const text = trimmed.substring(1).trim();
      content.push({
        type: 'bulletList',
        content: [{
          type: 'listItem',
          content: [{
            type: 'paragraph',
            content: [{ type: 'text', text }]
          }]
        }]
      });
    }
    // Check if it's a heading (starts with capital, short line)
    else if (trimmed.length < 100 && trimmed.match(/^[A-ZĐÀÁẢÃẠ]/)) {
      content.push({
        type: 'heading',
        attrs: { level: 3 },
        content: [{ type: 'text', text: trimmed }]
      });
    }
    // Regular paragraph
    else {
      content.push({
        type: 'paragraph',
        content: [{ type: 'text', text: trimmed }]
      });
    }
  }

  return { type: 'doc', content };
}

// Helper to convert plain text to HTML
function textToHtml(lines: string[]): string {
  const html: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith('•')) {
      html.push(`<li>${trimmed.substring(1).trim()}</li>`);
    } else if (trimmed.length < 100 && trimmed.match(/^[A-ZĐÀÁẢÃẠ]/)) {
      html.push(`<h3>${trimmed}</h3>`);
    } else {
      html.push(`<p>${trimmed}</p>`);
    }
  }

  return html.join('\n');
}

const posts = [
  {
    slug: 'mo-va-duy-tri-cong-ty-o-anh-ngay-cang-dat-do-hon',
    lines: [
      'Hôm qua, đang chill chill trên tàu DLR về nhà thì Liệu đọc được tin mới từ govuk: "Companies House sẽ tăng phí từ tháng 2/2026."',
      'Phí đăng ký công ty online sắp tăng lên £100. Trước đây chỉ £12, rồi tăng lên £50 vào năm 2024 và giờ lại tăng thêm lần nữa mà còn gấp đôi.',
      'Không chỉ mở công ty tốn hơn, mà giữ công ty cũng chẳng còn rẻ như trước. Phí nộp confirmation statement online sẽ tăng từ £34 lên £50. Trước 2024, phí này chỉ £13 thôi.',
      'Điều thú vị là, phí giải thể công ty online lại giảm, từ £33 xuống còn £13.',
      'Có vẻ họ muốn khuyến khích những ai không thực sự hoạt động thì nên đóng công ty, còn người duy trì thì phải tuân thủ và trả phí cao hơn.',
      'Companies House cho biết việc tăng phí nhằm duy trì hệ thống minh bạch, phát hiện công ty "ảo", xử lý dữ liệu sai và chuẩn bị cho việc xác minh danh tính bắt buộc từ tháng 11/2025.',
      'Theo họ, mức phí ở Anh vẫn thấp hơn nhiều nước khác và thay đổi này cần thiết để tạo môi trường kinh doanh đáng tin cậy.',
      'Liệu hiểu điều đó, nhưng cũng nghĩ ngay đến những người mới bắt đầu. Với họ, self employed vẫn là lựa chọn hợp lý: ít chi phí, ít thủ tục. Tất nhiên, khi luật MTD (Making Tax Digital) có hiệu lực, người làm self employed có thu nhập cao cũng nên cân nhắc chuyển sang Ltd.',
      'Với những ai đã có kế hoạch mở công ty, thì nên làm sớm để tránh mức phí mới. Ngày 01/02/2026 tăng phí thì cùng lắm 31/01/2026 mình đăng ký mở công ty 😀'
    ]
  }
];

async function main() {
  console.log('Updating all migrated posts with HTML in all 3 fields...\n');

  for (const post of posts) {
    try {
      const contentHtml = textToHtml(post.lines);
      const contentJson = textToTipTapJson(post.lines);
      const content = contentHtml; // Same as HTML for TipTap compatibility

      await prisma.blogPost.updateMany({
        where: {
          slug: post.slug,
          locale: 'vi',
        },
        data: {
          content,
          contentHtml,
          contentJson: contentJson as any,
          updatedAt: new Date(),
        },
      });

      console.log(`✅ Updated: ${post.slug}`);
    } catch (error) {
      console.error(`❌ Error updating ${post.slug}:`, error);
    }
  }

  console.log('\n✨ All posts updated!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
