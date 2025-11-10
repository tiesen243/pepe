import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { env } from '@pepe/validators/env'

const createDrizzleClient = () => {
  const conn = postgres({
    host: env.POST_POSTGRES_HOST,
    port: env.POST_POSTGRES_PORT,
    username: env.POST_POSTGRES_USER,
    password: env.POST_POSTGRES_PASSWORD,
    database: env.POST_POSTGRES_DATABASE,
  })
  return drizzle(conn, { casing: 'snake_case' })
}
const globalForDrizzle = globalThis as unknown as {
  db: ReturnType<typeof createDrizzleClient> | undefined
}
export const db = globalForDrizzle.db ?? createDrizzleClient()
if (env.NODE_ENV !== 'production') globalForDrizzle.db = db
