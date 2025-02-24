import Link from "next/link";
import {ArrowRight} from "lucide-react";

import {buttonVariants} from "../ui/button";
import {SignOut} from "../sign-out";
import {Avatar, AvatarFallback, AvatarImage} from "../ui/avatar";

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

  if (session?.user) {
    return (
      <div className="flex items-center rounded-md bg-green-800 p-1">
        <Avatar>
          <AvatarImage alt="user-profile-github-image" src={session.user.image as string} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <SignOut />
      </div>
    );
  }
}
