import { tRPCException } from '../../exception';
import {
  usersDefaultPage,
  usersDefaultSearch,
  usersDefaultTake,
  usersSortColumn,
  usersSortDirection,
} from '@/configs/users.config';
import { authProcedure } from '../../procedures/authProcedure';
import { usersSchema } from '@/schemas/users.schema';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export const usersQuery = authProcedure
  .input(usersSchema)
  .query(async ({ input }) => {
    try {
      const {
        page = usersDefaultPage,
        take = usersDefaultTake,
        search = usersDefaultSearch,
        sortColumn = usersSortColumn,
        sortDirection = usersSortDirection,
      } = input;

      const results = await auth.api.listUsers({
        query: {
          offset: (page - 1) * take,
          limit: take,
          searchField: search ? 'name' : undefined,
          searchOperator: search ? 'contains' : undefined,
          searchValue: search ? search : undefined,
          sortDirection,
          sortBy: sortColumn,
        },
        headers: await headers(),
      });

      return {
        users: results.users,
        total: results.total,
        found: 0,
      };
    } catch (error) {
      console.log(error);
      throw tRPCException(error);
    }
  });
