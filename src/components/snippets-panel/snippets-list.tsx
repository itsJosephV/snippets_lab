import type {FolderAndSnippets} from "@/types";

import React from "react";

import SnippetCard from "./snippet-card";

// import {FolderWithSnippets} from "@/types";

function SnippetsLits({folder}: {folder: FolderAndSnippets}) {
  return (
    <ul className="space-y-3 p-2">
      {folder?.snippets.map((snippet) => {
        return <SnippetCard key={snippet.id} snippet={snippet} />;
      })}
    </ul>
  );
}

export default SnippetsLits;
