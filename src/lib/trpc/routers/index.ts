import { mergeRouters, router } from '../server';
import * as employeeRouters from './employees';

export const routers = mergeRouters(router(employeeRouters));

export type Router = typeof routers;
