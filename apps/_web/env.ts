import { createEnv } from '@mizuki/validators/env'

export const env = createEnv({
  server: {},

  clientPrefix: 'NEXT_PUBLIC_',
  client: {},

  runtimeEnv: process.env,

  skipValidation: true,
})
