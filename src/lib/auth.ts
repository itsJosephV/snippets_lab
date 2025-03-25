import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {ViewType} from "@prisma/client";

import db from "./db";

/**
 * model Collection {
  id          String    @id @default(uuid())
  name        String
  description String?
  isDefault   Boolean   @default(false)
  userId      String
  user        User      @relation(fields: [userId], references: [id])
  folders     Folder[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  @@index([userId])
}
 */

/**
 * model Folder {
  id           String    @id @default(uuid())
  name         String
  description  String?
  collectionId String
  collection   Collection @relation(fields: [collectionId], references: [id], onDelete: Cascade)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  snippets     Snippet[]
  isDefault    Boolean @default(false)
  type        ViewType @default(NORMAL)
  filters     Json?
  isPinned    Boolean   @default(false)
  @@index([collectionId])
  @@index([collectionId, name])
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

/** // {
          //   name: "All Snippets",
          //   type: ViewType.ALL,
          //   userId: user.id as string,
          //   filters: {},
          //   isPinned: true,
          // },
          // {
          //   name: "Favorites",
          //   type: ViewType.FAVORITES,
          //   userId: user.id as string,
          //   filters: {isFavorite: true},
          //   isPinned: true,
          // }, */
