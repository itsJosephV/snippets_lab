"use server";
import {revalidatePath} from "next/cache";

import {auth} from "@/lib/auth";
import db from "@/lib/db";

export async function createSnippet({
  title,
  language,
  folderId,
}: {
  title: string;
  language: string;
  folderId: string;
}) {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      throw new Error("You must be signed in to create a snippet.");
    }

    const existingSnippet = await db.snippet.findFirst({
      where: {
        title: title,
        folderId,
      },
    });

    if (existingSnippet) {
      throw new Error("Snippet already exists.");
    }

    await db.snippet.create({
      data: {
        title: title,
        language: language,
        folder: {
          connect: {
            id: folderId,
          },
        },
        content: `hello world`,
        isFavorite: false,
      },
    });

    revalidatePath("/dashboard");

    return {success: true};
  } catch (error) {
    throw new Error(error as string);
  }
}
