import Elysia, { status } from 'elysia'

import { config } from '@/config'
import { invalidateSession, validateSessionToken } from '@/lib/session'

export const signOut = new Elysia({
  name: 'sign-out',
}).post(
  '/sign-out',
  async ({ cookie }) => {
    const token = cookie['auth.token'].value ?? ''
    const session = await validateSessionToken(token)
    if (!session.user)
      return status('Unauthorized', { message: 'Not signed in' })

    await invalidateSession(token)
    cookie['auth.token'].remove()

    return status('OK', { message: 'Sign-out successful' })
  },
  { cookie: config.cookie },
)
