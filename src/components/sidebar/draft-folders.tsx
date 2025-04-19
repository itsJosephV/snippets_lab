import React from "react";
import {Pin} from "lucide-react";
import {useQuery} from "@tanstack/react-query";

import {SidebarGroup, SidebarGroupLabel, SidebarMenu} from "../ui/sidebar";

import DraftFolderBtn from "./draft-folder-btn";

import {draftCollection} from "@/lib/db/data/get_all_views";

function DraftFolders() {
  const {data: collectionDraft} = useQuery({
    queryKey: ["draft"],
    queryFn: draftCollection,
  });

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="flex items-center gap-1">
        <Pin />
        Pinned folders
      </SidebarGroupLabel>
      <SidebarMenu>
        {collectionDraft?.folders?.map((folder) => {
          return <DraftFolderBtn key={folder.id} folder={folder} />;
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

export default DraftFolders;
