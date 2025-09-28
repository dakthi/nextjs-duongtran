const remotePatterns = []

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
}

module.exports = nextConfig
  
