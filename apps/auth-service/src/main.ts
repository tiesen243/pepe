import { cors } from '@elysiajs/cors'
import { Elysia, status } from 'elysia'

import { db } from '@/lib/db'
import { getSession } from '@/routes/get-session'
import { signIn } from '@/routes/sign-in'
import { signOut } from '@/routes/sign-out'
import { signUp } from '@/routes/sign-up'

const server = new Elysia({ prefix: '/api/auth', aot: true })
  .use(cors())
  .get('/health', async () => {
    try {
      await db.execute('SELECT 1')
      return status('OK', {
        status: 'ok',
        details: {
          service: 'Auth Service is running',
          database: 'connected',
          uptime: process.uptime(),
          timestamp: new Date().toISOString(),
        },
      })
    } catch {
      return status('Service Unavailable', {
        status: 'error',
        details: {
          service: 'Auth Service is running',
          database: 'disconnected',
          uptime: process.uptime(),
          timestamp: new Date().toISOString(),
        },
      })
    }
  })

  .use(getSession)
  .use(signUp)
  .use(signIn)
  .use(signOut)

  .compile()

// eslint-disable-next-line no-restricted-properties
server.listen(process.env.TURBO_MFE_PORT ?? 3001, () => {
  console.log('Auth Service running on http://localhost:3001')
})
