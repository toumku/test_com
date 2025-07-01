import { tRPCException } from '../../exception';
import { db } from '@/lib/db';
import { authProcedure } from '../../procedures/authProcedure';
import { devicesTable, employeesTable } from '@/lib/db/tables';
import { deviceEmployeeChartSchema } from '@/schemas/charts.schema';
import { sql } from 'drizzle-orm';

export const deviceEmployeeChartQuery = authProcedure
  .input(deviceEmployeeChartSchema)
  .query(async ({ input }) => {
    try {
      const { timeRange } = input;

      let fromDate: Date;

      switch (timeRange) {
        case '7d':
          fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
          break;
        case '30d':
          fromDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
          break;
        case '90d':
          fromDate = new Date();
          fromDate.setMonth(fromDate.getMonth() - 3);
          break;
        default:
          throw new Error('Invalid filter type');
      }

      const chartData = await db.execute(sql`
  SELECT
    COALESCE(d.date, e.date) AS date,
    COALESCE(d.device_count, 0) AS devices,
    COALESCE(e.employee_count, 0) AS employees
  FROM (
    SELECT DATE(added_at) AS date, COUNT(*) AS device_count
    FROM ${devicesTable}
    WHERE added_at >= ${fromDate}
    GROUP BY DATE(added_at)
  ) d
  FULL OUTER JOIN (
    SELECT DATE(added_at) AS date, COUNT(*) AS employee_count
    FROM ${employeesTable}
    WHERE added_at >= ${fromDate}
    GROUP BY DATE(added_at)
  ) e ON d.date = e.date
  ORDER BY date;
`);

      type ChartData = {
        date: string;
        devices: number;
        employees: number;
      };

      return {
        chartData: chartData.rows as ChartData[],
      };
    } catch (error) {
      throw tRPCException(error);
    }
  });
