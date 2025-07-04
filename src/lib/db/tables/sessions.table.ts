import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { usersTable } from './users.table';

export const sessionsTable = pgTable('sessions', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  impersonatedBy: text('impersonated_by'),
});

export type SessionTable = typeof sessionsTable.$inferSelect;
