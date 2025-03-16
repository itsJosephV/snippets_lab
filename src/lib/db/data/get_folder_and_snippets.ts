"use server";

import {auth} from "@/lib/auth";
import db from "@/lib/db";

export const getFolderAndSnippetsById = async ({folderId}: {folderId: string}) => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    if (!folderId || typeof folderId !== "string") {
      throw new Error("Invalid folder ID");
    }

    const folderAndSnippets = await db.folder.findFirst({
      where: {
        id: folderId,
      },
      include: {
        collection: {
          select: {
            name: true,
          },
        },
        snippets: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return folderAndSnippets;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error retrieving folder and snippets",
    );
  }
};
