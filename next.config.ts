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

      // Legacy site (anagram.club/sitemap.xml) served /projects/* — the rebuild
      // renamed the section to /works/*. Slugs are unchanged, so a wildcard
      // covers every case page in the old sitemap.
      { source: '/projects', destination: '/works', permanent: true },
      { source: '/projects/gigi', destination: '/works', permanent: true }, // no case page in the rebuild
      { source: '/projects/:slug', destination: '/works/:slug', permanent: true },

      // Archives is now a tab inside /works, not its own route.
      { source: '/archives', destination: '/works', permanent: true },

      // Agency pages briefly lived at /index/* (and in the sitemap). Vercel serves
      // the home page on /index because Next uses "/index" internally for "/",
      // so the section went back to /page/*.
      { source: '/index', destination: '/page', permanent: true },
      { source: '/index/:slug', destination: '/page/:slug', permanent: true },
    ]
  },
}

export default nextConfig
