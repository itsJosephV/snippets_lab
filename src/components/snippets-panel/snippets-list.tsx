import React from "react";
import {Folder, Snippet} from "@prisma/client";

import SnippetCard from "./snippet-card";

import {cn} from "@/lib/utils";
// import {useOptimisticContext} from "@/context/useOptimisticContext";

function SnippetsLits({folder}: {folder: Folder & {snippets: Snippet[]}}) {
  return (
    <ul
      className={cn(
        "flex flex-col gap-3 overflow-y-scroll p-2",
        "h-[calc(100vh-var(--snippets-header-height))]",
      )}
    >
      {folder?.snippets.map((snippet) => {
        return <SnippetCard key={snippet.id} snippet={snippet} />;
      })}
    </ul>
  );
}

export default SnippetsLits;
