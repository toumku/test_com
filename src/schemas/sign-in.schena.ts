"use client"

import { z } from "zod/v4"

export const signInSchema = z.object({
    email: z.email().min(1),
    password: z.string().min(8)
})