import { SortDirection } from '@/variables/sort-direction';

export const devicesDefaultPage: number = 1;
export const devicesDefaultSearch: string = '';
export const devicesDefaultTake: number = 100;
export const devicesEndDate: number = 0;
export const devicesSortableColumns = [
  'id',
  'name',
  'cpu',
  'ram',
  'hddSize',
  'hddBrand',
  'keyboard',
  'mouse',
  'type',
  'addedAt',
  'editedAt',
  'removedAt',
  'addedName',
  'editedName',
  'removedName',
] as const;

export type DevicesSortableColumn = (typeof devicesSortableColumns)[number];

export const devicesSortColumn: DevicesSortableColumn = 'name';

export const devicesSortDirection: SortDirection = 'asc';
export const devicesStartDate: number = 0;
