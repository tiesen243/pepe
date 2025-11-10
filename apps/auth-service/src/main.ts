import { cors } from '@elysiajs/cors'
import { Elysia } from 'elysia'

import { db } from '@/lib/db'

const server = new Elysia({
  name: 'Auth Service',
  prefix: '/api/auth',
  aot: true,
})
  .use(cors())
  .get('/health', async () => {
    let dbConnected = 'connected'
    try {
      await db.execute('SELECT 1')
    } catch {
      dbConnected = 'disconnected'
    }

    return {
      status: 'Auth Service is running',
      database: dbConnected,
      uptime: process.uptime(),
    }
  })

// eslint-disable-next-line no-restricted-properties
server.listen(process.env.TURBO_MFE_PORT ?? 3001, () => {
  console.log('Auth Service running on http://localhost:3001')
})
