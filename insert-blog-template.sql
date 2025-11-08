-- Blog Post Insert Template
-- ============================================================================
-- Instructions:
-- 1. Replace all values in [BRACKETS] with your content
-- 2. Generate a unique ID using: node -e "console.log(require('crypto').randomBytes(12).toString('hex'))"
--    Or use any CUID generator online
-- 3. Slug should be URL-friendly (lowercase, hyphens, no spaces)
-- 4. Locale: 'en' for English, 'vi' for Vietnamese
-- 5. Reading time: estimate 200-250 words per minute
-- 6. Use proper escaping for quotes: '' (two single quotes) for apostrophes
-- 7. For markdown content, use proper line breaks and formatting
-- 8. **IMPORTANT**: Upload image to R2 BEFORE running this SQL (see below)
-- ============================================================================
-- UPLOADING IMAGES TO R2:
-- ============================================================================
-- For every blog post with an image, you MUST upload the image to R2 first!
--
-- Step 1: Upload image to R2 using AWS CLI:
-- AWS_ACCESS_KEY_ID="[YOUR_R2_ACCESS_KEY]" AWS_SECRET_ACCESS_KEY="[YOUR_R2_SECRET_KEY]" \
-- aws s3 cp /path/to/your/image.png s3://bucket-lieuvo/blog/[unique-name].png \
-- --endpoint-url https://[R2_ACCOUNT_ID].r2.cloudflarestorage.com/ \
-- --content-type image/png
--
-- Example:
-- AWS_ACCESS_KEY_ID="1b6772892999957d50aede7703a8627e" AWS_SECRET_ACCESS_KEY="52279ce0e5fa54e88a5f73bb82365d0d1351316f3e9f2deb3b445db812202037" \
-- aws s3 cp posts/081125/image.png s3://bucket-lieuvo/blog/081125-credit-cards.png \
-- --endpoint-url https://f47d23c072e7b2f871ecca11e36e0b25.r2.cloudflarestorage.com/ \
-- --content-type image/png
--
-- Step 2: Verify the image is accessible via the public URL:
-- https://cdnlieuvo.chartedconsultants.com/blog/[unique-name].png
--
-- Step 3: Use the public URL in the 'image' field below
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
  '[UNIQUE_ID]',                                    -- Example: cm3w9xqr00001l8p4g8k5z2b3
  '[slug-using-hyphens]',                           -- Example: truoc-them-ngan-sach-mua-thu-2025
  '[Your Blog Post Title]',                         -- Example: Trước thềm Ngân sách mùa thu 26/11/2025
  '[Short excerpt - 1-2 sentences summary]',        -- Example: Cứ mỗi lần sắp đến ngày công bố...
  '[Full markdown content here.

Use proper markdown formatting:
- ## for headings
- **bold** for emphasis
- - for bullet points
- Blank lines between paragraphs

Remember to escape quotes with two single quotes '''']',
  '[en or vi]',                                     -- Example: vi
  '[Category name]',                                -- Example: Thuế & Ngân sách, Tax Planning, Business Advice
  [READING_TIME_IN_MINUTES],                        -- Example: 8 (number without quotes)
  '[YYYY-MM-DD]',                                   -- Example: 2025-01-15
  [TRUE or FALSE],                                  -- Is featured? true/false (no quotes)
  [TRUE or FALSE],                                  -- Is published? true/false (no quotes)
  '[IMAGE_URL]',                                    -- Example: https://cdnlieuvo.chartedconsultants.com/blog/081125-credit-cards.png
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

-- ============================================================================
-- EXAMPLE USAGE:
-- ============================================================================
-- INSERT INTO blog_posts (
--   id,
--   slug,
--   title,
--   excerpt,
--   content,
--   locale,
--   category,
--   "readingTime",
--   "publishedDate",
--   "isFeatured",
--   "isPublished",
--   "createdAt",
--   "updatedAt"
-- ) VALUES (
--   'cm3w9xqr00001l8p4g8k5z2b3',
--   'my-first-blog-post',
--   'My First Blog Post',
--   'This is a short excerpt about my blog post.',
--   'This is the full content of my blog post.
--
-- ## First Heading
--
-- Some content here with **bold text**.
--
-- ## Second Heading
--
-- More content:
-- - Point one
-- - Point two
-- - Point three',
--   'en',
--   'Business Advice',
--   5,
--   '2025-01-15',
--   true,
--   true,
--   CURRENT_TIMESTAMP,
--   CURRENT_TIMESTAMP
-- );

-- ============================================================================
-- HELPFUL TIPS:
-- ============================================================================
--
-- 1. Generate unique ID in terminal:
--    node -e "const crypto = require('crypto'); console.log('cm' + crypto.randomBytes(10).toString('base64').replace(/[+/=]/g, '').toLowerCase().slice(0, 24));"
--
-- 2. Create slug from title:
--    - Use lowercase
--    - Replace spaces with hyphens
--    - Remove special characters
--    - Example: "Trước thềm Ngân sách" → "truoc-them-ngan-sach"
--
-- 3. Markdown formatting in content:
--    ## Heading 2
--    ### Heading 3
--    **bold text**
--    *italic text*
--    - bullet point
--    1. numbered list
--    [link text](url)
--
-- 4. Escaping quotes:
--    - Use '' (two single quotes) for apostrophes
--    - Example: 'It''s a great day' → It's a great day
--
-- 5. Common categories:
--    English: 'Tax Planning', 'Business Advice', 'Accounting Tips', 'UK Tax Updates'
--    Vietnamese: 'Thuế & Ngân sách', 'Tư vấn doanh nghiệp', 'Kế toán', 'Cập nhật thuế'
--
-- ============================================================================
-- TO USE THIS TEMPLATE:
-- ============================================================================
-- 1. Copy this file to a new name: insert-my-post.sql
-- 2. Replace all [BRACKETED] values with your content
-- 3. Run: psql "postgresql://lieuvo_user:kNiN4321@localhost:5555/lieuvo_cms_local" -f insert-my-post.sql
-- ============================================================================
