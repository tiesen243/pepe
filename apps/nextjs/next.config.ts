import '@mizuki/validators/env'

import type { NextConfig } from 'next'

const nextConfig = {
  typedRoutes: true,
  reactStrictMode: true,
  typescript: { ignoreBuildErrors: true },

  transpilePackages: [
    '@mizuki/api',
    '@mizuki/auth',
    '@mizuki/db',
    '@mizuki/ui',
    '@mizuki/validators',
  ],
} satisfies NextConfig

export default nextConfig
