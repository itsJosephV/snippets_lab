import Link from "next/link";
import React from "react";

import UserButton from "./auth/user-btn";
import {ModeToggle} from "./theme-toggle";

import {cn} from "@/lib/utils";

async function Header() {
  return (
    <nav className="sticky top-0 z-20 flex w-full border-b leading-[4rem]">
      <div className={cn("flex w-full items-center justify-between", "container")}>
        <div className="flex items-center">
          <Link className="font-mono font-semibold" href="/">
            snippets_lab
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <UserButton />
        </div>
      </div>
    </nav>
  );
}

export default Header;
