"use server";
import {Folder, Snippet} from "@prisma/client";

import {auth} from "@/lib/auth";
import db from "@/lib/db";

export async function getAllSnippets({userId}: {userId: string}) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const snippets = await db.snippet.findMany({
      where: {
        folder: {
          collection: {
            userId: userId,
          },
        },
      },
      include: {
        folder: {
          include: {
            collection: true, // Useful for debugging or filtering
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // const allSnippetsFolder = {
    //   id: "all-snippets",
    //   name: "All Snippets",
    //   description: null,
    //   collectionId: "all",
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    //   snippets,
    // } satisfies Folder & {snippets: Snippet[]};

    // return snippets;

    return snippets;
  } catch (error) {
    throw new Error(error as string);
  }
}
