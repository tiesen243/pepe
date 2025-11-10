import { defineConfig } from 'drizzle-kit'

import { env } from '@pepe/validators/env'

export default defineConfig({
  dialect: 'postgresql',
  dbCredentials: {
    host: env.POST_POSTGRES_HOST,
    port: env.POST_POSTGRES_PORT,
    user: env.POST_POSTGRES_USER,
    password: env.POST_POSTGRES_PASSWORD,
    database: env.POST_POSTGRES_DATABASE,
  },
  schema: './src/lib/db/schema.ts',
  casing: 'snake_case',
  strict: true,
})
