const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
require('dotenv').config();

const s3Client = new S3Client({
  region: process.env.R2_REGION || 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

async function uploadImage(localPath, r2Key, contentType) {
  const fileBuffer = fs.readFileSync(localPath);
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: r2Key,
    Body: fileBuffer,
    ContentType: contentType,
  });

  await s3Client.send(command);
  const url = `${process.env.R2_PUBLIC_URL}/${r2Key}`;
  console.log(`✅ Uploaded: ${r2Key}`);
  console.log(`   URL: ${url}`);
  return url;
}

(async () => {
  try {
    console.log('Uploading hero award image to R2...\n');
    const url = await uploadImage(
      '/Users/dakthi/Downloads/anh-bai-7-3-du-hoc-vh-read-only-17175558634081652005218.webp',
      'legacy/duong-tran-award-hero.webp',
      'image/webp'
    );
    console.log('\n✨ Image uploaded successfully!');
    console.log('\nYou can now use this URL in your hero content:');
    console.log(url);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
})();
