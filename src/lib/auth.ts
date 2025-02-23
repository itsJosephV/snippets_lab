// auth.ts
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import {PrismaAdapter} from "@auth/prisma-adapter";

import {db} from "./db";

const adapter = PrismaAdapter(db);

export const {auth, handlers, signIn, signOut} = NextAuth({
  adapter,
  providers: [GitHub],
});
