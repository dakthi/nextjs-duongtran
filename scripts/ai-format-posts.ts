import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// List of posts to process with their manually formatted HTML
const postsToUpdate = [
  {
    slug: '30-days-tax-tips-day-5',
    contentHtml: `<h2>Một trong những lý do bạn đóng nhiều thuế hơn người ta khi đều có thu nhập cho thuê nhà</h2>

<p>Liệu luôn nhấn mạnh: biết luật để không mất tiền oan. Nhiều người có thêm thu nhập từ cho thuê phòng nhưng lại không hề biết HMRC cho miễn tới £7,500/năm. Thế là vẫn đều đặn khai báo, vẫn đều đặn nộp thuế, trong khi đáng ra toàn bộ số tiền đó được giữ lại hợp pháp.</p>

<p>Không cần thủ tục phức tạp, không cần thành lập công ty. Chỉ cần tận dụng đúng chính sách Rent-a-room scheme, bạn đã có thêm một khoản tiền bỏ túi hợp pháp và nhẹ nhàng.</p>

<h3>💕 Điều kiện áp dụng</h3>

<ul>
<li>Cho thuê phòng trong nhà bạn đang ở. Nhà này không nhất thiết phải do bạn sở hữu.</li>
<li>Phòng phải có nội thất (furnished)</li>
<li>Không áp dụng cho việc cho thuê nguyên căn, nhà nghỉ holiday let, hay buy-to-let</li>
</ul>

<h3>💕 Cách hoạt động</h3>

<p><strong>Nếu tiền thuê phòng ≤ £7,500/năm</strong> → khỏi cần đóng thuế, không phải khai Self Assessment.</p>

<p><strong>Nếu tiền thuê phòng > £7,500/năm</strong> → bạn có 2 lựa chọn:</p>

<ol>
<li><strong>Dùng scheme:</strong> chỉ đóng thuế trên phần vượt quá £7,500. Ví dụ: cho thuê £10,000/năm → chỉ phải nộp thuế trên £2,500.</li>
<li><strong>Bỏ scheme:</strong> không dùng miễn thuế £7,500 mà tính theo chi phí thực tế (điện, nước, sửa chữa…). Cách này có lợi khi chi phí thực tế cao hơn £7,500.</li>
</ol>

<p><em>Ví dụ: cho thuê £10,000/năm, chi phí thực tế £8,000 → chỉ phải nộp thuế trên £2,000.</em></p>

<p>Khoản miễn thuế là tối đa £7,500/năm (nếu hai vợ chồng cùng sở hữu nhà thì mỗi người hưởng một nửa: £3,750).</p>`
  }
];

async function main() {
  console.log('Updating posts with AI-formatted HTML...\n');

  for (const postUpdate of postsToUpdate) {
    try {
      const result = await prisma.blogPost.updateMany({
        where: {
          slug: postUpdate.slug,
          locale: 'vi',
        },
        data: {
          contentHtml: postUpdate.contentHtml,
        },
      });

      if (result.count > 0) {
        console.log(`✅ Updated: ${postUpdate.slug}`);
      } else {
        console.log(`⚠️  Not found: ${postUpdate.slug}`);
      }
    } catch (error) {
      console.error(`❌ Error updating ${postUpdate.slug}:`, error);
    }
  }

  console.log('\n✨ Update complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
