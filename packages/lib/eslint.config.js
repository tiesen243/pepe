import { defineConfig } from 'eslint/config'

import baseConfig from '@pepe/eslint-config/base'

export default defineConfig(
  {
    ignores: ['dist/**'],
  },
  ...baseConfig,
)
