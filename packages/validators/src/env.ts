import * as z from 'zod/v4-mini'

import { createEnv } from '@/lib/create-env'

export const env = createEnv({
  server: {
    NODE_ENV: z._default(
      z.enum(['development', 'production', 'test']),
      'development',
    ),

    AUTH_POSTGRES_HOST: z.string(),
    AUTH_POSTGRES_PORT: z.coerce.number(),
    AUTH_POSTGRES_USER: z.string(),
    AUTH_POSTGRES_PASSWORD: z.string(),
    AUTH_POSTGRES_DATABASE: z.string(),

    POST_POSTGRES_HOST: z.string(),
    POST_POSTGRES_PORT: z.coerce.number(),
    POST_POSTGRES_USER: z.string(),
    POST_POSTGRES_PASSWORD: z.string(),
    POST_POSTGRES_DATABASE: z.string(),

    // Vercel environment variables
    VERCEL: z.optional(z.string()),
    VERCEL_ENV: z.optional(z.enum(['production', 'preview', 'development'])),
    VERCEL_URL: z.optional(z.string()),
    VERCEL_PROJECT_PRODUCTION_URL: z.optional(z.string()),
  },

  clientPrefix: 'PUBLIC_',
  client: {},

  runtimeEnv: process.env,

  skipValidation:
    !!process.env.SKIP_ENV_VALIDATION ||
    !!process.env.CI ||
    process.env.npm_lifecycle_event === 'lint',
})

export { createEnv }
