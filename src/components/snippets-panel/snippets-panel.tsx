"use client";
import React from "react";
import {FolderOpen, MousePointerClick, Search} from "lucide-react";
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
import ResizablePanelBP from "./resizable-panel-bp";

import {cn} from "@/lib/utils";
import {getFolderAndSnippets} from "@/lib/db/data/get_draft_folder_and_snippets";

function SnippetsPanel() {
  const params = useSearchParams();

  const folderId = params.get("folderId") as string;

  const panelHeight = "h-[calc(100vh-var(--snippets-header-height))]";

  const {
    data,
    isLoading,
    // error: allSnippetsError,
  } = useQuery({
    queryKey: ["folder", folderId],
    queryFn: () => getFolderAndSnippets({folderId}),
    enabled: !!folderId,
  });

  const renderContent = () => {
    //TODO: IMRPOVE THIS CONDITION
    if (!folderId) {
      return (
        <div className={cn("text-muted-foreground grid place-items-center", panelHeight)}>
          <div className="flex flex-col items-center gap-2">
            <MousePointerClick className="size-18" />
            <div className="text-center">
              <p>Select or create a new folder</p>
            </div>
          </div>
        </div>
      );
    }

    if (isLoading) return <SnippetCardSkeleton />;

    if (data?.snippets?.length) {
      return (
        <ScrollArea className={panelHeight}>
          <SnippetsLits folder={data} />
        </ScrollArea>
      );
    }

    return (
      <div className={cn("text-muted-foreground grid place-items-center", panelHeight)}>
        <div className="flex flex-col items-center gap-2">
          <FolderOpen className="size-18" />
          <div className="text-center">
            <p>Folder is empty</p>
            <p>Add new snippets</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <ResizablePanelBP>
      <header>
        <div className="border-border flex items-center border-b p-2">
          <SidebarTrigger />
          <div className="ml-2 flex flex-1">
            {isLoading ? (
              <SnippetColumnHeaderSk />
            ) : (
              <p
                className={cn("text-sm", {
                  "text-muted-foreground": !data,
                })}
              >
                {data?.name || "No folder selected"}
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
          <Input className="pl-8" disabled={!data} placeholder="Search for a snippet..." />
        </div>
      </header>
      {renderContent()}
    </ResizablePanelBP>
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
