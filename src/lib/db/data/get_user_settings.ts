"use server";

import {auth} from "@/lib/auth";
import db from "@/lib/db";
import {UserSettings} from "@/types";

export async function getUserSettings(): Promise<UserSettings> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const user = await db.user.findFirst({
      where: {
        id: session.user.id,
      },
    });

    const settings = user?.settings as unknown as UserSettings;

    return settings;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Error retrieving user settings");
  }
}
