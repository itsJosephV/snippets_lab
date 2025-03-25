"use server";
import type {FolderAndSnippets} from "@/types";

import {auth} from "@/lib/auth";
import db from "@/lib/db";

export async function getDraftFolderAndSnippets({
  draftId,
  // type,
}: {
  draftId: string;
}): Promise<FolderAndSnippets | null> {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const baseConditions = {
      folder: {
        collection: {
          userId,
        },
      },
    };

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const draftFolderSelected = await db.folder.findFirst({
      where: {
        id: draftId,
        // type: type,
      },
      include: {
        collection: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!draftFolderSelected) {
      return null;
    }

    const folderType = draftFolderSelected.type;
    const folderFilters = draftFolderSelected.filters as object;

    const getSnippetsQuery = async () => {
      switch (folderType) {
        case "ALL":
          return db.snippet.findMany({
            where: baseConditions,
            include: {
              folder: {
                select: {
                  name: true,
                  collection: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
            orderBy: {
              createdAt: "desc",
            },
          });
        case "FAVORITES":
          return db.snippet.findMany({
            where: {
              ...baseConditions,
              ...folderFilters,
            },
            include: {
              folder: {
                select: {
                  name: true,
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
        default:
          throw new Error("Invalid view id");
      }
    };

    const snippets = await getSnippetsQuery();

    return {
      ...draftFolderSelected,
      snippets,
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}
