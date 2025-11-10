import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { env } from '@pepe/validators/env'

const createDrizzleClient = () => {
  const conn = postgres({
    host: env.AUTH_POSTGRES_HOST,
    port: env.AUTH_POSTGRES_PORT,
    username: env.AUTH_POSTGRES_USER,
    password: env.AUTH_POSTGRES_PASSWORD,
    database: env.AUTH_POSTGRES_DATABASE,
  })
  return drizzle(conn, { casing: 'snake_case' })
}
const globalForDrizzle = globalThis as unknown as {
  db: ReturnType<typeof createDrizzleClient> | undefined
}
export const db = globalForDrizzle.db ?? createDrizzleClient()
if (env.NODE_ENV !== 'production') globalForDrizzle.db = db
