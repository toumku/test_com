import { tRPCException } from '../../exception';
import { db } from '@/lib/db';
import { deviceSchema } from '@/schemas/devices.schema';
import { authProcedure } from '../../procedures/authProcedure';
import { devicesTable, usersTable } from '@/lib/db/tables';
import { aliasedTable, eq, getTableColumns } from 'drizzle-orm';

export const deviceQuery = authProcedure
  .input(deviceSchema)
  .query(async ({ input }) => {
    try {
      const { id } = input;

      const addedBy = aliasedTable(usersTable, 'addedBy');
      const editedBy = aliasedTable(usersTable, 'editedBy');
      const removedBy = aliasedTable(usersTable, 'removedBy');

      const [device] = await db
        .select({
          ...getTableColumns(devicesTable),
          addedName: addedBy.name,
          editedName: editedBy.name,
          removedName: removedBy.name,
        })
        .from(devicesTable)
        .leftJoin(addedBy, eq(addedBy.id, devicesTable.addedBy))
        .leftJoin(editedBy, eq(editedBy.id, devicesTable.editedBy))
        .leftJoin(removedBy, eq(removedBy.id, devicesTable.removedBy))
        .where(eq(devicesTable.id, id));

      return {
        device,
      };
    } catch (error) {
      throw tRPCException(error);
    }
  });
