import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Trailing slash configuration (migrated from Gatsby)
  trailingSlash: true,
  
  // Output configuration
  output: 'standalone',

  // Enable support for `"use cache"` directives (tagged cache + revalidateTag).
  cacheComponents: true,
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
