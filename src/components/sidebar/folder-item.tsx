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
  const {setSelectedSnippet, setCursorPosition} = useSnippet();

  const handleFolderClick = () => {
    const currentFolderId = searchParams.get("folderId");

    if (currentFolderId === folder.id) {
      return;
    }

    const updatedSearchParams = new URLSearchParams(searchParams.toString());

    updatedSearchParams.delete("collectionId");
    updatedSearchParams.set("folderId", folder.id);

    const newUrl = `${pathname}?${updatedSearchParams.toString()}`;

    setSelectedSnippet(null);
    setCursorPosition({ln: 0, col: 0});

    history.pushState(null, "", newUrl);
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
