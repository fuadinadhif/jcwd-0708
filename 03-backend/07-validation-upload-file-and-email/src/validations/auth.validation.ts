import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(3, "Name at least must be at least 3 characters")
    .max(100, "Name cannot be more than 10 characters"),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[a-z]/, "Password must have at least 1 lowercase character")
    .regex(/[A-Z]/, "Password must have at least 1 uppercase character")
    .regex(/[0-9]/, "Password must have at least 1 number")
    .regex(/[^A-Za-z0-9]/, "Password must have at least 1 symbol"),
  profilePic: z.url("Profile picture must be a valid URL"),
});
