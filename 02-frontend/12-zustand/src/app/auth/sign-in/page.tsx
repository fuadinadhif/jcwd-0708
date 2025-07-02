"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(3, "Password must be at least 3 characters")
    .max(20, "Password cannot be more than 20 characters")
    .regex(/\d/, "Password must have at least 1 number characters")
    .regex(/[a-z]/, "Password must have at least 1 lowercase characters")
    .regex(/[A-Z]/, "Password must have at least 1 uppercase characters"),
});

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  console.log(errors);

  return (
    <main className="min-h-screen grid place-items-center">
      <form onSubmit={handleSubmit(() => console.log("Submitted"))}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="e.g yours@mail.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-small">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="*****"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-small">{errors.password.message}</p>
          )}
        </div>

        <button type="submit">Sign In</button>
      </form>
    </main>
  );
}
