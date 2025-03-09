"use server";

import {auth} from "@/lib/auth";
import db from "@/lib/db";

export async function updateSnippetLock({
  snippetId,
  isLocked,
}: {
  snippetId: string;
  isLocked: boolean;
}) {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      throw new Error("Unauthorized");
    }

    const snippet = await db.snippet.findUnique({
      where: {
        id: snippetId,
      },
    });

    if (!snippet) {
      throw new Error("Snippet not found");
    }

    const response = await db.snippet.update({
      where: {
        id: snippetId,
      },
      data: {
        isLocked,
      },
    });

    return response;
  } catch (error) {
    throw new Error(error as string);
  }
}
