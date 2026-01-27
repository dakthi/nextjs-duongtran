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
    console.log('Uploading additional images to R2...\n');

    // Upload testimonial images
    await uploadImage('public/img/testimonials/duc-nguyen.jpeg', 'legacy/testimonials/duc-nguyen.jpeg', 'image/jpeg');
    await uploadImage('public/img/testimonials/james-price.jpeg', 'legacy/testimonials/james-price.jpeg', 'image/jpeg');

    console.log('\n✨ All images uploaded successfully!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
})();
