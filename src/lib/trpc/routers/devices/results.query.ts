import { db } from '@/lib/db';
import { tRPCException } from '../../exception';
import {
  devicesDefaultPage,
  devicesDefaultSearch,
  devicesDefaultTake,
  devicesEndDate,
  devicesSortColumn,
  devicesSortDirection,
  devicesStartDate,
} from '@/configs/devices.config';
import { isUUID } from '@/utils/isUUID';
import { authProcedure } from '../../procedures/authProcedure';
import { devicesSchema } from '@/schemas/devices.schema';
import {
  aliasedTable,
  and,
  asc,
  between,
  desc,
  eq,
  getTableColumns,
  ilike,
  or,
  sql,
} from 'drizzle-orm';
import { usersTable } from '@/lib/db/tables/users.table';
import { devicesTable, employeesTable } from '@/lib/db/tables';

export const devicesQuery = authProcedure
  .input(devicesSchema)
  .query(async ({ input }) => {
    try {
      const {
        page = devicesDefaultPage,
        take = devicesDefaultTake,
        search = devicesDefaultSearch,
        sortColumn = devicesSortColumn,
        sortDirection = devicesSortDirection,
        startDate = devicesStartDate,
        endDate = devicesEndDate,
        filterUserIds,
      } = input;

      const addedBy = aliasedTable(usersTable, 'addedBy');
      const editedBy = aliasedTable(usersTable, 'editedBy');
      const removedBy = aliasedTable(usersTable, 'removedBy');

      const searchFilter = search
        ? or(
            isUUID(search) ? eq(devicesTable.id, search) : undefined,
            ilike(devicesTable.name, `%${search}%`),
            ilike(devicesTable.cpu, `%${search}%`),
            ilike(devicesTable.ram, `%${search}%`),
            ilike(devicesTable.hddSize, `%${search}%`),
            ilike(devicesTable.hddBrand, `%${search}%`),
            ilike(devicesTable.keyboard, `%${search}%`),
            ilike(devicesTable.mouse, `%${search}%`),
            ilike(devicesTable.type, `%${search}%`),
            ilike(addedBy.name, `%${search}%`),
            ilike(editedBy.name, `%${search}%`),
            ilike(removedBy.name, `%${search}%`)
          )
        : undefined;

      const dateFilter =
        startDate && endDate
          ? between(
              devicesTable.addedAt,
              new Date(startDate),
              new Date(endDate)
            )
          : undefined;

      const countryFilter = filterUserIds
        ? eq(devicesTable.addedBy, filterUserIds)
        : undefined;

      const filters = and(searchFilter, dateFilter, countryFilter);

      const orderBy =
        sortColumn === 'addedName'
          ? sortDirection === 'asc'
            ? asc(addedBy.name)
            : desc(addedBy.name)
          : sortColumn === 'editedName'
          ? sortDirection === 'asc'
            ? asc(editedBy.name)
            : desc(editedBy.name)
          : sortColumn === 'removedName'
          ? sortDirection === 'asc'
            ? asc(removedBy.name)
            : desc(removedBy.name)
          : sortDirection === 'asc'
          ? asc(devicesTable[sortColumn])
          : desc(devicesTable[sortColumn]);

      const total = await db.$count(devicesTable);

      const foundRows = await db
        .select({ count: sql<number>`count(*)` })
        .from(devicesTable)
        .leftJoin(addedBy, eq(addedBy.id, devicesTable.addedBy))
        .leftJoin(editedBy, eq(editedBy.id, devicesTable.editedBy))
        .leftJoin(removedBy, eq(removedBy.id, devicesTable.removedBy))
        .leftJoin(
          employeesTable,
          eq(employeesTable.id, devicesTable.employeeId)
        )
        .where(filters);

      const found = foundRows[0].count;

      const devices = await db
        .select({
          ...getTableColumns(devicesTable),
          addedName: addedBy.name,
          editedName: editedBy.name,
          removedName: removedBy.name,
          deviceOwnerLastName: employeesTable.lastName,
          deviceOwnerFirstName: employeesTable.firstName,
        })
        .from(devicesTable)
        .leftJoin(addedBy, eq(addedBy.id, devicesTable.addedBy))
        .leftJoin(editedBy, eq(editedBy.id, devicesTable.editedBy))
        .leftJoin(removedBy, eq(removedBy.id, devicesTable.removedBy))
        .leftJoin(
          employeesTable,
          eq(employeesTable.id, devicesTable.employeeId)
        )
        .where(filters)
        .orderBy(orderBy)
        .limit(take)
        .offset((page - 1) * take);

      return {
        devices,
        total,
        found,
      };
    } catch (error) {
      throw tRPCException(error);
    }
  });
