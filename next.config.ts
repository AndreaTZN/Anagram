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

      // No dedicated contact page in the rebuild — contact info lives on /about.
      { source: '/contact', destination: '/about', permanent: true },
    ]
  },
}

export default nextConfig
