import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex justify-center items-center flex-col gap-4">
      {session?.user && <p>Welcome, {session?.user.name}</p>}
      <h2 className="text-4xl">Authentication</h2>
    </main>
  );
}
