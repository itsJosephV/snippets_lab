"use client";
import React from "react";
import {FolderCode, Star} from "lucide-react";
import {useSearchParams} from "next/navigation";
import {Folder} from "@prisma/client";

import {SidebarMenuButton, SidebarMenuSubItem} from "../ui/sidebar";

import {useSnippet} from "@/context/useSnippetContext";
import {cn} from "@/lib/utils";

function DraftFolderBtn({folder}: {folder: Folder}) {
  const searchParams = useSearchParams();
  const folderId = searchParams.get("folderId");

  const {handleFolderClick} = useSnippet();

  return (
    <SidebarMenuSubItem>
      <SidebarMenuButton
        className={cn({
          "bg-muted": folderId === folder.id,
        })}
        onClick={() => handleFolderClick(folder, "folderId", true)}
      >
        {folder.type === "ALL" && <FolderCode />}
        {folder.type === "FAVORITES" && <Star />}
        {folder.name}
      </SidebarMenuButton>
    </SidebarMenuSubItem>
  );
}

export default DraftFolderBtn;
