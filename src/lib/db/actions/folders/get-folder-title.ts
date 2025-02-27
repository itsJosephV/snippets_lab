"use server";
import {auth} from "@/lib/auth";
import db from "@/lib/db";

export async function getFolderTitle(folderId: string) {
  try {
    // 0. Validar folderId
    if (!folderId || typeof folderId !== "string") {
      return null;
    }

    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const folder = await db.folder.findFirst({
      where: {
        id: folderId,
        collection: {
          userId: session.user.id,
        },
      },
    });

    if (!folder) {
      return "folder not found";
    }

    return folder.name;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error retrieving folder title:", error);

    return null;
  }
}
