"use server";

import {revalidatePath} from "next/cache";

import {auth} from "@/lib/auth";
import db from "@/lib/db";
import {Language} from "@/types";

export async function updateSnippetLanguage(snippetId: string, language: Language) {
  try {
    const user = await auth();

    if (!user) {
      throw new Error("User is not authenticated");
    }

    const snippet = await db.snippet.update({
      where: {
        id: snippetId,
      },
      data: {
        language,
      },
    });

    return snippet;
  } catch (error) {
    throw new Error(`Failed to update snippet language: ${error as string}`);
  } finally {
    revalidatePath("/dashboard");
  }
}
