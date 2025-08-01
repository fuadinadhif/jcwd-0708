import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "Name must have at least 3 characters"),
  email: z.email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must have at least 1 lowercase character"),
  profilePic: z.string(),
  referralCode: z.string().optional(),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
