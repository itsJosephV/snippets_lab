"use client";
import {useActionState} from "react";
import {Loader} from "lucide-react";

import {Github} from "./ui/github";

import {Button} from "@/components/ui/button";
import {signInAction} from "@/lib/actions";

function GithubSignIn() {
  const [error, action, isPending] = useActionState(signInAction, null);

  return (
    <form action={action}>
      <Button className="w-full">
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
