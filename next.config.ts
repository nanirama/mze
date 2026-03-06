import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Trailing slash configuration (migrated from Gatsby)
  trailingSlash: true,
  
  // Output configuration
  output: 'standalone',
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
