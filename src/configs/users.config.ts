import { SortDirection } from '@/variables/sort-direction';

export const usersDefaultPage: number = 1;
export const usersDefaultSearch: string = '';
export const usersDefaultTake: number = 100;
export const usersEndDate: number = 0;
export const usersSortableColumns = ['name', 'email'] as const;

export type UsersSortableColumn = (typeof usersSortableColumns)[number];

export const usersSortColumn: UsersSortableColumn = 'name';

export const usersSortDirection: SortDirection = 'asc';
export const usersStartDate: number = 0;
