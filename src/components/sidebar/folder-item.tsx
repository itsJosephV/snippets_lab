"use client";
import type {Folder} from "@prisma/client";

import {useSearchParams} from "next/navigation";
import {FolderCode} from "lucide-react";

import {SidebarMenuSubItem, SidebarMenuSubButton} from "../ui/sidebar";

import {useSnippet} from "@/context/useSnippetContext";
import {cn} from "@/lib/utils";
import {useLockerSP} from "@/hooks/use-locker";

function FolderItem({folder}: {folder: Folder}) {
  const searchParams = useSearchParams();
  const folderId = searchParams.get("folderId");
  const {handleFolderClick} = useSnippet();

  const isLocked = useLockerSP();

  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton
        className={cn({
          "bg-muted": folderId === folder.id,
          "pointer-events-none": isLocked,
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
