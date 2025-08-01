"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { registerSchema, RegisterSchema } from "../schemas/register.schema";

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });
  const router = useRouter();

  async function onSubmit(formData: RegisterSchema) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Registration failed");
      }

      toast.success("User registered succesfully");
      reset();
      router.push("/auth/login");
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div className="grid gap-1">
        <label htmlFor="name">Name</label>
        <input className="border" type="text" id="name" {...register("name")} />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div className="grid gap-1">
        <label htmlFor="email">Email</label>
        <input
          className="border"
          type="email"
          id="email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="grid gap-1">
        <label htmlFor="password">Password</label>
        <input
          className="border"
          type="password"
          id="password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <div className="grid gap-1">
        <label htmlFor="profilePicture">Profile Picture</label>
        <input
          className="border"
          type="text"
          id="profilePicture"
          {...register("profilePic")}
        />
        {errors.profilePic && (
          <p className="text-red-500 text-sm">{errors.profilePic.message}</p>
        )}
      </div>

      <div className="grid gap-1">
        <label htmlFor="referralCode">Referral Code (Optional)</label>
        <input
          className="border"
          type="text"
          id="referralCode"
          {...register("profilePic")}
        />
        {errors.referralCode && (
          <p className="text-red-500 text-sm">{errors.referralCode.message}</p>
        )}
      </div>

      <button className="bg-black text-white" disabled={isSubmitting}>
        {isSubmitting ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
