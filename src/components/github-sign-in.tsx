import {Github} from "./ui/github";

import {Button} from "@/components/ui/button";
import {signIn} from "@/lib/auth";

function GithubSignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <Button className="w-full" variant="outline">
        <Github />
        Continue with GitHub
      </Button>
    </form>
  );
}

export {GithubSignIn};
