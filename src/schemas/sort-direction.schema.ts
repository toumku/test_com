import z from 'zod/v4';
import { sortDirections } from '@/variables/sort-direction';

export const sortDirectionSchema = z.enum(sortDirections);

export type SortDirectionSchema = z.infer<typeof sortDirectionSchema>;
