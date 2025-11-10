import { defineConfig } from 'drizzle-kit'

import { env } from '@pepe/validators/env'

export default defineConfig({
  dialect: 'postgresql',
  dbCredentials: {
    host: env.AUTH_POSTGRES_HOST,
    port: env.AUTH_POSTGRES_PORT,
    user: env.AUTH_POSTGRES_USER,
    password: env.AUTH_POSTGRES_PASSWORD,
    database: env.AUTH_POSTGRES_DATABASE,
  },
  schema: './src/lib/db/schema.ts',
  casing: 'snake_case',
  strict: true,
})
