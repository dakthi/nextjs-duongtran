-- Update: Không muốn tốn phí ngân hàng
UPDATE blog_posts SET
"contentHtml" = '<p>Liệu hiểu là nhiều người không thích trả phí ngân hàng. Nào là phí chuyển khoản, phí nộp tiền mặt, rồi mấy khoản "phí dịch vụ" nhỏ nhỏ mà cộng lại cũng tốn kha khá. Thế nên, khi nghe đến việc phải mở business bank, ai cũng ngần ngại.</p>

<p>Thật ra, không phải lúc nào cũng bắt buộc, nhưng nên có. Vì HMRC rất quan tâm đến chuyện tiền cá nhân và tiền kinh doanh có bị trộn lẫn hay không.</p>

<p>Nếu bạn là <strong>sole trader</strong>, bạn hoàn toàn có thể dùng tài khoản cá nhân để nhận và chi tiền công việc, miễn là mọi thứ rõ ràng. Nhưng tách riêng vẫn là cách tốt nhất. Dễ làm sổ sách, dễ khai Self Assessment, và khi HMRC kiểm tra cũng không phải giải thích nhiều. Nếu ngại phí, bạn chỉ cần mở một tài khoản cá nhân khác dành riêng cho công việc, không nhất thiết phải là business bank.</p>

<p>Còn nếu bạn có <strong>limited company</strong>, thì lại khác. Bạn phải có business bank. Công ty là một pháp nhân riêng, tiền của công ty không được lẫn với tiền của bạn. Nếu dùng chung, HMRC rất dễ để ý, đặc biệt khi họ kiểm tra thuế hoặc rà soát dòng tiền. Việc đó không chỉ gây rắc rối mà còn ảnh hưởng đến tính minh bạch của công ty.</p>

<p>Giữ riêng mọi thứ ngay từ đầu sẽ giúp bạn làm việc nhẹ đầu hơn. Một business bank, một cách làm gọn gàng, và một cảm giác yên tâm mỗi khi nhìn lại dòng tiền của mình.</p>',
"updatedAt" = NOW()
WHERE slug = 'khong-muon-ton-phi-ngan-hang-co-the-dung-tai-khoan-ca-nhan-cho-business-duoc-khong' AND locale = 'vi';

-- Update: Nợ thuế không trả
UPDATE blog_posts SET
"contentHtml" = '<p>Phần lớn người dân Anh đều nộp thuế đúng hạn, nhưng vẫn có một nhóm nhỏ có khả năng trả mà cố tình không trả.</p>

<p><em>"Nếu nhắc nhiều mà vẫn không trả, thì mình tự lấy thôi."</em></p>

<p>Và thế là chính sách Direct Recovery of Debts (DRD) ra đời, cho phép HMRC yêu cầu ngân hàng rút tiền trực tiếp từ tài khoản của người nợ, bao gồm cả tài khoản tiết kiệm cá nhân ISA.</p>

<h3>💕 Ai bị lọt vào tầm ngắm?</h3>

<p>HMRC không vơ đũa cả nắm. Chính sách này chỉ áp dụng khi người nợ:</p>

<ul>
<li>Nợ thuế từ £1,000 trở lên</li>
<li>Đã hết thời hạn kháng cáo</li>
<li>Phớt lờ nhiều lần nhắc nhở của HMRC</li>
<li>Có đủ tiền trong tài khoản để trả, kể cả ISA</li>
<li>Không thuộc nhóm dễ bị tổn thương (ví dụ: người bệnh, người có hoàn cảnh đặc biệt)</li>
</ul>

<h3>💕 Quy trình không "cướp như phim"</h3>

<p>HMRC không thể tự động rút tiền trong im lặng. Trước khi chạm vào tài khoản của ai đó, họ phải trải qua một quy trình chặt chẽ:</p>

<ol>
<li>Gửi thư, email, gọi điện để nhắc nhở</li>
<li>Gặp mặt trực tiếp người nợ để xác minh danh tính, giải thích khoản nợ và đề nghị kế hoạch trả góp (Time to Pay)</li>
<li>Đánh giá khả năng chi trả và hoàn cảnh cá nhân. Nếu người nợ thuộc nhóm dễ tổn thương, DRD sẽ không được áp dụng</li>
<li>Nếu người nợ vẫn không trả dù có khả năng, HMRC mới yêu cầu ngân hàng chuyển tiền trực tiếp, kể cả từ ISA</li>
</ol>

<p>Ngay cả khi đó, họ vẫn để lại ít nhất £5,000 trong tài khoản để người nợ có thể chi trả sinh hoạt phí.</p>

<p>Người nợ có 30 ngày để phản đối, trong thời gian đó tiền chỉ bị tạm giữ, chưa bị rút. Nếu không đồng ý, có thể kháng cáo lên tòa dân sự (County Court).</p>

<h3>💕 Thực tế: HMRC có thực sự làm vậy không?</h3>

<p>Chính sách DRD được giới thiệu từ 2015, nhưng trong hai năm đầu chỉ được dùng 19 lần trên toàn nước Anh. Khi đại dịch COVID-19 xảy ra, chính sách này còn bị tạm dừng hoàn toàn để tránh gây thêm áp lực tài chính.</p>

<p>Đến mùa xuân 2025, HMRC mới khởi động lại DRD theo Spring Statement 2025, trong giai đoạn "test and learn" tức là thử nghiệm, đánh giá và điều chỉnh dần.</p>

<p>Nghe thì có vẻ đáng sợ, nhưng thực tế HMRC rất hiếm khi rút tiền trực tiếp. Và suốt gần 10 năm kể từ khi ra đời, Direct Recovery of Debts mới chỉ được áp dụng 19 lần.</p>',
"updatedAt" = NOW()
WHERE slug = 'no-thue-khong-tra-hmrc-co-the-rut-tien-truc-tiep-tu-tai-khoan-ke-ca-isa' AND locale = 'vi';
