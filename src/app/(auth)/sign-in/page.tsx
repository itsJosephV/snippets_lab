import Link from "next/link";
import React from "react";
import {redirect} from "next/navigation";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {auth, signIn} from "@/lib/auth";
// import {executeAction} from "@/db/executeAction";
import {GithubSignIn} from "@/components/github-sign-in";

async function SignInPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <div className="mx-auto w-full max-w-sm space-y-6">
      <h1 className="mb-6 text-center text-2xl font-bold">Sign In</h1>

      <GithubSignIn />

      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-background text-muted-foreground px-2">Or continue with email</span>
        </div>
      </div> */}

      {/* Email/Password Sign In */}
      {/* <form
        action={async (formData: FormData) => {
          "use server";
          await executeAction({
            actionFn: async () => {
              await signIn("credentials", formData);
            },
          });
        }}
        className="space-y-4"
      >
        <Input required autoComplete="email" name="email" placeholder="Email" type="email" />
        <Input
          required
          autoComplete="current-password"
          name="password"
          placeholder="Password"
          type="password"
        />
        <Button className="w-full" type="submit">
          Sign In
        </Button>
      </form> */}

      {/* <div className="text-center">
        <Button asChild variant="link">
          <Link href="/sign-up">Don&apos;t have an account? Sign up</Link>
        </Button>
      </div> */}
    </div>
  );
}

export default SignInPage;
