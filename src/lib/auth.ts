import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {ViewType} from "@prisma/client";

import db from "./db";

/**
 * model SavedView {
  id          Int       @id @default(autoincrement())
  name        String
  type        ViewType
  userId      String
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  filters     Json
  isPinned    Boolean   @default(false)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @default(now()) @updatedAt

  @@unique([userId, type], name: "unique_predefined_views")
  @@index([userId, isPinned])
}

enum ViewType {
  ALL
  FAVORITES
}
 */

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
      await db.savedView.createMany({
        data: [
          {
            name: "All Snippets",
            type: ViewType.ALL,
            userId: user.id as string,
            filters: {},
            isPinned: true,
          },
          {
            name: "Favorites",
            type: ViewType.FAVORITES,
            userId: user.id as string,
            filters: {isFavorite: true},
            isPinned: true,
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
