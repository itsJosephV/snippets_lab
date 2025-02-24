import React from "react";
import {FlaskConical} from "lucide-react";

import {GithubSignIn} from "@/components/github-sign-in";

function AuthSignInPage() {
  return (
    <>
      <div className="animate-in fade-in-15 slide-in-from-bottom-3 mx-auto mt-20 flex w-full max-w-sm flex-col items-center space-y-6 rounded-md border p-6 duration-300">
        <div className="rounded-md border border-green-900 bg-green-950 p-1.5 text-green-300">
          <FlaskConical />
        </div>
        <h1 className="mb-6 text-center text-2xl font-bold">Sign in</h1>
        <GithubSignIn />
      </div>
      <footer className="fixed bottom-0 flex w-full justify-center border-t p-4">
        <div>this is a footer homepage</div>
      </footer>
    </>
  );
}

export default AuthSignInPage;
