"use server";
import {revalidatePath} from "next/cache";

import {auth} from "@/lib/auth";
import db from "@/lib/db";
import {languageTemplateFn} from "@/lib/languages";
import {Language} from "@/types";

const DEFAULT_LANGUAGE = Language["TYPESCRIPT"];

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
    const descriptionDraft: string = description || "";

    const newSnippet = await db.snippet.create({
      data: {
        title: title,
        language: languageDraft,
        description: description || "",
        folder: {
          connect: {
            id: folderId,
          },
        },
        content: languageTemplateFn(title, descriptionDraft, languageDraft),
        isFavorite: false,
      },
    });

    return {success: true, snippet: newSnippet};
  } catch (error) {
    throw new Error(error as string);
  } finally {
    revalidatePath("/dashboard");
  }
}
