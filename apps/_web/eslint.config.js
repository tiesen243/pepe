import { defineConfig } from 'eslint/config'

import baseConfig, { restrictEnvAccess } from '@pepe/eslint-config/base'
import nextConfig from '@pepe/eslint-config/next'
import reactConfig from '@pepe/eslint-config/react'

export default defineConfig(
  {
    ignores: ['.next/**', 'next-env.d.ts'],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextConfig,
  ...restrictEnvAccess,
)
