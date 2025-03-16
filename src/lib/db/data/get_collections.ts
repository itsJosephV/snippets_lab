"use server";

import type {CollectionWithFolders} from "@/types";

import {auth} from "@/lib/auth";
import db from "@/lib/db";

export async function getCollections(): Promise<CollectionWithFolders[]> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const collections = await db.collection.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        folders: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return collections;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Error retrieving collections");
  }
}
