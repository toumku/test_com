import { db } from '@/lib/db';
import { tRPCException } from '../../exception';
import { authProcedure } from '../../procedures/authProcedure';
import { deviceEditSchema } from '@/schemas/devices.schema';
import { devicesTable } from '@/lib/db/tables';
import { eq } from 'drizzle-orm';

export const deviceEditMutation = authProcedure
  .input(deviceEditSchema)
  .mutation(async ({ input, ctx: { session } }) => {
    try {
      const {
        id,
        name,
        cpu,
        ram,
        hddSize,
        hddBrand,
        keyboard,
        mouse,
        type,
        employeeId,
      } = input;

      const [device] = await db
        .update(devicesTable)
        .set({
          name,
          cpu,
          ram,
          hddSize,
          hddBrand,
          keyboard,
          mouse,
          type,
          employeeId,
          editedBy: session.user.id,
          editedAt: new Date(),
        })
        .where(eq(devicesTable.id, id))
        .returning();

      return {
        device,
      };
    } catch (error) {
      throw tRPCException(error);
    }
  });
