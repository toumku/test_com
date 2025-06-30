import { SortDirection } from '@/variables/sort-direction';

export const employeesDefaultPage: number = 1;
export const employeesDefaultSearch: string = '';
export const employeesDefaultTake: number = 100;
export const employeesEndDate: number = 0;
export const employeesSortableColumns = [
  'id',
  'lastName',
  'firstName',
  'addedAt',
  'editedAt',
  'removedAt',
  'addedName',
  'editedName',
  'removedName',
] as const;

export type EmployeesSortableColumn = (typeof employeesSortableColumns)[number];

export const employeesSortColumn: EmployeesSortableColumn = 'firstName';

export const employeesSortDirection: SortDirection = 'asc';
export const employeesStartDate: number = 0;
