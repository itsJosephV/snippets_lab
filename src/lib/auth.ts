import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {ViewType} from "@prisma/client";

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
  events: {
    async createUser({user}) {
      const collection = await db.collection.create({
        data: {
          name: "virtual folders",
          description: "virtual folders",
          isDefault: false,
          userId: user.id as string,
        },
      });

      await db.folder.createMany({
        data: [
          {
            name: "All Snippets",
            collectionId: collection.id,
            isDefault: false,
            type: ViewType.ALL,
            filters: {},
            isPinned: false,
          },
          {
            name: "Favorites",
            collectionId: collection.id,
            isDefault: false,
            type: ViewType.FAVORITES,
            filters: {isFavorite: true},
            isPinned: false,
          },
        ],
      });
    },
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
