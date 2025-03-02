"use server";

import {getFolderTitle} from "@/lib/db/data/get_folder_title";

async function SnippetsColumnHeader({folderId}: {folderId: string}) {
  const folderTitle = await getFolderTitle(folderId);

  return (
    <div className="ml-2 flex flex-1">
      <p className="text-sm">{folderTitle}</p>
    </div>
  );
}

export default SnippetsColumnHeader;
