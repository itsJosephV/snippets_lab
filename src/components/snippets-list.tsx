"use server";
import type {Folder, Snippet} from "@prisma/client";

import React from "react";

import SnippetCard from "./snippet-card";

import {cn} from "@/lib/utils";

type FolderAndSnippets = Folder & {snippets: Snippet[]};
async function SnippetsLits({folder}: {folder: FolderAndSnippets}) {
  return (
    <ul
      className={cn(
        "flex flex-col gap-3 overflow-y-scroll p-2",
        "h-[calc(100vh-var(--snippets-header-height))]",
      )}
    >
      {folder &&
        folder.snippets.map((snippet) => {
          return <SnippetCard key={snippet.id} snippet={snippet} />;
        })}
    </ul>
  );
}

export default SnippetsLits;
