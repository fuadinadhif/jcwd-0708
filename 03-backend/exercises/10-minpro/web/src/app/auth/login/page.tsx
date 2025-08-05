"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface LoginSchema {
  email: string;
  password: string;
}

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<LoginSchema>({ defaultValues: { email: "", password: "" } });
  const router = useRouter();

  async function onSubmit(formData: LoginSchema) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Login failed");
      }

      toast.success("Login succesfully");
      reset();
      router.push("/");
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  }

  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-xl font-bold mb-4 uppercase">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-1">
          <label htmlFor="email">Email</label>
          <input
            className="border"
            type="email"
            id="email"
            {...register("email")}
          />
        </div>

        <div className="grid gap-1">
          <label htmlFor="password">Password</label>
          <input
            className="border"
            type="password"
            id="password"
            {...register("password")}
          />
        </div>

        <button className="bg-black text-white" disabled={isSubmitting}>
          {isSubmitting ? "Login..." : "Login"}
        </button>
      </form>
    </main>
  );
}
