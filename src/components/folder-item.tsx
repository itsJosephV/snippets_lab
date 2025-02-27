"use client";

import React from "react";
import {useRouter, usePathname, useSearchParams} from "next/navigation";

import {SidebarMenuSubItem, SidebarMenuSubButton} from "./ui/sidebar";

import {Folder} from "@/types";
import {useSnippet} from "@/context/useSnippetContext";

type FolderItemProps = {
  folder: Folder;
};

const createUrl = (pathname: string, params: URLSearchParams) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

function FolderItem({folder}: FolderItemProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {setSelectedSnippet} = useSnippet();

  const handleFolderClick = () => {
    const currentFolderId = searchParams.get("folderId");

    if (currentFolderId === folder.id) {
      return;
    }
    const updatedSearchParams = new URLSearchParams(searchParams.toString());

    updatedSearchParams.set("folderId", folder.id);
    const newUrl = createUrl(pathname, updatedSearchParams);

    setSelectedSnippet(null);
    router.push(newUrl);
  };

  return (
    <SidebarMenuSubItem onClick={handleFolderClick}>
      <SidebarMenuSubButton asChild>
        <span>{folder.name}</span>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}

export default FolderItem;
