import z from 'zod/v4';

import {
  usersDefaultPage,
  usersDefaultSearch,
  usersDefaultTake,
  usersEndDate,
  usersSortableColumns,
  usersSortColumn,
  usersSortDirection,
  usersStartDate,
} from '@/configs/users.config';
import { sortDirectionSchema } from './sort-direction.schema';
import { roles } from '@/variables/roles';

export const usersSchema = z.object({
  search: z.string().default(usersDefaultSearch),
  page: z.number().default(usersDefaultPage),
  take: z.number().default(usersDefaultTake),
  sortColumn: z.enum(usersSortableColumns).default(usersSortColumn),
  sortDirection: sortDirectionSchema.default(usersSortDirection),
  startDate: z.number().default(usersStartDate),
  endDate: z.number().default(usersEndDate),

  filterUserIds: z.string().optional(),
});

export type UserSchema = z.infer<typeof usersSchema>;

export const userAddSchema = z.object({
  employeeId: z.uuid(),
  email: z.string(),
  password: z.string().min(1),
  confirmPassword: z.string().min(1),
  role: z.enum(roles),
});

export type UserAddSchema = z.infer<typeof userAddSchema>;

export const userAddSchemaDefaultValues: UserAddSchema = {
  employeeId: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'user',
};
