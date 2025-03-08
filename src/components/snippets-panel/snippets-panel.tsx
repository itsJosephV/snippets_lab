"use client";
import {Folder, Snippet} from "@prisma/client";
import React from "react";
import {Search} from "lucide-react";
import {useQuery} from "@tanstack/react-query";
import {useSearchParams} from "next/navigation";

import {SidebarTrigger} from "../ui/sidebar";
import Settings from "../editor-panel/settings";
import {ModeToggle} from "../layout/theme-toggle";
import {Separator} from "../ui/separator";
import {ScrollArea} from "../ui/scroll-area";
import {Input} from "../ui/input";
import {CreateSnippetForm} from "../forms/create-snippet-form";
import {Skeleton} from "../ui/skeleton";

import SnippetsLits from "./snippets-list";
import SnippetsPanelContainer from "./snippets-panel-container";

import {getFolderAndSnippetsById} from "@/lib/db/data/get_folder_and_snippets";
import {cn} from "@/lib/utils";

export type FolderAndSnippets = Folder & {snippets: Snippet[]};

function SnippetsPanel() {
  const params = useSearchParams();

  const folderId = params.get("folderId") as string;

  const {
    data: folder,
    isLoading,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error,
  } = useQuery({
    queryKey: ["folder", folderId],
    queryFn: () => getFolderAndSnippetsById({folderId}),
    enabled: !!folderId,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <SnippetsPanelContainer>
      <header>
        <div className="border-border flex items-center border-b p-2">
          <SidebarTrigger />
          <div className="ml-2 flex flex-1">
            {isLoading ? (
              <SnippetColumnHeaderSk />
            ) : (
              <p
                className={cn("text-sm", {
                  "text-muted-foreground": !folder,
                })}
              >
                {folder?.name ?? "No folder selected"}
              </p>
            )}
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
      {isLoading ? (
        <SnippetCardSkeleton />
      ) : (
        <ScrollArea>{folder && <SnippetsLits folder={folder} />}</ScrollArea>
      )}
    </SnippetsPanelContainer>
  );
}

export default SnippetsPanel;

function SnippetCardSkeleton() {
  return (
    <ul
      className={cn(
        "flex flex-col gap-3 overflow-y-scroll p-2",
        "h-[calc(100vh-var(--snippets-header-height))]",
      )}
    >
      {Array.from({length: 6}).map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <Skeleton key={`skeleton-${i}`} className="h-[100px] w-full" />
      ))}
    </ul>
  );
}

function SnippetColumnHeaderSk() {
  return (
    <div className="ml-2 flex flex-1">
      <Skeleton className="h-[20px] w-[120px] rounded-md" />
    </div>
  );
}
