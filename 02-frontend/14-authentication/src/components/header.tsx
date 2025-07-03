"use client";

import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  console.log(session);

  return (
    <header className="flex justify-between p-4">
      <h1>Logo</h1>

      <div>
        {session?.user ? (
          <div className="flex gap-4">
            <p>{session?.user.email}</p>
            <button onClick={() => signOut()}>Sign Out</button>
          </div>
        ) : (
          <button onClick={() => signIn()}>Sign In</button>
        )}
      </div>
    </header>
  );
}
