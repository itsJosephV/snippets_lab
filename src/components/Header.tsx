import Link from "next/link";
import React from "react";
import {Star} from "lucide-react";

import UserButton from "./auth/user-btn";

import {cn} from "@/lib/utils";

async function Header() {
  return (
    <nav className="sticky top-0 z-20 flex w-full border-b bg-blue-800 text-xl leading-[4rem] font-bold">
      <div className={cn("flex w-full items-center justify-between", "container")}>
        <div className="flex items-center">
          <Link className="text-red-300" href="/">
            snippets_lab
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Star />
          <Star />
          <Star />
          <UserButton />
        </div>
      </div>
    </nav>
  );
}

export default Header;
