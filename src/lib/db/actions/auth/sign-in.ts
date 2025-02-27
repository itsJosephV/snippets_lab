"use server";

import {signIn} from "@/lib/auth";

export async function signInAction(callbackUrl: string) {
  await signIn("github", {
    callbackUrl: callbackUrl || "/dashboard",
  });
}
