"use client";
import {signOut} from "next-auth/react";

import {Button} from "@/components/ui/button";

function SignOut() {
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <Button size="default" variant="destructive" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
}

export {SignOut};
