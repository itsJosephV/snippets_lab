"use server";

import {auth} from "@/lib/auth";
import db from "@/lib/db";

export async function createCollection({collection}: {collection: string}) {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      throw new Error("You must be signed in to create a collection.");
    }

    const existingCollection = await db.collection.findFirst({
      where: {
        name: collection,
        userId: session.user.id,
      },
    });

    if (existingCollection) {
      throw new Error("Collection already exists.");
    }

    await db.collection.create({
      data: {
        name: collection,
        userId: session.user.id,
        isDefault: false,
      },
    });

    return {success: true};
  } catch (error) {
    throw new Error(error as string);
  }
}
