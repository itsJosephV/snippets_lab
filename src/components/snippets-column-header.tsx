"use server";
import React from "react";

import {getFolderByFolderId} from "@/lib/colletions-mock-data/retrieving-functions";

async function SnippetsColumnHeader({folderId}: {folderId: string}) {
  const folder = await getFolderByFolderId(folderId);

  return (
    <div className="ml-2 flex flex-1">
      <p className="text-sm">{folder?.name}</p>
    </div>
  );
}

export default SnippetsColumnHeader;
