import { defineConfig } from 'eslint/config'

import baseConfig, { restrictEnvAccess } from '@pepe/eslint-config/base'

export default defineConfig(
  {
    ignores: ['dist/**'],
  },
  ...baseConfig,
  ...restrictEnvAccess,
)
