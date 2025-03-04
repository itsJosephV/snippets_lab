"use server";
import {revalidatePath} from "next/cache";

import {auth} from "@/lib/auth";
import db from "@/lib/db";
import {languageTemplateFn} from "@/lib/languages";
import {Language} from "@/types";

//TODO: THIS WILL BE PART OF THE USER SETTINGS
const DEFAULT_LANGUAGE = Language["TYPESCRIPT"];

export async function createSnippet({
  title,
  description,
  folderId,
}: {
  title: string;
  description: string;
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
        language: DEFAULT_LANGUAGE,
        description: description,
        folder: {
          connect: {
            id: folderId,
          },
        },
        content: languageTemplateFn(title, description, DEFAULT_LANGUAGE),
        isFavorite: false,
      },
    });

    revalidatePath("/dashboard");

    return {success: true};
  } catch (error) {
    throw new Error(error as string);
  }
}
