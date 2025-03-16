import React from "react";
import {FolderCode} from "lucide-react";
import {usePathname, useSearchParams} from "next/navigation";

import {SidebarMenuButton} from "../ui/sidebar";

import {useSnippet} from "@/context/useSnippetContext";

const createUrl = (pathname: string, params: URLSearchParams) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

function AllSnippetsButton() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {setSelectedSnippet} = useSnippet();

  const handleClick = () => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());

    updatedSearchParams.set("folderId", "all-snippets");
    const newUrl = createUrl(pathname, updatedSearchParams);

    setSelectedSnippet(null);
    history.pushState(null, "", newUrl);
  };

  return (
    <SidebarMenuButton className="pl-3" tooltip="test" onClick={handleClick}>
      <FolderCode />
      <span>All Snippets</span>
    </SidebarMenuButton>
  );
}

export default AllSnippetsButton;
