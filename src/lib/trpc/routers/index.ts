import { mergeRouters, router } from '../server';
import * as deviceRouters from './devices';
import * as employeeRouters from './employees';
import * as userRouters from './users';
import * as chartRouters from './chart';

export const routers = mergeRouters(
  router(deviceRouters),
  router(employeeRouters),
  router(userRouters),
  router(chartRouters)
);

export type Router = typeof routers;
