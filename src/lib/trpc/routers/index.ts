import { mergeRouters, router } from '../server';
import * as employeeRouters from './employees';
import * as userRouters from './users';

export const routers = mergeRouters(
  router(employeeRouters),
  router(userRouters)
);

export type Router = typeof routers;
