"use server";

import {unstable_cache} from "next/cache";

import {auth} from "@/lib/auth";
import db from "@/lib/db";

export const getSnippets = async ({folderId}: {folderId: string}) => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    if (!folderId || typeof folderId !== "string") {
      return null;
    }

    const snippets = await db.snippet.findMany({
      where: {
        folder: {
          id: folderId,
          collection: {
            userId: session.user.id,
          },
        },
      },
      include: {
        folder: {
          select: {
            collection: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return snippets;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error retrieving snippets:", error);

    return null;
  }
};
