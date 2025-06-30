import { db } from '@/lib/db';
import { tRPCException } from '../../exception';
import { authProcedure } from '../../procedures/authProcedure';
import { employeeAddSchema } from '@/schemas/employees.schema';
import { employeesTable } from '@/lib/db/tables';

export const employeeAddMutation = authProcedure
  .input(employeeAddSchema)
  .mutation(async ({ input, ctx: { session } }) => {
    try {
      const { lastName, firstName, rank } = input;

      const [employee] = await db
        .insert(employeesTable)
        .values({
          lastName,
          firstName,
          rank,
          addedBy: session.user.id,
          addedAt: new Date(),
        })
        .returning();

      return {
        employee,
      };
    } catch (error) {
      throw tRPCException(error);
    }
  });
