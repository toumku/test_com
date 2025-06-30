import z from 'zod/v4';

import {
  devicesDefaultPage,
  devicesDefaultSearch,
  devicesDefaultTake,
  devicesEndDate,
  devicesSortableColumns,
  devicesSortColumn,
  devicesSortDirection,
  devicesStartDate,
} from '@/configs/devices.config';
import { sortDirectionSchema } from './sort-direction.schema';
import { deviceTypes } from '@/variables/deviceTypes';

export const devicesSchema = z.object({
  search: z.string().default(devicesDefaultSearch),
  page: z.number().default(devicesDefaultPage),
  take: z.number().default(devicesDefaultTake),
  sortColumn: z.enum(devicesSortableColumns).default(devicesSortColumn),
  sortDirection: sortDirectionSchema.default(devicesSortDirection),
  startDate: z.number().default(devicesStartDate),
  endDate: z.number().default(devicesEndDate),

  filterUserIds: z.string().optional(),
});

export type DeviceSchema = z.infer<typeof devicesSchema>;

export const deviceAddSchema = z.object({
  name: z.string().min(1),
  cpu: z.string().min(1),
  ram: z.string().min(1),
  hddSize: z.string().min(1),
  hddBrand: z.string().min(1),
  keyboard: z.string().min(1),
  mouse: z.string().min(1),
  type: z.enum(deviceTypes),
  employeeId: z.string().min(1),
});

export type DeviceAddSchema = z.infer<typeof deviceAddSchema>;

export const deviceAddSchemaDefaultValues: DeviceAddSchema = {
  name: '',
  cpu: '',
  ram: '',
  hddSize: '',
  hddBrand: '',
  keyboard: '',
  mouse: '',
  type: 'Компьютер',
  employeeId: '',
};

export const deviceEditSchema = deviceAddSchema.extend({
  id: z.uuid(),
});

export type DeviceEditSchema = z.infer<typeof deviceEditSchema>;

export const deviceEditSchemaDefaultValues: DeviceEditSchema = {
  id: '',
  name: '',
  cpu: '',
  ram: '',
  hddSize: '',
  hddBrand: '',
  keyboard: '',
  mouse: '',
  type: 'Компьютер',
  employeeId: '',
};

export const deviceSchema = deviceEditSchema.pick({
  id: true,
});
