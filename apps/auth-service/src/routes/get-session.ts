import Elysia, { status, t } from 'elysia'

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
  { cookie: t.Cookie({ 'auth.token': t.Optional(t.String()) }) },
)
