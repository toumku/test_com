import { db } from '@/lib/db';
import { tRPCException } from '../../exception';
import { authProcedure } from '../../procedures/authProcedure';
import { employeeEditSchema } from '@/schemas/employees.schema';
import { employeesTable } from '@/lib/db/tables';
import { eq } from 'drizzle-orm';

export const employeeEditMutation = authProcedure
  .input(employeeEditSchema)
  .mutation(async ({ input, ctx: { session } }) => {
    try {
      const { id, lastName, firstName, rank } = input;

      const [employee] = await db
        .update(employeesTable)
        .set({
          lastName,
          firstName,
          rank,
          editedBy: session.user.id,
          editedAt: new Date(),
        })
        .where(eq(employeesTable.id, id))
        .returning();

      return {
        employee,
      };
    } catch (error) {
      throw tRPCException(error);
    }
  });
