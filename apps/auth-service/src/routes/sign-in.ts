import { and, eq, or } from 'drizzle-orm'
import Elysia, { env, status, t } from 'elysia'

import { config } from '@/config'
import { db } from '@/lib/db'
import { accounts, users } from '@/lib/db/schema'
import { Password } from '@/lib/password'
import { createSession } from '@/lib/session'

export const signIn = new Elysia({
  name: 'sign-in',
}).post(
  '/sign-in',
  async ({ body, cookie }) => {
    const { identifier, password: plainPassword } = body

    const [userWithAccount] = await db
      .select({ id: users.id, password: accounts.password })
      .from(users)
      .where(or(eq(users.email, identifier), eq(users.username, identifier)))
      .innerJoin(
        accounts,
        and(
          eq(accounts.provider, 'credentials'),
          eq(accounts.accountId, users.id),
        ),
      )
      .limit(1)

    if (!userWithAccount?.password)
      return status('Unauthorized', { message: 'Invalid credentials' })

    const isPasswordValid = await new Password().verify(
      userWithAccount.password,
      plainPassword,
    )
    if (!isPasswordValid)
      return status('Unauthorized', { message: 'Invalid credentials' })

    const { token, expires } = await createSession(userWithAccount.id)
    cookie['auth.token'].set({
      value: token,
      expires,
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: env.NODE_ENV === 'production',
    })

    return status('OK', {
      message: 'Sign-in successful',
      data: { userId: userWithAccount.id },
    })
  },
  {
    cookie: config.cookie,
    body: t.Object({ identifier: t.String(), password: t.String() }),
  },
)
