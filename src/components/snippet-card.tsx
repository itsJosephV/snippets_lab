"use client";
import type {Snippet} from "@prisma/client";

import React from "react";
import {Bird} from "lucide-react";

import {useSnippet} from "@/context/useSnippetContext";

type SnippetCardProps = {
  snippet: Snippet & {folder: {collection: {name: string}}};
};

function SnippetCard({snippet}: SnippetCardProps) {
  const {setSelectedSnippet} = useSnippet();

  const {name: collectionName} = snippet.folder.collection;

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li
      key={snippet.id}
      className="hover:bg-muted-foreground/10 border-border rounded-sm border p-2 transition-colors"
      onClick={() => setSelectedSnippet(snippet)}
    >
      <h2 className="text-base font-medium tracking-tight capitalize">{snippet.title}</h2>
      <div className="mt-1">
        <p className="text-muted-foreground text-sm">{snippet.description}</p>
      </div>
      {/* <DrawerEditor /> */}
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
      <div className="text-muted-foreground mt-3 flex items-center gap-1 text-sm capitalize">
        <Bird size={18} /> {collectionName}
      </div>
    </li>
  );
}

export default SnippetCard;
