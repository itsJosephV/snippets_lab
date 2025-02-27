"use server";
import {Prisma} from "@prisma/client";

import {auth} from "@/lib/auth";
import db from "@/lib/db";

type CollectionWithFolders = Prisma.CollectionGetPayload<{
  include: {folders: true};
}>;

export async function getCollections(): Promise<CollectionWithFolders[]> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("You must be signed in to get collections.");
    }

    const collections = await db.collection.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        folders: true,
      },
    });

    return collections;
  } catch (error) {
    throw new Error(typeof error === "string" ? error : "Failed to fetch collections");
  }
}
