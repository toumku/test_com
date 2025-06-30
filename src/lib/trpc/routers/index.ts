import { mergeRouters, router } from '../server';
import * as deviceRouters from './devices';
import * as employeeRouters from './employees';
import * as userRouters from './users';

export const routers = mergeRouters(
  router(deviceRouters),
  router(employeeRouters),
  router(userRouters)
);

export type Router = typeof routers;
