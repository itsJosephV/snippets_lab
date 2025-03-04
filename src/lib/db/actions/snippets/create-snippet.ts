"use server";
import {revalidatePath} from "next/cache";

import {auth} from "@/lib/auth";
import db from "@/lib/db";
import {languageTemplateFn} from "@/lib/languages";
import {Language} from "@/types";

const DEFAULT_LANGUAGE = Language["TYPESCRIPT"];
const DEFAULT_DESCRIPTION = "Add a description here";

export async function createSnippet({
  title,
  language,
  description,
  folderId,
}: {
  title: string;
  language: string;
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

    const languageDraft = (language as Language) || DEFAULT_LANGUAGE;
    const descriptionDraft: string = description || DEFAULT_DESCRIPTION;

    await db.snippet.create({
      data: {
        title: title,
        language: languageDraft,
        description: descriptionDraft,
        folder: {
          connect: {
            id: folderId,
          },
        },
        content: languageTemplateFn(title, descriptionDraft, languageDraft),
        isFavorite: false,
      },
    });

    revalidatePath("/dashboard");

    return {success: true};
  } catch (error) {
    throw new Error(error as string);
  }
}
