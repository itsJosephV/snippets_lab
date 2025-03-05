"use server";
import React from "react";
import {Search} from "lucide-react";

import {SidebarTrigger} from "./ui/sidebar";
import Settings from "./settings";
import {ModeToggle} from "./theme-toggle";
import SnippetsLits from "./snippets-list";
import {Separator} from "./ui/separator";
import {ScrollArea} from "./ui/scroll-area";
import SnippetsColumnHeader from "./snippets-column-header";
import {Input} from "./ui/input";
import {CreateSnippetForm} from "./forms/create-snippet-form";

import {getFolderAndSnippetsById} from "@/lib/db/data/get_folder_and_snippets";

async function Draftcomponent({folderId}: {folderId: string}) {
  const folder = await getFolderAndSnippetsById({folderId});

  return (
    <>
      <header>
        <div className="border-border flex items-center border-b p-2">
          <SidebarTrigger />
          {folder && <SnippetsColumnHeader folder={folder} />}

          <div className="flex h-full lg:block">
            <div className="space-x-1.5 lg:hidden">
              <Settings />
              <ModeToggle />
            </div>
            <div className="py-1 lg:hidden">
              <Separator className="mx-2" orientation="vertical" />
            </div>
            <CreateSnippetForm folderId={folderId} />
          </div>
        </div>
        <div className="border-border relative border-b p-2">
          <Search className="text-muted-foreground absolute top-1/2 left-5 h-4 w-4 -translate-y-1/2" />
          <Input className="pl-8" placeholder="Search for a snippet..." />
        </div>
      </header>
      <ScrollArea>{folder && <SnippetsLits folder={folder} />}</ScrollArea>
    </>
  );
}

export default Draftcomponent;
