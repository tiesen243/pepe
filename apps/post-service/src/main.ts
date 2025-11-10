import { cors } from '@elysiajs/cors'
import { Elysia, status } from 'elysia'

import { fetchRequestHandler } from '@pepe/trpc'

import { db } from '@/lib/db'
import { postServiceRouter } from '@/router'
import { createTRPCContent } from '@/trpc'

const server = new Elysia({ prefix: '/api/posts', aot: true })
  .use(cors())
  .get('/health', async () => {
    try {
      await db.execute('SELECT 1')
      return status('OK', {
        status: 'ok',
        details: {
          service: 'Post Service is running',
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
  .all('/*', async ({ request }) => {
    let response: Response
    if (request.method === 'OPTIONS')
      response = new Response(null, { status: 204 })
    else
      response = await fetchRequestHandler({
        endpoint: '/api/posts',
        req: request,
        router: postServiceRouter,
        createContext: () => createTRPCContent(request),
      })

    return response
  })

  .compile()

// eslint-disable-next-line no-restricted-properties
server.listen(process.env.TURBO_MFE_PORT ?? 3002, (server) => {
  console.log(`Post Service is running at ${server.url}`)
})

export type AuthService = typeof server
