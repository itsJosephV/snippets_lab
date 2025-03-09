"use server";

import {revalidatePath} from "next/cache";

import {auth} from "@/lib/auth";
import db from "@/lib/db";

export async function createCollection({collection}: {collection: string}) {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      throw new Error("Unauthorized");
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
        isDefault: false,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    return {success: true};
  } catch (error) {
    throw new Error(error as string);
  }
}
