"use client";
import React from "react";
import {ChevronRight, MoreHorizontal} from "lucide-react";
import {Collection, Folder} from "@prisma/client";
import {useQuery} from "@tanstack/react-query";

import {
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "../ui/sidebar";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "../ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {CreateFolderForm} from "../forms/create-folder-form";

import {DeleteCollectionButton} from "./delete-collection-btn";
import FolderItem from "./folder-item";

import {getCollections} from "@/lib/db/data/get_collections";

// import {getCollections} from "@/lib/db/data/get_collections";

type CollectionWithFolders = (Collection & {folders: Folder[]})[];

function Collections({initialCollections}: {initialCollections: CollectionWithFolders}) {
  // const collections: CollectionWithFolders = await getCollections();

  const {data: collectionsRQ} = useQuery({
    queryKey: ["collections"],
    queryFn: getCollections,
    // staleTime: 1000 * 60 * 5,
    initialData: initialCollections,
  });

  return (
    <SidebarMenu>
      {collectionsRQ.map((collection) => (
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
