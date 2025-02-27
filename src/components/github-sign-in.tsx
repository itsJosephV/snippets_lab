"use client";
import {useActionState} from "react";
import {Loader} from "lucide-react";
import {useSearchParams} from "next/navigation";

import {Github} from "./ui/github";

import {Button} from "@/components/ui/button";
import {signInAction} from "@/lib/db/actions/auth/sign-in";

function GithubSignIn() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [error, action, isPending] = useActionState(() => signInAction(callbackUrl), null);

  return (
    <form action={action}>
      <Button size="sm">
        {isPending ? (
          <>
            <Loader className="animate-spin" />
            Signing in...
          </>
        ) : (
          <>
            <Github />
            Sign in with GitHub
          </>
        )}
      </Button>
    </form>
  );
}

export {GithubSignIn};
