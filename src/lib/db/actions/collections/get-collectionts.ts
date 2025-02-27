"use server";

import {auth} from "@/lib/auth";
import db from "@/lib/db";

export async function getCollections() {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      throw new Error("You must be signed in to get collections.");
    }

    const collections = await db.collection.findMany({
      where: {
        userId: session.user.id,
      },
    });

    return collections;
  } catch (error) {
    throw new Error(error as string);
  }
}
