"use client";

import { signIn } from "next-auth/react";
import { AuthError } from "next-auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [credentialData, setCredentialData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await signIn("credentials", {
        email: credentialData.email,
        password: credentialData.password,
        redirect: false,
      });
      router.push("/");
    } catch (error) {
      if (error instanceof AuthError) {
        alert("Failed sign in");
      }

      alert("FAILED");
    }
  }

  return (
    <main className="p-4">
      <h2 className="text-3xl">Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentialData.email}
            onChange={(e) =>
              setCredentialData({ ...credentialData, email: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentialData.password}
            onChange={(e) =>
              setCredentialData({ ...credentialData, password: e.target.value })
            }
          />
        </div>
        <button type="submit">Sign In</button>
      </form>

      <form action=""></form>
      <form action=""></form>
    </main>
  );
}

/* ------------------------------- SERVER WAY ------------------------------- */
// import { signIn } from "@/auth";
// import { redirect } from "next/navigation";
// import { AuthError } from "next-auth";

// export default function SignIn() {
//   return (
//     <main className="p-4">
//       <h2 className="text-3xl">Sign In</h2>
//       <form
//         action={async (formData) => {
//           "use server";
//           try {
//             await signIn("credentials", {
//               email: formData.get("email"),
//               password: formData.get("password"),
//               redirectTo: "/",
//             });
//           } catch (error) {
//             if (error instanceof AuthError) {
//               return redirect("/error");
//             }
//             throw error;
//           }
//         }}
//       >
//         <div>
//           <label htmlFor="email">Email</label>
//           <input type="email" id="email" name="email" />
//         </div>
//         <div>
//           <label htmlFor="password">Password</label>
//           <input type="password" id="password" name="password" />
//         </div>
//         <button type="submit">Sign In</button>
//       </form>

//       <form action=""></form>
//       <form action=""></form>
//     </main>
//   );
// }
