"use server";

import {SavedView} from "@prisma/client";

import {auth} from "@/lib/auth";
import db from "@/lib/db";

export async function getAllViews(): Promise<SavedView[]> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const savedViews = await db.savedView.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return savedViews;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Error retrieving views");
  }
}
