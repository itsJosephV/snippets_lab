import Link from "next/link";
import {ArrowRight} from "lucide-react";

import {buttonVariants} from "../../ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "../../ui/avatar";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../../ui/dropdown-menu";
import {SignOut} from "../sign-out";
import EditorTheme from "../editor-theme";
import DefaultLanguage from "../default-language";

import {auth} from "@/lib/auth";

export default async function UserButton() {
  const session = await auth();

  if (!session?.user) {
    return (
      <Link
        className={buttonVariants({
          variant: "outline",
          className: "group",
        })}
        href="/dashboard"
      >
        <span>Get Started</span>
        <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-[2px]" />
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={buttonVariants({
          variant: "ghost",
          size: "icon",
          className: "cursor-pointer",
        })}
        name={session.user.name ?? "User Menu"}
      >
        {session.user.name && (
          <Avatar className="size-8">
            <AvatarImage alt={session.user.name} src={String(session.user.image)} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent forceMount align="end" className="">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1.5">
            <p className="text-sm leading-none font-medium">{session.user.name}</p>
            <p className="text-muted-foreground text-xs leading-none">{session.user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DefaultLanguage />
        <EditorTheme />
        <SignOut />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
