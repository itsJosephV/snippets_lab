"use client";
import {LogOutIcon} from "lucide-react";
import {toast} from "sonner";

import {DropdownMenuItem} from "../ui/dropdown-menu";

import {signOutAction} from "@/lib/db/actions/auth/sign-out";

export function SignOut() {
  const handleSignOut = async () => {
    toast.promise(signOutAction, {
      loading: "Signing out...",
      error: "error",
    });
  };

  return (
    <DropdownMenuItem onClick={handleSignOut}>
      <LogOutIcon size={15} />
      <span>Log Out</span>
    </DropdownMenuItem>
  );
}
