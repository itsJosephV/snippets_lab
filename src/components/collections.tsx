"use server";
import React from "react";
import {ChevronRight, Folder, Forward, MoreHorizontal, Trash2} from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "./ui/sidebar";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "./ui/collapsible";
import FolderItem from "./folder-item";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {CreateFolderForm} from "./forms/create-folder-form";

import {
  // getCollectionByUserId,
  getFoldersByCollectionId,
} from "@/lib/colletions-mock-data/retrieving-functions";
// import {users} from "@/lib/colletions-mock-data/mock-data-users";
// import {auth} from "@/lib/auth";
import {getCollections} from "@/lib/db/actions/collections/get-collectionts";

async function Collections() {
  const collections = await getCollections();
  // const user = users[0];
  // const mockUserId = user.id;
  // const getUserCollections = await getCollectionByUserId(mockUserId);

  const folders = (folderId: string) => getFoldersByCollectionId(folderId);

  return (
    <SidebarMenu>
      {collections?.map((collection) => (
        <Collapsible
          key={collection.id}
          asChild
          className="group/collapsible"
          defaultOpen={collection.isDefault}
        >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip={collection.name}>
                <ChevronRight className="size-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                <span>{collection.name}</span>
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {folders(collection.id)?.map((folder) => (
                  <FolderItem key={folder.id} folder={folder} />
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 rounded-lg sm:w-56" side="right">
                {/* <Folder className="text-muted-foreground" />
                  <span>Create folder</span> */}
                <CreateFolderForm collectionId={collection.id} />
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="text-muted-foreground" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </Collapsible>
      ))}
    </SidebarMenu>
  );
}

export default Collections;
