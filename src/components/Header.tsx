import Link from "next/link";
import React from "react";

import {SignOut} from "./sign-out";

import {auth} from "@/lib/auth";

async function Header() {
  const session = await auth();

  return (
    <header className="flex items-center justify-between border-b text-xl leading-[4rem] font-bold">
      <Link href="/">snippets_lab</Link>
      {session ? <SignOut /> : <p>Dashboard</p>}
    </header>
  );
}

export default Header;
