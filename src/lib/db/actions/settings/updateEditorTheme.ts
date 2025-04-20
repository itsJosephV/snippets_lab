"use server";
import {auth} from "@/lib/auth";
import db from "@/lib/db";

export async function updateEditorTheme(theme: string) {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      throw new Error("Unauthorized");
    }

    const currentUser = await db.user.findUnique({
      where: {id: session.user.id},
      select: {settings: true},
    });

    const userUpdate = await db.user.update({
      where: {id: session.user.id},
      data: {
        settings: {
          ...(currentUser?.settings as object),
          editorTheme: theme,
        },
      },
    });

    return userUpdate.settings;
  } catch (error) {
    console.error("Failed to update theme:", error);
    throw error;
  }
}
