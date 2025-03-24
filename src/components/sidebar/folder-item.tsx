"use client";
import type {Folder} from "@prisma/client";

import {useSearchParams} from "next/navigation";
import {FolderCode} from "lucide-react";

import {SidebarMenuSubItem, SidebarMenuSubButton} from "../ui/sidebar";

import {useSnippet} from "@/context/useSnippetContext";
import {cn} from "@/lib/utils";

function FolderItem({folder}: {folder: Folder}) {
  const searchParams = useSearchParams();
  const folderId = searchParams.get("folderId");
  const {handleFolderClick} = useSnippet();

  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton
        className={cn({
          "bg-muted": folderId === folder.id,
        })}
        onClick={() => handleFolderClick(folder, "folderId")}
      >
        <FolderCode />
        {folder.name}
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}

export default FolderItem;
