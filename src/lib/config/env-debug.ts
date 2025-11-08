// Utility to debug environment variables in production
export function debugR2Config() {
  const config = {
    accountId: process.env.R2_ACCOUNT_ID ? 'SET' : 'MISSING',
    accessKey: process.env.R2_ACCESS_KEY_ID ? 'SET' : 'MISSING',
    secretKey: process.env.R2_SECRET_ACCESS_KEY ? 'SET' : 'MISSING',
    bucketName: process.env.R2_BUCKET_NAME ? 'SET' : 'MISSING',
    publicUrl: process.env.R2_PUBLIC_URL || 'NOT SET',
    endpoint: process.env.R2_ENDPOINT || 'NOT SET',
    region: process.env.R2_REGION || 'auto (default)',
    isConfigured: Boolean(
      process.env.R2_ACCOUNT_ID &&
      process.env.R2_ACCESS_KEY_ID &&
      process.env.R2_SECRET_ACCESS_KEY &&
      process.env.R2_BUCKET_NAME
    )
  }

  console.log('R2 Configuration Debug:', config)
  return config
}