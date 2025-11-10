import { pgTable } from 'drizzle-orm/pg-core'

import { createId } from '@pepe/lib/id'

export const posts = pgTable('posts', (t) => ({
  id: t.varchar({ length: 24 }).primaryKey().$default(createId).notNull(),
  title: t.varchar({ length: 256 }).notNull(),
  content: t.text().notNull(),
  authorId: t.varchar({ length: 24 }).notNull(),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t.timestamp().defaultNow().notNull(),
}))
