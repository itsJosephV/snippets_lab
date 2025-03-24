"use client";
import React from "react";
import {FolderCode, Star} from "lucide-react";
import {SavedView} from "@prisma/client";
import {useSearchParams} from "next/navigation";

import {SidebarMenuButton, SidebarMenuSubItem} from "../ui/sidebar";

import {useSnippet} from "@/context/useSnippetContext";
import {cn} from "@/lib/utils";

function SavedViewButton({view}: {view: SavedView}) {
  const searchParams = useSearchParams();
  const viewId = searchParams.get("viewId");

  const {handleFolderClick} = useSnippet();

  return (
    <SidebarMenuSubItem>
      <SidebarMenuButton
        className={cn({
          "bg-muted": viewId === view.id,
        })}
        onClick={() => handleFolderClick(view, "viewId")}
      >
        {view.type === "ALL" && <FolderCode />}
        {view.type === "FAVORITES" && <Star />}
        {view.name}
      </SidebarMenuButton>
    </SidebarMenuSubItem>
  );
}

export default SavedViewButton;
