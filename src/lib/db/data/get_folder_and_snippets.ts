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
      return null;
    }

    const folderAndSnippets = await db.folder.findFirst({
      where: {
        // folder: {
        //   id: folderId,
        //   collection: {
        //     userId: session.user.id,
        //   },
        // },
        id: folderId,
      },
      include: {
        snippets: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return folderAndSnippets;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error retrieving folder and snippets:", error);

    return null;
  }
};
