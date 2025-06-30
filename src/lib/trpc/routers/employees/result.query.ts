import { tRPCException } from '../../exception';
import { db } from '@/lib/db';
import { employeeSchema } from '@/schemas/employees.schema';
import { authProcedure } from '../../procedures/authProcedure';
import { employeesTable, usersTable } from '@/lib/db/tables';
import { aliasedTable, eq, getTableColumns } from 'drizzle-orm';

export const employeeQuery = authProcedure
  .input(employeeSchema)
  .query(async ({ input }) => {
    try {
      const { id } = input;

      const addedBy = aliasedTable(usersTable, 'addedBy');
      const editedBy = aliasedTable(usersTable, 'editedBy');
      const removedBy = aliasedTable(usersTable, 'removedBy');

      const [employee] = await db
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
        .where(eq(employeesTable.id, id));

      return {
        employee,
      };
    } catch (error) {
      throw tRPCException(error);
    }
  });
