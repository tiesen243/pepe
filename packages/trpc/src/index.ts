import { initTRPC } from '@trpc/server'
import SuperJSON from 'superjson'

interface TRPCMeta {
  message?: string
}

interface TRPCContext {
  headers: Headers
}

const createTRPCContext = async (opts: {
  headers: Headers
}): Promise<TRPCContext> => {
  return Promise.resolve({ headers: opts.headers })
}

const t = initTRPC
  .meta<TRPCMeta>()
  .context<TRPCContext>()
  .create({
    transformer: SuperJSON,
    errorFormatter({ type, path, shape }) {
      if (shape.message !== `No procedure found on path "${path}"`)
        console.error(
          `[tRPC] <<< [${type}] ${path} ${shape.data.httpStatus}: ${shape.message}`,
        )

      if (shape.message.startsWith('Failed query: '))
        shape.message =
          'An error occurred. Please try again later or contact the administrator.'
      return shape
    },
  })

const createCallerFactory = t.createCallerFactory

const createTRPCRouter = t.router

const loggingMiddleware = t.middleware(async ({ next, type, path, meta }) => {
  const start = performance.now()
  const result = await next()
  const end = performance.now()
  console.log(`[tRPC] took ${(end - start).toFixed(2)}ms to execute`)

  if (result.ok) {
    const codeMap = { query: 200, mutation: 201, subscription: 200 } as const
    console.log(
      `[tRPC] <<< [${type}] ${path} ${codeMap[type]}: ${meta?.message ?? 'Success'}`,
    )
  }

  return result
})

const publicProcedure = t.procedure.use(loggingMiddleware)

export { TRPCError } from '@trpc/server'
export { fetchRequestHandler } from '@trpc/server/adapters/fetch'

export type { TRPCMeta, TRPCContext }
export {
  createCallerFactory,
  createTRPCContext,
  createTRPCRouter,
  publicProcedure,
}
