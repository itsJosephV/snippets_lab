"use server";

import {auth} from "@/lib/auth";
import db from "@/lib/db";
import {Language} from "@/types";

export async function updateSnippetLanguage(snippetId: string, language: Language) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const snippet = await db.snippet.update({
      where: {
        id: snippetId,
      },
      data: {
        language,
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

    return snippet;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Error updating snippet language");
  }
}
