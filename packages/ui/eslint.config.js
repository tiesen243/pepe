import { defineConfig } from 'eslint/config'

import baseConfig from '@pepe/eslint-config/base'
import reactConfig from '@pepe/eslint-config/react'

export default defineConfig(
  {
    ignores: ['dist/**'],
  },
  ...baseConfig,
  ...reactConfig,
)
