import { defineConfig } from 'eslint/config'

import baseConfig from '@mizuki/eslint-config/base'

export default defineConfig(
  {
    ignores: ['dist/**'],
  },
  ...baseConfig,
)
