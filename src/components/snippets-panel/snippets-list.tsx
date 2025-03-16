import React from "react";

import SnippetCard from "./snippet-card";
import {FolderAndSnippets} from "./snippets-panel";

import {cn} from "@/lib/utils";

function SnippetsLits({folder}: {folder: FolderAndSnippets}) {
  return (
    <ul
      className={cn(
        "flex flex-col gap-3 overflow-y-scroll p-2",
        "h-[calc(100vh-var(--snippets-header-height))]",
      )}
    >
      {folder?.snippets.map((snippet) => {
        const collectionName = folder?.collection.name;

        return <SnippetCard key={snippet.id} collectionName={collectionName} snippet={snippet} />;
      })}
    </ul>
  );
}

export default SnippetsLits;
