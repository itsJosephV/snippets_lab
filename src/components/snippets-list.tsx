"use client";

import React from "react";

import SnippetCard from "./snippet-card";

import {cn} from "@/lib/utils";
import {useOptimisticContext} from "@/context/useOptimisticContext";

function SnippetsLits() {
  const {optimisticData} = useOptimisticContext();

  return (
    <ul
      className={cn(
        "flex flex-col gap-3 overflow-y-scroll p-2",
        "h-[calc(100vh-var(--snippets-header-height))]",
      )}
    >
      {optimisticData.map((snippet) => {
        return <SnippetCard key={snippet.id} snippet={snippet} />;
      })}
    </ul>
  );
}

export default SnippetsLits;
