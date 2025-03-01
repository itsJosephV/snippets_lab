import {Search} from "lucide-react";
import {Suspense} from "react";

import {SidebarTrigger} from "./ui/sidebar";
import {Input} from "./ui/input";
import {Separator} from "./ui/separator";
import Settings from "./settings";
import {ModeToggle} from "./theme-toggle";
import {ScrollArea} from "./ui/scroll-area";
import SnippetsLits from "./snippets-list";
import SnippetsColumnHeader from "./snippets-column-header";
import {Skeleton} from "./ui/skeleton";
import SnippetsPanelContainer from "./snippets-panel-container";
import {CreateSnippetForm} from "./forms/create-snippet-form";

import {cn} from "@/lib/utils";

function SnippetsPanel({folderId}: {folderId: string}) {
  return (
    <SnippetsPanelContainer>
      <header>
        <div className="border-border flex items-center border-b p-2">
          <SidebarTrigger />
          <Suspense key={folderId} fallback={<SnippetColumnHeaderSk />}>
            <SnippetsColumnHeader folderId={folderId} />
          </Suspense>
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
      <ScrollArea>
        <Suspense key={folderId} fallback={<SnippetCardSkeleton />}>
          <SnippetsLits folderId={folderId} />
        </Suspense>
      </ScrollArea>
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
