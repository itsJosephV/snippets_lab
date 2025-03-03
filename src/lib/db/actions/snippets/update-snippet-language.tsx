"use server";

import {revalidatePath} from "next/cache";

import {auth} from "@/lib/auth";
import db from "@/lib/db";
import {Language} from "@/types";

export async function updateSnippetLanguage(snippetId: string, language: Language) {
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

  revalidatePath("/dashboard");

  return snippet;
}
