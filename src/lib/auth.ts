import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import {PrismaAdapter} from "@auth/prisma-adapter";

import db from "./db";

export const {auth, handlers, signIn, signOut, unstable_update} = NextAuth({
  adapter: PrismaAdapter(db),
  session: {strategy: "jwt"},
  providers: [GitHub],
  secret: process.env.AUTH_SECRET,
  basePath: "/api/auth",
  pages: {
    signIn: "/auth",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },
    async session({session, token}) {
      if (token.id && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }

      return session;
    },
  },
});
