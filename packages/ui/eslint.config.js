import { defineConfig } from 'eslint/config'

import baseConfig from '@mizuki/eslint-config/base'
import reactConfig from '@mizuki/eslint-config/react'

export default defineConfig(
  {
    ignores: ['dist/**'],
  },
  ...baseConfig,
  ...reactConfig,
)
