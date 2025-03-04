import Link from "next/link";
import React from "react";

import UserButton from "./auth/user-btn";
import {ModeToggle} from "./theme-toggle";

import {cn} from "@/lib/utils";

async function Header() {
  const AppName = "Snippets_lab";

  return (
    <nav className="bg-background relative z-20 flex w-full border-b leading-[4rem]">
      <div className={cn("flex w-full items-center justify-between px-3")}>
        <div className="flex items-center">
          <Link className="font-mono font-semibold" href="/">
            🧪 {AppName}
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
