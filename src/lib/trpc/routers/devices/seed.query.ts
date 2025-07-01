import { tRPCException } from '../../exception';
import { db } from '@/lib/db';
import { authProcedure } from '../../procedures/authProcedure';
import { devicesTable, employeesTable } from '@/lib/db/tables';
import { deviceScriptData } from '@/scripts/device.script';
import { Rank } from '@/variables/ranks';
import { DeviceType } from '@/variables/deviceTypes';
import { getRandomDateFromLastTwoYears } from '@/utils/getRandomDateFromLastTwoYears';

export const deviceSeedQuery = authProcedure.query(
  async ({ ctx: { session } }) => {
    try {
      for (const employee of deviceScriptData) {
        const [newEmployee] = await db
          .insert(employeesTable)
          .values({
            lastName: employee.last_name,
            firstName: employee.first_name,
            rank: employee.rank as Rank,
            position: employee.position,
            birthday: employee.birth_date,
            addedBy: session.user.id,
            addedAt: getRandomDateFromLastTwoYears(),
            userId: null,
          })
          .returning();

        for (const device of employee.devices) {
          await db.insert(devicesTable).values({
            name: device.device_name,
            cpu: device.cpu,
            ram: device.ram,
            hddSize: device.hdd_size,
            hddBrand: device.hdd_brand,
            type: device.type as DeviceType,
            addedBy: session.user.id,
            addedAt: getRandomDateFromLastTwoYears(),
            employeeId: newEmployee.id,
            keyboard: device.keyboard,
            mouse: device.mouse,
          });
        }
      }

      return {
        success: true,
      };
    } catch (error) {
      throw tRPCException(error);
    }
  }
);
