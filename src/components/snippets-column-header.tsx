"use server";

import {FolderAndSnippets} from "./snippets-panel";

async function SnippetsColumnHeader({folder}: {folder: FolderAndSnippets}) {
  const {name: folderName} = folder;

  return (
    <div className="ml-2 flex flex-1">
      <p className="text-sm">{folderName}</p>
    </div>
  );
}

export default SnippetsColumnHeader;
