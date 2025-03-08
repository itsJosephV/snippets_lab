"use client";

import {usePathname, useSearchParams} from "next/navigation";

import {SidebarMenuSubItem, SidebarMenuSubButton} from "../ui/sidebar";

import {useSnippet} from "@/context/useSnippetContext";
import {cn} from "@/lib/utils";

interface FolderItemProps {
  id: string;
  name: string;
  description: string | null;
  collectionId: string;
}

const createUrl = (pathname: string, params: URLSearchParams) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

function FolderItem({folder}: {folder: FolderItemProps}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {setSelectedSnippet} = useSnippet();

  const handleFolderClick = () => {
    const currentFolderId = searchParams.get("folderId");

    if (currentFolderId === folder.id) {
      return;
    }
    const updatedSearchParams = new URLSearchParams(searchParams.toString());

    updatedSearchParams.set("folderId", folder.id as string);
    const newUrl = createUrl(pathname, updatedSearchParams);

    setSelectedSnippet(null);

    history.pushState(null, "", newUrl);
  };

  return (
    <SidebarMenuSubItem onClick={handleFolderClick}>
      <SidebarMenuSubButton asChild>
        <span
          className={cn({
            "bg-muted": searchParams.get("folderId") === folder.id,
          })}
        >
          {folder.name}
        </span>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}

export default FolderItem;
