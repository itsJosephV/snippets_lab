"use server";

import {auth} from "@/lib/auth";
import db from "@/lib/db";

export async function createFolder({folder, collectionId}: {folder: string; collectionId: string}) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    // Verificar si el collectionId existe
    const collection = await db.collection.findUnique({
      where: {id: collectionId},
    });

    if (!collection) {
      throw new Error("Collection not found");
    }

    // Crear el folder
    await db.folder.create({
      data: {
        name: folder,
        collectionId: collectionId,
      },
    });

    return {success: true};
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(typeof error === "string" ? error : "Failed to create folder");
  }
}
