"use server";

import {Collection, Folder} from "@prisma/client";

import {auth} from "@/lib/auth";
import db from "@/lib/db";

export async function draftCollection(): Promise<Collection & {folders: Folder[]}> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const collection = await db.collection.findFirst({
      where: {
        userId: session.user.id,
        name: "virtual folders",
      },
      include: {
        folders: true,
      },
    });

    if (!collection) {
      throw new Error("No Collection found");
    }

    return collection;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Error retrieving Collection");
  }
}
