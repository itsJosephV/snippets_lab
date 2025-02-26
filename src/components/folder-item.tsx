"use client";
import React from "react";
import {useRouter} from "next/navigation";
import {usePathname, useSearchParams} from "next/navigation";

import {SidebarMenuSubItem, SidebarMenuSubButton} from "./ui/sidebar";

import {Folder} from "@/types";

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

  const folderSearchParams = new URLSearchParams(searchParams.toString());

  folderSearchParams.set("folderId", folder.id);

  const folderURL = createUrl(pathname, folderSearchParams);

  //const { setCurrentSnippet } = useSnippetsContext();

  return (
    <SidebarMenuSubItem onClick={() => router.push(folderURL)}>
      <SidebarMenuSubButton asChild>
        <span>{folder.name}</span>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}

export default FolderItem;
