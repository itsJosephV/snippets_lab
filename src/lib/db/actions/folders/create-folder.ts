"use server";

import {revalidatePath} from "next/cache";

import {auth} from "@/lib/auth";
import db from "@/lib/db";

export async function createFolder({folder, collectionId}: {folder: string; collectionId: string}) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const existingFolder = await db.folder.findFirst({
      where: {
        name: folder,
        collectionId,
      },
    });

    if (existingFolder) {
      throw new Error("A folder with this name already exists in the collection");
    }

    const newFolder = await db.folder.create({
      data: {
        name: folder,
        collection: {
          connect: {
            id: collectionId,
          },
        },
      },
    });

    return newFolder;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Database Error:", error);
    throw new Error(typeof error === "string" ? error : "Failed to create folder");
  }
}
