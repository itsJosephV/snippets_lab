"use server";
import {Snippet} from "@prisma/client";

import {auth} from "@/lib/auth";
import db from "@/lib/db";

export async function updateSnippetContent({
  snippetId,
  newContent,
}: {
  snippetId: string;
  newContent: string;
}): Promise<Snippet> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const snippet = await db.snippet.findUnique({
      where: {id: snippetId},
    });

    if (!snippet) {
      throw new Error("Snippet not found or unauthorized");
    }

    const updatedSnippet = await db.snippet.update({
      where: {id: snippetId},
      data: {
        content: newContent,
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
    });

    return updatedSnippet;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Error updating snippet content");
  }
}
