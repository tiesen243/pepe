import Elysia, { status } from 'elysia'

import { config } from '@/config'
import { validateSessionToken } from '@/lib/session'

export const getSession = new Elysia({
  name: 'get-session',
}).get(
  '/get-session',
  async ({ cookie }) => {
    const token = cookie['auth.token'].value ?? ''
    const session = await validateSessionToken(token)
    return status('OK', session)
  },
  { cookie: config.cookie },
)
