"use client";
import type {CollectionWithFolders} from "@/types";

import {useQuery} from "@tanstack/react-query";
import {Collection, Folder} from "@prisma/client";

import CreateCollectionForm from "../forms/create-collection-form";

import Collections from "./collections";
import DraftFolders from "./draft-folders";

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {getCollections} from "@/lib/db/data/get_collections";
import {draftCollection} from "@/lib/db/data/get_all_views";

enum SidebarTab {
  Collections = "collections",
  Tags = "tags",
}

export function AppSidebar() {
  const {data: collections} = useQuery({
    queryKey: ["collections"],
    queryFn: getCollections,
  });

  const {data: draft} = useQuery({
    queryKey: ["draft"],
    queryFn: draftCollection,
  });

  const defaultTab = SidebarTab.Collections;

  return (
    <Sidebar
      style={{
        paddingTop: "var(--layout-header-height)",
      }}
    >
      <Tabs className="h-full" defaultValue={defaultTab}>
        <SidebarHeader className="border-b">
          <div className="flex gap-1.5">
            <TabsList className="grid flex-1 grid-cols-2">
              <TabsTrigger value={defaultTab}>Collections</TabsTrigger>
              <TabsTrigger disabled value={SidebarTab.Tags}>
                Tags
              </TabsTrigger>
            </TabsList>
            <CreateCollectionForm />
          </div>
        </SidebarHeader>
        <SidebarContent className="">
          {/**--COLLECTIONS-- */}
          <TabsContent value={defaultTab}>
            {/* <SidebarGroup>
              <SidebarGroupLabel className="flex items-center gap-1">
                <Pin />
                Pinned folders
              </SidebarGroupLabel>
              <SidebarMenu>
                {draft?.folders?.map((view) => {
                  return <SavedViewButton key={view.id} view={view} />;
                })}
              </SidebarMenu>
            </SidebarGroup> */}
            <DraftFolders draft={draft as Collection & {folders: Folder[]}} />
            <Collections initialCollections={collections as CollectionWithFolders[]} />
          </TabsContent>
          {/**--TAGS-- */}
          <TabsContent value={SidebarTab.Tags}>
            <SidebarGroup>TAGS HERE</SidebarGroup>
          </TabsContent>
        </SidebarContent>
        <SidebarRail />
      </Tabs>
    </Sidebar>
  );
}

{
  /* <AllSnippetsButton /> */
}
