// Build time configuration helper
export const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL;

export const isDatabaseAvailable = (): boolean => {
  // During build time on CI/CD without DATABASE_URL, return false
  if (isBuildTime) {
    return false;
  }

  // In development or when DATABASE_URL is available, return true
  return !!process.env.DATABASE_URL;
};