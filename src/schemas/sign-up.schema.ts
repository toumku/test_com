"use client";

import { z } from "zod/v4";

export const signUpSchema = z.object({
  name: z.string().min(1),
  email: z.email().min(1),
  password: z.string().min(8),
  confirmPassword: z.string().min(1),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const signUpSchemaDefaultValues: SignUpSchema = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
