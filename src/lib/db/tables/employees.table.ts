import { date, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { usersTable } from './users.table';
import { ranks } from '@/variables/ranks';

export const employeesTable = pgTable('employees', {
  id: uuid('id').primaryKey().defaultRandom(),
  lastName: text('last_name').notNull(),
  firstName: text('first_name').notNull(),
  rank: text('rank', { enum: ranks }).notNull(),
  addedBy: text('added_by')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  addedAt: timestamp('added_at').notNull().defaultNow(),
  editedBy: text('edited_by').references(() => usersTable.id, {
    onDelete: 'cascade',
  }),
  editedAt: timestamp('edited_at'),
  removedBy: text('removed_by').references(() => usersTable.id, {
    onDelete: 'cascade',
  }),
  removedAt: timestamp('removed_at'),
  position: text('position').notNull(),
  birthday: date('birthday').notNull(),
  userId: text('user_id').references(() => usersTable.id),
});

export type EmployeeTable = typeof employeesTable.$inferSelect;
