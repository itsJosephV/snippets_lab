"use server";
import type {FolderAndSnippets} from "@/types";

import {auth} from "@/lib/auth";
import db from "@/lib/db";

export async function getViewAndSnippets({
  viewId,
}: {
  viewId: string;
}): Promise<FolderAndSnippets | null> {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const baseConditions = {
      folder: {
        collection: {
          userId: userId,
        },
      },
    };

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const viewSelected = await db.savedView.findUnique({
      where: {
        id: viewId,
      },
    });

    const viewType = viewSelected?.type;
    const viewFilters = viewSelected?.filters as object;

    const getSnippetsQuery = () => {
      switch (viewType) {
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
              ...viewFilters,
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

    const folder = {
      id: viewSelected?.id as string,
      name: viewSelected?.name as string,
      description: `virtual folder for ${viewSelected?.name}`,
      createdAt: viewSelected?.createdAt as Date,
      updatedAt: viewSelected?.updatedAt as Date,
      collectionId: crypto.randomUUID(),
      isDefault: false,
      collection: {
        name: viewSelected?.name as string,
      },
      snippets: snippets,
    };

    return folder;
  } catch (error) {
    throw new Error(error as string);
  }
}
