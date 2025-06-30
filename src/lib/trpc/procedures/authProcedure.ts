import { TRPCError } from '@trpc/server';
import { publicProcedure } from './publicProcedure';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

export const authProcedure = publicProcedure.use(async ({ next, ...opts }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: `Хандах токен байхгүй байна`,
    });
  }

  return next({
    ...opts,
    ctx: {
      ...opts.ctx,
      session,
    },
  });
});
