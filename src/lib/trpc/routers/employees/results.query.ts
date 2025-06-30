import { db } from '@/lib/db';
import { tRPCException } from '../../exception';
import {
  employeesDefaultPage,
  employeesDefaultSearch,
  employeesDefaultTake,
  employeesEndDate,
  employeesSortColumn,
  employeesSortDirection,
  employeesStartDate,
} from '@/configs/employees.config';
import { isUUID } from '@/utils/isUUID';
import { authProcedure } from '../../procedures/authProcedure';
import { employeesSchema } from '@/schemas/employees.schema';
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
import { employeesTable } from '@/lib/db/tables';

export const employeesQuery = authProcedure
  .input(employeesSchema)
  .query(async ({ input }) => {
    try {
      const {
        page = employeesDefaultPage,
        take = employeesDefaultTake,
        search = employeesDefaultSearch,
        sortColumn = employeesSortColumn,
        sortDirection = employeesSortDirection,
        startDate = employeesStartDate,
        endDate = employeesEndDate,
        filterUserIds,
      } = input;

      const addedBy = aliasedTable(usersTable, 'addedBy');
      const editedBy = aliasedTable(usersTable, 'editedBy');
      const removedBy = aliasedTable(usersTable, 'removedBy');

      const searchFilter = search
        ? or(
            isUUID(search) ? eq(employeesTable.id, search) : undefined,
            ilike(employeesTable.lastName, `%${search}%`),
            ilike(employeesTable.firstName, `%${search}%`),
            ilike(employeesTable.rank, `%${search}%`),
            ilike(addedBy.name, `%${search}%`),
            ilike(editedBy.name, `%${search}%`),
            ilike(removedBy.name, `%${search}%`)
          )
        : undefined;

      const dateFilter =
        startDate && endDate
          ? between(
              employeesTable.addedAt,
              new Date(startDate),
              new Date(endDate)
            )
          : undefined;

      const countryFilter = filterUserIds
        ? eq(employeesTable.addedBy, filterUserIds)
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
          ? asc(employeesTable[sortColumn])
          : desc(employeesTable[sortColumn]);

      const total = await db.$count(employeesTable);

      const foundRows = await db
        .select({ count: sql<number>`count(*)` })
        .from(employeesTable)
        .leftJoin(addedBy, eq(addedBy.id, employeesTable.addedBy))
        .leftJoin(editedBy, eq(editedBy.id, employeesTable.editedBy))
        .leftJoin(removedBy, eq(removedBy.id, employeesTable.removedBy))
        .where(filters);

      const found = foundRows[0].count;

      const employees = await db
        .select({
          ...getTableColumns(employeesTable),
          addedName: addedBy.name,
          editedName: editedBy.name,
          removedName: removedBy.name,
        })
        .from(employeesTable)
        .leftJoin(addedBy, eq(addedBy.id, employeesTable.addedBy))
        .leftJoin(editedBy, eq(editedBy.id, employeesTable.editedBy))
        .leftJoin(removedBy, eq(removedBy.id, employeesTable.removedBy))
        .where(filters)
        .orderBy(orderBy)
        .limit(take)
        .offset((page - 1) * take);

      return {
        employees,
        total,
        found,
      };
    } catch (error) {
      throw tRPCException(error);
    }
  });
