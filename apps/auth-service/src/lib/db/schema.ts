import { relations } from 'drizzle-orm'
import { pgTable, uniqueIndex } from 'drizzle-orm/pg-core'

import { createId } from '@pepe/lib/id'

export const users = pgTable('users', (t) => ({
  id: t.varchar({ length: 24 }).primaryKey().$default(createId).notNull(),
  username: t.varchar({ length: 255 }).unique().notNull(),
  email: t.varchar({ length: 255 }).unique().notNull(),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t
    .timestamp({ mode: 'date', withTimezone: true })
    .defaultNow()
    .$onUpdateFn(() => new Date())
    .notNull(),
}))

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
}))

export const accounts = pgTable(
  'accounts',
  (t) => ({
    id: t.varchar({ length: 24 }).primaryKey().$default(createId).notNull(),
    provider: t.varchar({ length: 255 }).notNull(),
    accountId: t.varchar({ length: 255 }).notNull(),
    userId: t
      .varchar({ length: 24 })
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    password: t.varchar({ length: 255 }),
  }),
  (account) => [
    uniqueIndex('account_provider_account_id_idx').on(
      account.provider,
      account.accountId,
    ),
  ],
)

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}))

export const sessions = pgTable('sessions', (t) => ({
  token: t.varchar({ length: 255 }).primaryKey().notNull(),
  expires: t.timestamp({ mode: 'date', withTimezone: true }).notNull(),
  userId: t
    .varchar({ length: 24 })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
}))

export const sessionRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}))
