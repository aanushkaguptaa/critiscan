/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // Ensure app directory is enabled
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
