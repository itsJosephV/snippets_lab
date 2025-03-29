"use server";
import type {FolderAndSnippets} from "@/types";
import type {Prisma} from "@prisma/client";

import {auth} from "@/lib/auth";
import db from "@/lib/db";

const snippetInclude = {
  folder: {
    select: {
      collection: {
        select: {
          name: true,
        },
      },
    },
  },
};

const getQueryOptions = (
  folderType: string,
  baseConditions: Prisma.SnippetWhereInput,
  folderFilters: Prisma.SnippetWhereInput,
  folderId: string,
): {
  where: Prisma.SnippetWhereInput;
  orderBy: Prisma.SnippetOrderByWithRelationInput;
} => {
  switch (folderType) {
    case "ALL":
      return {
        where: baseConditions,
        orderBy: {createdAt: "desc"},
      };
    case "FAVORITES":
      return {
        where: {...baseConditions, ...folderFilters},
        orderBy: {updatedAt: "desc"},
      };
    default:
      return {
        where: {folderId},
        orderBy: {createdAt: "desc"},
      };
  }
};

export async function getFolderAndSnippets({
  folderId,
}: {
  folderId: string;
}): Promise<FolderAndSnippets | null> {
  try {
    if (!folderId || typeof folderId !== "string") {
      throw new Error("Invalid folder ID");
    }

    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) throw new Error("Unauthorized");

    const baseConditions: Prisma.SnippetWhereInput = {
      folder: {
        collection: {
          userId,
        },
      },
    };

    const folderSelected = await db.folder.findFirst({
      where: {
        id: folderId,
        collection: {userId},
      },
      include: {
        collection: {select: {name: true}},
      },
    });

    if (!folderSelected) return null;

    const {where, orderBy} = getQueryOptions(
      folderSelected.type,
      baseConditions,
      folderSelected.filters as Prisma.SnippetWhereInput,
      folderId,
    );

    const snippets = await db.snippet.findMany({
      where,
      include: snippetInclude,
      orderBy,
    });

    return {...folderSelected, snippets};
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}
