import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

console.log('test', process.env.DATABASE_URL);

export default defineConfig({
  out: './src/lib/db/migrations',
  schema: './src/lib/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
