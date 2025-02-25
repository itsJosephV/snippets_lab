"use server";

import {signIn, signOut} from "@/lib/auth";

export const signOutAction = async () => {
  await signOut();
};

export async function signInAction(callbackUrl: string) {
  await signIn("github", {
    callbackUrl: callbackUrl || "/dashboard",
  });
}
