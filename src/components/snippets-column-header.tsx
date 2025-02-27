"use server";

import {getFolderTitle} from "@/lib/db/actions/folders/get-folder-title";

async function SnippetsColumnHeader({folderId}: {folderId: string}) {
  const folderTitle = await getFolderTitle(folderId);

  return (
    <div className="ml-2 flex flex-1">
      <p className="text-sm">{folderTitle}</p>
    </div>
  );
}

export default SnippetsColumnHeader;
