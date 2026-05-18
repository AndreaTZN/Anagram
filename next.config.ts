import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['next-sanity'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
