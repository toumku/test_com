import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { usersTable } from './users.table';
import { deviceTypes } from '@/variables/deviceTypes';
import { employeesTable } from './employees.table';

export const devicesTable = pgTable('devices', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  cpu: text('cpu').notNull(),
  ram: text('ram').notNull(),
  hddSize: text('hdd_size').notNull(),
  hddBrand: text('hdd_brand'),
  keyboard: text('keyboard'),
  mouse: text('mouse'),
  type: text('type', { enum: deviceTypes }).notNull(),
  employeeId: uuid('employee_id')
    .notNull()
    .references(() => employeesTable.id),
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
});

export type DeviceTable = typeof devicesTable.$inferSelect;
