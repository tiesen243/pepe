import type { Session } from '@pepe/auth-service'
import type { TRPCContext } from '@pepe/trpc'
import { auth } from '@pepe/auth-service'
import { publicProcedure, TRPCError } from '@pepe/trpc'

import { db } from '@/lib/db'

export const protectedProcedure = publicProcedure.use(async ({ ctx, next }) => {
  if (!ctx.session.user) throw new TRPCError({ code: 'UNAUTHORIZED' })
  return next({
    ctx: {
      ...ctx,
      session: { ...ctx.session, user: ctx.session.user },
    },
  })
})

export const createTRPCContent = async (
  request: Request,
): Promise<TRPCContext> => {
  const headers = Object.fromEntries(request.headers)

  const { data } = await auth['get-session'].get({ headers })

  console.log(
    '[tRPC] >>> Request from',
    request.headers.get('x-trpc-source') ?? 'unknown',
    'by',
    data?.user?.username ?? 'guest',
  )

  return {
    headers: request.headers,
    db,
    session: data ?? { user: null, expires: new Date(0) },
  }
}

declare module '@pepe/trpc' {
  interface TRPCContext {
    db: typeof db
    session: Session
  }
}
