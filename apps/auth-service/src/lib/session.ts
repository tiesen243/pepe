import { eq } from 'drizzle-orm'

import { config } from '@/config'
import { encodeHex, generateSecureString, hashSecret } from '@/lib/crypto'
import { db } from '@/lib/db'
import { sessions, users } from '@/lib/db/schema'

export async function validateSessionToken(token: string) {
  const hashToken = encodeHex(await hashSecret(token))

  try {
    const [result] = await db
      .select({ token: sessions.token, user: users, expires: sessions.expires })
      .from(sessions)
      .where(eq(sessions.token, hashToken))
      .innerJoin(users, eq(sessions.userId, users.id))
    if (!result) return { user: null, expires: new Date() }

    const now = Date.now()
    const expiresTime = result.expires.getTime()

    if (now > expiresTime) {
      await db.delete(sessions).where(eq(sessions.token, hashToken))
      throw new Error('Session expired')
    }

    if (now >= expiresTime - config.session.expiresThreshold * 1000) {
      const newExpires = new Date(now + config.session.expiresIn * 1000)
      await db
        .update(sessions)
        .set({ expires: newExpires })
        .where(eq(sessions.token, hashToken))
      result.expires = newExpires
    }

    return { user: result.user, expires: result.expires }
  } catch {
    return { user: null, expires: new Date() }
  }
}

export async function createSession(userId: string) {
  const token = generateSecureString()
  const hashToken = await hashSecret(token)
  const expires = new Date(Date.now() + config.session.expiresIn * 1000)

  await db.insert(sessions).values({
    userId,
    token: encodeHex(hashToken),
    expires,
  })

  return { token, expires }
}

export async function invalidateSession(token: string) {
  const hashToken = encodeHex(await hashSecret(token))
  await db.delete(sessions).where(eq(sessions.token, hashToken))
}

export async function invalidateSessions(userId: string) {
  await db.delete(sessions).where(eq(sessions.userId, userId))
}
