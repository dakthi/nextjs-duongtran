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

async function uploadImage(localPath, r2Key) {
  const fileBuffer = fs.readFileSync(localPath);
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: r2Key,
    Body: fileBuffer,
    ContentType: 'image/jpeg',
  });

  await s3Client.send(command);
  const url = `${process.env.R2_PUBLIC_URL}/${r2Key}`;
  console.log(`✅ Uploaded: ${r2Key}`);
  console.log(`   URL: ${url}`);
  return url;
}

(async () => {
  try {
    console.log('Uploading legacy images to R2...\n');
    await uploadImage('public/img/duong-tran-hero.jpg', 'legacy/duong-tran-hero.jpg');
    await uploadImage('public/img/duong-tran-about.jpg', 'legacy/duong-tran-about.jpg');
    console.log('\n✨ All images uploaded successfully!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
})();
