import z from 'zod/v4';

import { ranks } from '@/variables/ranks';
import {
  employeesDefaultPage,
  employeesDefaultSearch,
  employeesDefaultTake,
  employeesEndDate,
  employeesSortableColumns,
  employeesSortColumn,
  employeesSortDirection,
  employeesStartDate,
} from '@/configs/employees.config';
import { sortDirectionSchema } from './sort-direction.schema';

export const employeesSchema = z.object({
  search: z.string().default(employeesDefaultSearch),
  page: z.number().default(employeesDefaultPage),
  take: z.number().default(employeesDefaultTake),
  sortColumn: z.enum(employeesSortableColumns).default(employeesSortColumn),
  sortDirection: sortDirectionSchema.default(employeesSortDirection),
  startDate: z.number().default(employeesStartDate),
  endDate: z.number().default(employeesEndDate),

  filterUserIds: z.string().optional(),
});

export type EmployeeSchema = z.infer<typeof employeesSchema>;

export const employeeAddSchema = z.object({
  lastName: z.string().min(1),
  firstName: z.string(),
  rank: z.enum(ranks),
});

export type EmployeeAddSchema = z.infer<typeof employeeAddSchema>;

export const employeeAddSchemaDefaultValues: EmployeeAddSchema = {
  lastName: '',
  firstName: '',
  rank: 'Дэд ахлагч',
};

export const employeeEditSchema = employeeAddSchema.extend({
  id: z.uuid(),
});

export type EmployeeEditSchema = z.infer<typeof employeeEditSchema>;

export const employeeEditSchemaDefaultValues: EmployeeEditSchema = {
  id: '',
  lastName: '',
  firstName: '',
  rank: 'Дэд ахлагч',
};

export const employeeSchema = employeeEditSchema.pick({
  id: true,
});
