import { betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './db';
import {
  accountsTable,
  sessionsTable,
  usersTable,
  verificationsTable,
} from './db/tables';
import { admin } from 'better-auth/plugins';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      users: usersTable,
      accounts: accountsTable,
      sessions: sessionsTable,
      verifications: verificationsTable,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    nextCookies(),
    admin({
      adminRoles: ['admin', 'user'],
      defaultRole: 'user',
    }),
  ],
  user: {
    modelName: 'users',
  },
  account: {
    modelName: 'accounts',
  },
  session: {
    modelName: 'sessions',
  },
  verification: {
    modelName: 'verifications',
  },
});
