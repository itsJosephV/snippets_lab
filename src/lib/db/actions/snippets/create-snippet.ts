"use server";

import {auth} from "@/lib/auth";
import db from "@/lib/db";
import {Language} from "@/types";
import {languageTemplateFn} from "@/lib/languages/language-helpers";

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
      throw new Error("Unauthorized");
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

    return newSnippet;
  } catch (error) {
    throw new Error(error as string);
  }
}
