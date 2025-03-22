import React from "react";

import SnippetCard from "./snippet-card";
import {FolderAndSnippets} from "./snippets-panel";

function SnippetsLits({folder}: {folder: FolderAndSnippets}) {
  return (
    <ul className="space-y-3 p-2">
      {folder?.snippets.map((snippet) => {
        const collectionName = folder?.collection.name;

        return <SnippetCard key={snippet.id} collectionName={collectionName} snippet={snippet} />;
      })}
    </ul>
  );
}

export default SnippetsLits;
