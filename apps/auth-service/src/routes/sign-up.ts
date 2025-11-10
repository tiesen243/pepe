import { eq, or } from 'drizzle-orm'
import Elysia, { status, t } from 'elysia'

import { db } from '@/lib/db'
import { accounts, users } from '@/lib/db/schema'
import { Password } from '@/lib/password'

export const signUp = new Elysia({
  name: 'sign-up',
}).post(
  '/sign-up',
  async ({ body }) => {
    const { username, email, password: plainPassword } = body

    const [existingUser] = await db
      .select({ id: users.id })
      .from(users)
      .where(or(eq(users.email, email), eq(users.username, username)))
      .limit(1)
    if (existingUser)
      return status('Conflict', { message: 'User already exists' })

    return db.transaction(async (tx) => {
      const [newUser] = await tx
        .insert(users)
        .values({ username, email })
        .returning({ id: users.id })
      if (!newUser)
        return status('Internal Server Error', {
          message: 'Failed to create user',
        })

      const hashedPassword = await new Password().hash(plainPassword)
      await tx.insert(accounts).values({
        userId: newUser.id,
        provider: 'credentials',
        accountId: newUser.id,
        password: hashedPassword,
      })

      return status('Created', { message: 'User created successfully' })
    })
  },
  {
    body: t.Object({
      username: t.String(),
      email: t.String({ format: 'email' }),
      password: t.String(),
    }),
  },
)
