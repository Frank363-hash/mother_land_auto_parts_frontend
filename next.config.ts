import type { NextConfig } from 'next';

const backendApiUrl = (
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:5000/api/v1'
).replace(/\/$/, '');

const nextConfig: NextConfig = {
  async rewrites() {
    return [{
      source: '/api/v1/:path*',
      destination: `${backendApiUrl}/:path*`,
    }];
  },
};

export default nextConfig;
