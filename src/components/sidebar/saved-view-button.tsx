import React from "react";
import {FolderCode, Star} from "lucide-react";
import {usePathname, useSearchParams} from "next/navigation";
import {SavedView, ViewType} from "@prisma/client";

import {SidebarMenuButton} from "../ui/sidebar";

import {useSnippet} from "@/context/useSnippetContext";

// const createUrl = (pathname: string, params: URLSearchParams) => {
//   const paramsString = params.toString();
//   const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

//   return `${pathname}${queryString}`;
// };

function SavedViewButton({view}: {view: SavedView}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {clearEditor} = useSnippet();

  const handleViewClick = () => {
    const viewId = searchParams.get("viewId");

    if (viewId === view.id) {
      return;
    }

    const newParams = new URLSearchParams();

    newParams.set("viewId", view.id);

    const newUrl = `${pathname}?${newParams.toString()}`;

    history.pushState(null, "", newUrl);

    clearEditor();
  };

  return (
    <SidebarMenuButton className="pl-3" tooltip="test" onClick={handleViewClick}>
      {view.type === "ALL" && <FolderCode />}
      {view.type === "FAVORITES" && <Star />}
      <span>{view.name}</span>
    </SidebarMenuButton>
  );
}

export default SavedViewButton;
