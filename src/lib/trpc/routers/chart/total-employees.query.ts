import { tRPCException } from '../../exception';
import { db } from '@/lib/db';
import { authProcedure } from '../../procedures/authProcedure';
import { employeesTable } from '@/lib/db/tables';
import { and, gte, lt, sql } from 'drizzle-orm';

export const totalEmployeesQuery = authProcedure.query(async () => {
  try {
    const now = new Date();
    const sixMonthsAgo = new Date(now);
    sixMonthsAgo.setMonth(now.getMonth() - 6);

    const results = await db
      .select({
        month: sql<string>`to_char("added_at", 'YYYY-MM')`,
        count: sql<number>`count(*)`,
      })
      .from(employeesTable)
      .where(
        and(
          gte(employeesTable.addedAt, sixMonthsAgo),
          lt(employeesTable.addedAt, now)
        )
      )
      .groupBy(sql`to_char("added_at", 'YYYY-MM')`)
      .orderBy(sql`to_char("added_at", 'YYYY-MM')`);

    if (results.length < 2) {
      return { message: 'Not enough data to compare' };
    }

    const lastMonthData = results[results.length - 1];
    const prevMonthData = results[results.length - 2];

    const growth = lastMonthData.count - prevMonthData.count;
    const growthPercent = (growth / prevMonthData.count) * 100;

    return {
      lastMonth: lastMonthData.month,
      lastMonthCount: lastMonthData.count,
      previousMonth: prevMonthData.month,
      previousMonthCount: prevMonthData.count,
      growth,
      growthPercent: growthPercent.toFixed(2),
      status: growth > 0 ? 'growing' : growth < 0 ? 'declining' : 'stable',
    };
  } catch (error) {
    throw tRPCException(error);
  }
});
