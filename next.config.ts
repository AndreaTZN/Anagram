import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['next-sanity'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  allowedDevOrigins: ['*.trycloudflare.com'],

  async redirects() {
    return [
      // permanent: true → 308, false → 307 (both preserve the HTTP method)
    ]
  },
}

export default nextConfig
