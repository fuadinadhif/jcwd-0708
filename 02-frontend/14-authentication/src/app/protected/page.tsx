import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Protected() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  return (
    <main className="p-4">
      <h2 className="text-3xl">Protected Page</h2>
    </main>
  );
}
