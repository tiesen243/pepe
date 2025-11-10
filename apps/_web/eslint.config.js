import { defineConfig } from 'eslint/config'

import baseConfig, { restrictEnvAccess } from '@mizuki/eslint-config/base'
import nextConfig from '@mizuki/eslint-config/next'
import reactConfig from '@mizuki/eslint-config/react'

export default defineConfig(
  {
    ignores: ['.next/**', 'next-env.d.ts'],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextConfig,
  ...restrictEnvAccess,
)
