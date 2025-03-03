"use server";
import React from "react";
import {ChevronRight, MoreHorizontal} from "lucide-react";
import {Collection, Folder} from "@prisma/client";

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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {CreateFolderForm} from "./forms/create-folder-form";
import {DeleteCollectionButton} from "./delete-collection-btn";

import {getUserCollections} from "@/lib/db/data/user_collections";

type CollectionWithFolders = (Collection & {folders: Folder[]})[];

async function Collections() {
  const collections: CollectionWithFolders = await getUserCollections();

  return (
    <SidebarMenu>
      {collections.map((collection) => (
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
                {collection.folders.map((folder) => (
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
                <CreateFolderForm collectionId={collection.id} />
                <DropdownMenuSeparator />
                <DeleteCollectionButton collectionId={collection.id} />
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </Collapsible>
      ))}
    </SidebarMenu>
  );
}

export default Collections;
