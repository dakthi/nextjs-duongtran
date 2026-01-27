const remotePatterns = [
  {
    protocol: 'https',
    hostname: 'pub-cf120b0c88184c87975e3da39b1fd856.r2.dev',
    pathname: '/**',
  }
]

if (process.env.R2_PUBLIC_URL) {
  try {
    const url = new URL(process.env.R2_PUBLIC_URL)
    remotePatterns.push({
      protocol: url.protocol.replace(':', ''),
      hostname: url.hostname,
      pathname: '/**',
    })
  } catch (error) {
    console.warn('Invalid R2_PUBLIC_URL provided in environment variables.')
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  images: {
    remotePatterns,
  },
  // Explicitly define environment variables for production
  env: {
    R2_ACCOUNT_ID: process.env.R2_ACCOUNT_ID,
    R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
    R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY,
    R2_BUCKET_NAME: process.env.R2_BUCKET_NAME,
    R2_PUBLIC_URL: process.env.R2_PUBLIC_URL,
    R2_ENDPOINT: process.env.R2_ENDPOINT,
    R2_REGION: process.env.R2_REGION,
  },
}

module.exports = nextConfig
  
