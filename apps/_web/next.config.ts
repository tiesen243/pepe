import '@pepe/validators/env'

import type { NextConfig } from 'next'

const nextConfig = {
  typedRoutes: true,
  reactStrictMode: true,
  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: true },
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },

  transpilePackages: ['@pepe/trpc', '@pepe/ui', '@pepe/validators'],
} satisfies NextConfig

export default nextConfig
