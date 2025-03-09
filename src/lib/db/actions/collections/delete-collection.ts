"use server";
import {revalidatePath} from "next/cache";

import {auth} from "@/lib/auth";
import db from "@/lib/db";

export async function deleteCollection({collectionId}: {collectionId: string}) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    if (!collectionId || typeof collectionId !== "string") {
      return null;
    }

    const collection = await db.collection.findFirst({
      where: {
        id: collectionId,
        userId: session.user.id,
      },
    });

    if (!collection) {
      return null;
    }

    await db.collection.delete({
      where: {
        id: collectionId,
      },
    });

    return collection;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error deleting collection:", error);

    return null;
  }
}
