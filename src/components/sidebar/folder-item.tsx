"use client";

import {usePathname, useSearchParams} from "next/navigation";
import {FolderCode} from "lucide-react";

import {SidebarMenuSubItem, SidebarMenuSubButton} from "../ui/sidebar";

import {useSnippet} from "@/context/useSnippetContext";
import {cn} from "@/lib/utils";

interface FolderItemProps {
  id: string;
  name: string;
  description: string | null;
  collectionId: string;
}

function FolderItem({folder}: {folder: FolderItemProps}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {clearEditor} = useSnippet();

  const handleFolderClick = () => {
    const currentFolderId = searchParams.get("folderId");

    if (currentFolderId === folder.id) {
      return;
    }

    const newParams = new URLSearchParams();

    newParams.set("folderId", folder.id);

    const newUrl = `${pathname}?${newParams.toString()}`;

    history.pushState(null, "", newUrl);
    clearEditor();
  };

  return (
    <SidebarMenuSubItem onClick={handleFolderClick}>
      <SidebarMenuSubButton
        className={cn({
          "bg-muted": searchParams.get("folderId") === folder.id,
        })}
      >
        <FolderCode />
        {folder.name}
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}

export default FolderItem;
