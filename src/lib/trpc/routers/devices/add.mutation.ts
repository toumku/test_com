import { db } from '@/lib/db';
import { tRPCException } from '../../exception';
import { authProcedure } from '../../procedures/authProcedure';
import { deviceAddSchema } from '@/schemas/devices.schema';
import { devicesTable } from '@/lib/db/tables';

export const deviceAddMutation = authProcedure
  .input(deviceAddSchema)
  .mutation(async ({ input, ctx: { session } }) => {
    try {
      const {
        name,
        cpu,
        ram,
        hddSize,
        hddBrand,
        keyboard,
        mouse,
        type,
        employeeId,
        imageURL,
      } = input;

      const [device] = await db
        .insert(devicesTable)
        .values({
          name,
          cpu,
          ram,
          hddSize,
          hddBrand,
          keyboard,
          mouse,
          type,
          employeeId,
          imageURL,
          addedBy: session.user.id,
          addedAt: new Date(),
        })
        .returning();

      return {
        device,
      };
    } catch (error) {
      throw tRPCException(error);
    }
  });
