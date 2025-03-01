"use server";
import React from "react";

import SnippetCard from "./snippet-card";

import {cn} from "@/lib/utils";
import {getSnippets} from "@/lib/db/actions/snippets/get-snippets";
async function SnippetsLits({folderId}: {folderId: string}) {
  const snippets = await getSnippets({folderId});

  return (
    <ul
      className={cn(
        "flex flex-col gap-3 overflow-y-scroll p-2",
        "h-[calc(100vh-var(--snippets-header-height))]",
      )}
    >
      {snippets &&
        snippets.map((snippet) => {
          return <SnippetCard key={snippet.id} snippet={snippet} />;
        })}
    </ul>
  );
}

export default SnippetsLits;
