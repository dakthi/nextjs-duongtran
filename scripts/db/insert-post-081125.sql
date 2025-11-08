-- Blog Post Insert: Đang yên đang lành, bỗng nhận 6 cái thẻ tín dụng
-- ============================================================================
-- IMPORTANT: Before running this SQL, upload the image to R2 first!
-- ============================================================================
--
-- STEP 1: Upload image to R2
-- Command format:
-- AWS_ACCESS_KEY_ID="[YOUR_KEY]" AWS_SECRET_ACCESS_KEY="[YOUR_SECRET]" \
-- aws s3 cp /path/to/image.png s3://bucket-lieuvo/blog/[unique-name].png \
-- --endpoint-url https://[ACCOUNT_ID].r2.cloudflarestorage.com/ \
-- --content-type image/png
--
-- For this post, the command used was:
-- AWS_ACCESS_KEY_ID="1b6772892999957d50aede7703a8627e" AWS_SECRET_ACCESS_KEY="52279ce0e5fa54e88a5f73bb82365d0d1351316f3e9f2deb3b445db812202037" \
-- aws s3 cp posts/081125/image.png s3://bucket-lieuvo/blog/081125-credit-cards.png \
-- --endpoint-url https://f47d23c072e7b2f871ecca11e36e0b25.r2.cloudflarestorage.com/ \
-- --content-type image/png
--
-- STEP 2: Verify the image is accessible at the public URL:
-- https://cdnlieuvo.chartedconsultants.com/blog/081125-credit-cards.png
--
-- STEP 3: Run this SQL file
-- ============================================================================

INSERT INTO blog_posts (
  id,
  slug,
  title,
  excerpt,
  content,
  locale,
  category,
  "readingTime",
  "publishedDate",
  "isFeatured",
  "isPublished",
  image,
  "createdAt",
  "updatedAt"
) VALUES (
  'cma51lenbe2njnqg',
  'dang-yen-dang-lanh-bong-nhan-6-cai-the-tin-dung',
  'Đang yên đang lành, bỗng nhận 6 cái thẻ tín dụng',
  'Chuyện là một cặp vợ chồng ở UK tự nhiên nhận được 6 cái thẻ credit card mới từ ngân hàng NatWest. Không báo trước, không giải thích.',
  'Chuyện là một cặp vợ chồng ở UK tự nhiên nhận được 6 cái thẻ credit card mới từ ngân hàng NatWest. Không báo trước, không giải thích. Gửi 3 lần, mỗi lần 2 cái.

Hai người hoang mang cấp độ 8, đăng lên Reddit xem có ai giống mình không.

Một số người thì "nhân danh t làm ở bank đây, m chụp t mặt sau thẻ t check cho" để lợi dụng cơ hội.

Còn lại đa số comment đều có ý tốt, bảo khả năng cao là bị ai đó cố tình hack nên phải gọi ngay cho ngân hàng để xác nhận.

Chị vợ liền gọi lên. Nhân viên ngân hàng nghe xong cũng ngạc nhiên:

"6 cái thẻ lận hả? Tất cả đều giống nhau luôn à? Nghe hơi khả nghi đó chị. Cảm ơn chị đã gọi. Để em kiểm tra tài khoản của mình nhé…

…Ờm.

…Ờ… dạ… đúng rồi. Cái đó là bên em gửi thật.

Hệ thống bị lỗi. Bên em lỡ gửi chị 6 cái thẻ. Em xin lỗi chị nhiều nha!

Bây giờ chị chỉ cần chọn cái nào chị thích nhất rồi hủy mấy cái còn lại đi ha!"

Chị vợ nghe câu "just pick your favourite one" thì cười phớ lớ.

Bên dưới mọi người để lại bình luận:
- Nếu cái nào cũng giống nhau thì làm sao chọn được cái yêu thích nhất?
- 6 cái thì mỗi ngày dùng một cái, ngày thứ 7 nghỉ ngơi
- Chắc nhân viên ngân hàng chạy KPI, làm càng nhiều thẻ càng tốt

Liệu thì nghĩ tới cảnh nếu 6 cái thẻ này mà trong nhà mỗi người cầm một cái đi tiêu… thì đúng nghĩa nợ như chúa chổm :))',
  'vi',
  'Câu chuyện thường ngày',
  3,
  '2025-01-08',
  false,
  true,
  'https://cdnlieuvo.chartedconsultants.com/blog/081125-credit-cards.png',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

-- ============================================================================
-- TO RUN THIS FILE:
-- ============================================================================
-- psql "postgresql://lieuvo_user:kNiN4321@localhost:5555/lieuvo_cms_local" -f insert-post-081125.sql
-- ============================================================================
