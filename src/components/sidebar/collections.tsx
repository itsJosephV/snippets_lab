"use client";
import type {CollectionWithFolders} from "@/types";

import React from "react";
import {ChevronRight, MoreHorizontal, Plus} from "lucide-react";
import {useQuery} from "@tanstack/react-query";
import {useSearchParams} from "next/navigation";

import {
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../ui/sidebar";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "../ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {CreateFolderForm} from "../forms/create-folder-form";

import {DeleteCollectionButton} from "./delete-collection-btn";
import FolderItem from "./folder-item";

import {getCollections} from "@/lib/db/data/get_collections";
import {cn} from "@/lib/utils";

function Collections({initialCollections}: {initialCollections: CollectionWithFolders[]}) {
  const params = useSearchParams();

  const folderId = params.get("folderId");
  const collectionId = params.get("collectionId");

  const {data: collectionsRQ} = useQuery({
    queryKey: ["collections"],
    queryFn: getCollections,
    initialData: initialCollections,
  });

  const hasFolder = (collection: CollectionWithFolders) => {
    return collection.folders.some((folder) => folder.id === folderId);
  };

  return (
    <SidebarMenu className="">
      {collectionsRQ.map((collection) => (
        <Collapsible
          key={collection.id}
          asChild
          className="group/collapsible"
          defaultOpen={collectionId === collection.id}
        >
          <SidebarMenuItem className="">
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                className={cn("", {
                  "bg-muted": hasFolder(collection) || collection.id === collectionId,
                })}
                tooltip={collection.name}
              >
                <ChevronRight className="size-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                <span>{collection.name}</span>
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {collection.folders.length ? (
                  collection.folders.map((folder) => <FolderItem key={folder.id} folder={folder} />)
                ) : (
                  <SidebarMenuSubItem>
                    <CreateFolderForm
                      collectionId={collection.id}
                      renderTrigger={({openDialog}) => (
                        <SidebarMenuSubButton
                          className="text-muted-foreground [&>svg]:text-muted-foreground"
                          onClick={(e) => {
                            e.preventDefault();
                            openDialog();
                          }}
                        >
                          <Plus />
                          Create folder
                        </SidebarMenuSubButton>
                      )}
                    />
                  </SidebarMenuSubItem>
                )}
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
                <CreateFolderForm
                  collectionId={collection.id}
                  renderTrigger={({openDialog}) => (
                    <DropdownMenuItem
                      onSelect={(e) => {
                        e.preventDefault();
                        openDialog();
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Plus className="text-muted-foreground" />
                        <span>Create folder</span>
                      </div>
                    </DropdownMenuItem>
                  )}
                />
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
