/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  assetPrefix: '/',
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/index',
      }
    ];
  }
};

export default nextConfig;
