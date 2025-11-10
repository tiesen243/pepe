import '@mizuki/validators/env'

import type { NextConfig } from 'next'

const nextConfig = {
  typedRoutes: true,
  reactStrictMode: true,
  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: true },
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },

  transpilePackages: ['@mizuki/trpc', '@mizuki/ui', '@mizuki/validators'],
} satisfies NextConfig

export default nextConfig
