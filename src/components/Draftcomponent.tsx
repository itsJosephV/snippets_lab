"use server";
import React from "react";
import {Search} from "lucide-react";

import {SidebarTrigger} from "./ui/sidebar";
import Settings from "./settings";
import {ModeToggle} from "./theme-toggle";
import SnippetsLits from "./snippets-list";
import {Separator} from "./ui/separator";
import {ScrollArea} from "./ui/scroll-area";
import {Input} from "./ui/input";
import {CreateSnippetForm} from "./forms/create-snippet-form";

import {getFolderAndSnippetsById} from "@/lib/db/data/get_folder_and_snippets";
import {OptimisticProvider} from "@/context/OptimisticContext";
import {cn} from "@/lib/utils";

async function Draftcomponent({folderId}: {folderId: string}) {
  const folder = await getFolderAndSnippetsById({folderId});

  return (
    <OptimisticProvider initialData={folder?.snippets || []}>
      <header>
        <div className="border-border flex items-center border-b p-2">
          <SidebarTrigger />
          <div className="ml-2 flex flex-1">
            <p
              className={cn("text-sm", {
                "text-muted-foreground": !folder,
              })}
            >
              {folder?.name ?? "No folder selected"}
            </p>
          </div>
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
          <Input className="pl-8" disabled={!folder} placeholder="Search for a snippet..." />
        </div>
      </header>
      <ScrollArea>{folder && <SnippetsLits />}</ScrollArea>
    </OptimisticProvider>
  );
}

export default Draftcomponent;
