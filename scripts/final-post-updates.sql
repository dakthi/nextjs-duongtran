-- Update remaining posts with content and contentJson

-- Post 4: no-thue-khong-tra (already has good contentHtml from earlier)
UPDATE blog_posts SET
content = (SELECT "contentHtml" FROM blog_posts WHERE slug = 'no-thue-khong-tra-hmrc-co-the-rut-tien-truc-tiep-tu-tai-khoan-ke-ca-isa' AND locale = 'vi'),
"contentJson" = '{
  "type": "doc",
  "content": [
    {"type": "paragraph", "content": [{"type": "text", "text": "Phần lớn người dân Anh đều nộp thuế đúng hạn, nhưng vẫn có một nhóm nhỏ có khả năng trả mà cố tình không trả."}]},
    {"type": "paragraph", "content": [{"type": "text", "marks": [{"type": "italic"}], "text": "\"Nếu nhắc nhiều mà vẫn không trả, thì mình tự lấy thôi.\""}]},
    {"type": "paragraph", "content": [{"type": "text", "text": "Và thế là chính sách Direct Recovery of Debts (DRD) ra đời, cho phép HMRC yêu cầu ngân hàng rút tiền trực tiếp từ tài khoản của người nợ, bao gồm cả tài khoản tiết kiệm cá nhân ISA."}]},
    {"type": "heading", "attrs": {"level": 3}, "content": [{"type": "text", "text": "💕 Ai bị lọt vào tầm ngắm?"}]},
    {"type": "paragraph", "content": [{"type": "text", "text": "HMRC không vơ đũa cả nắm. Chính sách này chỉ áp dụng khi người nợ:"}]},
    {"type": "bulletList", "content": [
      {"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Nợ thuế từ £1,000 trở lên"}]}]},
      {"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Đã hết thời hạn kháng cáo"}]}]},
      {"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Phớt lờ nhiều lần nhắc nhở của HMRC"}]}]},
      {"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Có đủ tiền trong tài khoản để trả, kể cả ISA"}]}]},
      {"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Không thuộc nhóm dễ bị tổn thương (ví dụ: người bệnh, người có hoàn cảnh đặc biệt)"}]}]}
    ]},
    {"type": "heading", "attrs": {"level": 3}, "content": [{"type": "text", "text": "💕 Quy trình không \"cướp như phim\""}]},
    {"type": "paragraph", "content": [{"type": "text", "text": "HMRC không thể tự động rút tiền trong im lặng. Trước khi chạm vào tài khoản của ai đó, họ phải trải qua một quy trình chặt chẽ:"}]},
    {"type": "orderedList", "content": [
      {"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Gửi thư, email, gọi điện để nhắc nhở"}]}]},
      {"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Gặp mặt trực tiếp người nợ để xác minh danh tính, giải thích khoản nợ và đề nghị kế hoạch trả góp (Time to Pay)"}]}]},
      {"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Đánh giá khả năng chi trả và hoàn cảnh cá nhân. Nếu người nợ thuộc nhóm dễ tổn thương, DRD sẽ không được áp dụng"}]}]},
      {"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Nếu người nợ vẫn không trả dù có khả năng, HMRC mới yêu cầu ngân hàng chuyển tiền trực tiếp, kể cả từ ISA"}]}]}
    ]},
    {"type": "paragraph", "content": [{"type": "text", "text": "Ngay cả khi đó, họ vẫn để lại ít nhất £5,000 trong tài khoản để người nợ có thể chi trả sinh hoạt phí."}]},
    {"type": "paragraph", "content": [{"type": "text", "text": "Người nợ có 30 ngày để phản đối, trong thời gian đó tiền chỉ bị tạm giữ, chưa bị rút. Nếu không đồng ý, có thể kháng cáo lên tòa dân sự (County Court)."}]},
    {"type": "heading", "attrs": {"level": 3}, "content": [{"type": "text", "text": "💕 Thực tế: HMRC có thực sự làm vậy không?"}]},
    {"type": "paragraph", "content": [{"type": "text", "text": "Chính sách DRD được giới thiệu từ 2015, nhưng trong hai năm đầu chỉ được dùng 19 lần trên toàn nước Anh. Khi đại dịch COVID-19 xảy ra, chính sách này còn bị tạm dừng hoàn toàn để tránh gây thêm áp lực tài chính."}]},
    {"type": "paragraph", "content": [{"type": "text", "text": "Đến mùa xuân 2025, HMRC mới khởi động lại DRD theo Spring Statement 2025, trong giai đoạn \"test and learn\" tức là thử nghiệm, đánh giá và điều chỉnh dần."}]},
    {"type": "paragraph", "content": [{"type": "text", "text": "Nghe thì có vẻ đáng sợ, nhưng thực tế HMRC rất hiếm khi rút tiền trực tiếp. Và suốt gần 10 năm kể từ khi ra đời, Direct Recovery of Debts mới chỉ được áp dụng 19 lần."}]}
  ]
}'::jsonb,
"updatedAt" = NOW()
WHERE slug = 'no-thue-khong-tra-hmrc-co-the-rut-tien-truc-tiep-tu-tai-khoan-ke-ca-isa' AND locale = 'vi';
