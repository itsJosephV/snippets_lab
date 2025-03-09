"use client";
import type {Snippet} from "@prisma/client";

import {Bird, Lock} from "lucide-react";

import {useSnippet} from "@/context/useSnippetContext";
import {capitalize, cn} from "@/lib/utils";
import {useLockerSP} from "@/hooks/use-locker";

function SnippetCard({snippet, folderName}: {snippet: Snippet; folderName: string}) {
  const {setSelectedSnippet, selectedSnippet} = useSnippet();

  const isLocked = useLockerSP();

  const handleSnippetSelection = () => {
    if (selectedSnippet?.id === snippet.id) {
      return;
    }
    setSelectedSnippet(snippet);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li
      key={snippet.id}
      className={cn(
        "hover:bg-muted-foreground/10 border-border rounded-sm border p-3 transition-colors",
        {
          "pointer-events-none": isLocked,
          "bg-muted-foreground/10": selectedSnippet?.id === snippet.id,
        },
      )}
      onClick={handleSnippetSelection}
    >
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-base font-medium tracking-tight">{capitalize(snippet.title)}</h2>
        <div className="flex items-center gap-1">
          <div className="bg-primary-foreground text-muted-foreground flex items-center rounded-md p-1 text-xs text-nowrap capitalize">
            {snippet.language}
          </div>
          {snippet.isLocked && <Lock className="text-muted-foreground" size={12} />}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-muted-foreground text-sm">{capitalize(snippet.description as string)}</p>
      </div>
      {
        //TODO: DRAWER EDITOR
      }
      {/* <DrawerEditor /> */}
      {
        //TODO: TAGS
      }
      {/* <div className="mt-3 flex gap-1.5">
        {tags(snippet.id).map((tag) => (
          <div
            key={tag.id}
            className="text-primary-background bg-primary-foreground rounded-sm p-0.5 px-1 text-xs"
            // onClick={(e) => {
            //   e.stopPropagation();
            //   console.log(tag.name);
            // }}
          >
            {tag.name}
          </div>
        ))}
      </div> */}
      <div className="text-muted-foreground mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm">
          <Bird size={16} /> {capitalize(folderName)}
        </div>
        <div className="text-sm">
          <time suppressHydrationWarning>{snippet.createdAt.toLocaleDateString()}</time>
        </div>
      </div>
    </li>
  );
}

export default SnippetCard;
