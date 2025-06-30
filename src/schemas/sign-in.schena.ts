'use client';

import z from 'zod/v4';
import { signUpSchema } from './sign-up.schema';

export const signInSchema = signUpSchema.pick({
  email: true,
  password: true,
});

export type SignInSchema = z.infer<typeof signInSchema>;

export const signInSchemaDefaultValues: SignInSchema = {
  email: '',
  password: '',
};
