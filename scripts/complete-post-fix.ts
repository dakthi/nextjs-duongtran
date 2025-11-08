import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Each post needs: content (plain text), contentJson (TipTap), contentHtml (HTML)
const posts = [
  {
    slug: 'mo-va-duy-tri-cong-ty-o-anh-ngay-cang-dat-do-hon',
    content: `Hôm qua, đang chill chill trên tàu DLR về nhà thì Liệu đọc được tin mới từ govuk: "Companies House sẽ tăng phí từ tháng 2/2026."
Phí đăng ký công ty online sắp tăng lên £100. Trước đây chỉ £12, rồi tăng lên £50 vào năm 2024 và giờ lại tăng thêm lần nữa mà còn gấp đôi.
Không chỉ mở công ty tốn hơn, mà giữ công ty cũng chẳng còn rẻ như trước. Phí nộp confirmation statement online sẽ tăng từ £34 lên £50. Trước 2024, phí này chỉ £13 thôi.
Điều thú vị là, phí giải thể công ty online lại giảm, từ £33 xuống còn £13.
Có vẻ họ muốn khuyến khích những ai không thực sự hoạt động thì nên đóng công ty, còn người duy trì thì phải tuân thủ và trả phí cao hơn.
Companies House cho biết việc tăng phí nhằm duy trì hệ thống minh bạch, phát hiện công ty "ảo", xử lý dữ liệu sai và chuẩn bị cho việc xác minh danh tính bắt buộc từ tháng 11/2025.
Theo họ, mức phí ở Anh vẫn thấp hơn nhiều nước khác và thay đổi này cần thiết để tạo môi trường kinh doanh đáng tin cậy.
Liệu hiểu điều đó, nhưng cũng nghĩ ngay đến những người mới bắt đầu. Với họ, self employed vẫn là lựa chọn hợp lý: ít chi phí, ít thủ tục. Tất nhiên, khi luật MTD (Making Tax Digital) có hiệu lực, người làm self employed có thu nhập cao cũng nên cân nhắc chuyển sang Ltd.
Với những ai đã có kế hoạch mở công ty, thì nên làm sớm để tránh mức phí mới. Ngày 01/02/2026 tăng phí thì cùng lắm 31/01/2026 mình đăng ký mở công ty 😀`,
    contentHtml: `<p>Hôm qua, đang chill chill trên tàu DLR về nhà thì Liệu đọc được tin mới từ govuk: "Companies House sẽ tăng phí từ tháng 2/2026."</p>
<p>Phí đăng ký công ty online sắp tăng lên £100. Trước đây chỉ £12, rồi tăng lên £50 vào năm 2024 và giờ lại tăng thêm lần nữa mà còn gấp đôi.</p>
<p>Không chỉ mở công ty tốn hơn, mà giữ công ty cũng chẳng còn rẻ như trước. Phí nộp confirmation statement online sẽ tăng từ £34 lên £50. Trước 2024, phí này chỉ £13 thôi.</p>
<p>Điều thú vị là, phí giải thể công ty online lại giảm, từ £33 xuống còn £13.</p>
<p>Có vẻ họ muốn khuyến khích những ai không thực sự hoạt động thì nên đóng công ty, còn người duy trì thì phải tuân thủ và trả phí cao hơn.</p>
<p>Companies House cho biết việc tăng phí nhằm duy trì hệ thống minh bạch, phát hiện công ty "ảo", xử lý dữ liệu sai và chuẩn bị cho việc xác minh danh tính bắt buộc từ tháng 11/2025.</p>
<p>Theo họ, mức phí ở Anh vẫn thấp hơn nhiều nước khác và thay đổi này cần thiết để tạo môi trường kinh doanh đáng tin cậy.</p>
<p>Liệu hiểu điều đó, nhưng cũng nghĩ ngay đến những người mới bắt đầu. Với họ, self employed vẫn là lựa chọn hợp lý: ít chi phí, ít thủ tục. Tất nhiên, khi luật MTD (Making Tax Digital) có hiệu lực, người làm self employed có thu nhập cao cũng nên cân nhắc chuyển sang Ltd.</p>
<p>Với những ai đã có kế hoạch mở công ty, thì nên làm sớm để tránh mức phí mới. Ngày 01/02/2026 tăng phí thì cùng lắm 31/01/2026 mình đăng ký mở công ty 😀</p>`,
    contentJson: {
      type: 'doc',
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: 'Hôm qua, đang chill chill trên tàu DLR về nhà thì Liệu đọc được tin mới từ govuk: "Companies House sẽ tăng phí từ tháng 2/2026."' }] },
        { type: 'paragraph', content: [{ type: 'text', text: 'Phí đăng ký công ty online sắp tăng lên £100. Trước đây chỉ £12, rồi tăng lên £50 vào năm 2024 và giờ lại tăng thêm lần nữa mà còn gấp đôi.' }] },
        { type: 'paragraph', content: [{ type: 'text', text: 'Không chỉ mở công ty tốn hơn, mà giữ công ty cũng chẳng còn rẻ như trước. Phí nộp confirmation statement online sẽ tăng từ £34 lên £50. Trước 2024, phí này chỉ £13 thôi.' }] },
        { type: 'paragraph', content: [{ type: 'text', text: 'Điều thú vị là, phí giải thể công ty online lại giảm, từ £33 xuống còn £13.' }] },
        { type: 'paragraph', content: [{ type: 'text', text: 'Có vẻ họ muốn khuyến khích những ai không thực sự hoạt động thì nên đóng công ty, còn người duy trì thì phải tuân thủ và trả phí cao hơn.' }] },
        { type: 'paragraph', content: [{ type: 'text', text: 'Companies House cho biết việc tăng phí nhằm duy trì hệ thống minh bạch, phát hiện công ty "ảo", xử lý dữ liệu sai và chuẩn bị cho việc xác minh danh tính bắt buộc từ tháng 11/2025.' }] },
        { type: 'paragraph', content: [{ type: 'text', text: 'Theo họ, mức phí ở Anh vẫn thấp hơn nhiều nước khác và thay đổi này cần thiết để tạo môi trường kinh doanh đáng tin cậy.' }] },
        { type: 'paragraph', content: [{ type: 'text', text: 'Liệu hiểu điều đó, nhưng cũng nghĩ ngay đến những người mới bắt đầu. Với họ, self employed vẫn là lựa chọn hợp lý: ít chi phí, ít thủ tục. Tất nhiên, khi luật MTD (Making Tax Digital) có hiệu lực, người làm self employed có thu nhập cao cũng nên cân nhắc chuyển sang Ltd.' }] },
        { type: 'paragraph', content: [{ type: 'text', text: 'Với những ai đã có kế hoạch mở công ty, thì nên làm sớm để tránh mức phí mới. Ngày 01/02/2026 tăng phí thì cùng lắm 31/01/2026 mình đăng ký mở công ty 😀' }] }
      ]
    }
  }
];

async function main() {
  console.log('Updating all posts with complete content fields...\n');

  for (const post of posts) {
    try {
      await prisma.blogPost.updateMany({
        where: {
          slug: post.slug,
          locale: 'vi',
        },
        data: {
          content: post.content,
          contentHtml: post.contentHtml,
          contentJson: post.contentJson as any,
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
