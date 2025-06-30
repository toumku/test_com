import { tRPCException } from '../../exception';
import { authProcedure } from '../../procedures/authProcedure';
import { userAddSchema } from '@/schemas/users.schema';
import { auth } from '@/lib/auth';
import { TRPCError } from '@trpc/server';
import { headers } from 'next/headers';
import { db } from '@/lib/db';
import { employeesTable, usersTable } from '@/lib/db/tables';
import { eq } from 'drizzle-orm';

export const userAddMutation = authProcedure
  .input(userAddSchema)
  .mutation(async ({ input }) => {
    try {
      const { email, password, confirmPassword, role, employeeId } = input;

      if (password !== confirmPassword) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Нууц үг таарахгүй байна',
        });
      }

      const [employee] = await db
        .select()
        .from(employeesTable)
        .where(eq(employeesTable.id, employeeId));

      if (!employee) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Бие бүрэлдэхүүн олдсонгүй',
        });
      }

      const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email));

      if (user) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Энэ цахим шуудан бүртгэгдсэн байна',
        });
      }

      const session = await auth.api.createUser({
        body: {
          name: employee.firstName,
          email,
          password,
          role,
        },
        headers: await headers(),
      });

      await db
        .update(employeesTable)
        .set({
          userId: session.user.id,
        })
        .where(eq(employeesTable.id, employeeId));

      return {
        session,
      };
    } catch (error) {
      throw tRPCException(error);
    }
  });
