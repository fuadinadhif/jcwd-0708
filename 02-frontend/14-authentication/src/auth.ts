import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "e.g yours@mail.com",
        },
        password: {
          type: "password",
          label: "Passowrd",
          placeholder: "*****",
        },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        const response = await fetch(
          `http://localhost:3000/api/user?email=${credentials.email}`
        );

        if (!response.ok) return null;

        const userData = await response.json();

        if (!userData || userData.password !== credentials.password)
          return null;

        return userData;
      },
    }),
    Google,
    GitHub,
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.role) {
        session.user.role = token.role;
        // session.user.hobby = "Breathing";
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: { signIn: "/auth/sign-in" },
});

/* ---------------------------------- NOTES --------------------------------- */
// const NextAuthObject = NextAuth({ providers: [] });

// export const handlers = NextAuthObject.handlers;
// export const signIn = NextAuthObject.signIn;
// export const signOut = NextAuthObject.signOut;
// export const auth = NextAuthObject.auth;
