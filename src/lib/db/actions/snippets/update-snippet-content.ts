"use server";
import {revalidatePath} from "next/cache";

import {auth} from "@/lib/auth";
import db from "@/lib/db";

export async function updateSnippetContent({
  snippetId,
  newContent,
  newUpdateDate,
}: {
  snippetId: string;
  newContent: string;
  newUpdateDate: Date;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const snippet = await db.snippet.findUnique({
    where: {id: snippetId},
    include: {
      folder: {
        include: {
          collection: {
            select: {userId: true},
          },
        },
      },
    },
  });

  if (!snippet || snippet.folder.collection.userId !== session.user.id) {
    throw new Error("Snippet not found or unauthorized");
  }

  const updatedSnippet = await db.snippet.update({
    where: {id: snippetId},
    data: {content: newContent, updatedAt: newUpdateDate},
  });

  revalidatePath("/dashboard");

  return updatedSnippet;
}
