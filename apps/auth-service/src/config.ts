import { t } from 'elysia'

export const config = {
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days in seconds
    expiresThreshold: 60 * 60 * 24, // 1 day in seconds
  },
  cookie: t.Cookie({
    'auth.token': t.Optional(t.String()),
    'auth.state': t.Optional(t.String()),
    'auth.code': t.Optional(t.String()),
    'auth.redirect': t.Optional(t.String()),
  }),
}
