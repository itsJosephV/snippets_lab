"use client";
import type {CollectionWithFolders} from "@/types";

import {Pin, Library} from "lucide-react";
import {useQuery} from "@tanstack/react-query";

import CreateCollectionForm from "../forms/create-collection-form";

import Collections from "./collections";
import SavedViewButton from "./saved-view-button";

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
} from "@/components/ui/sidebar";
import {getCollections} from "@/lib/db/data/get_collections";
import {getAllViews} from "@/lib/db/data/get_all_views";

enum SidebarTab {
  Collections = "collections",
  Tags = "tags",
}

export function AppSidebar() {
  const {data: collections} = useQuery({
    queryKey: ["collections"],
    queryFn: getCollections,
  });

  const {data: savedViews} = useQuery({
    queryKey: ["savedViews"],
    queryFn: getAllViews,
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
            <SidebarGroup>
              <SidebarGroupLabel className="flex items-center gap-1">
                <Pin />
                Pinned folders
              </SidebarGroupLabel>
              <SidebarMenu>
                {savedViews?.map((view) => {
                  return <SavedViewButton key={view.id} view={view} />;
                })}
              </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel className="flex items-center gap-1">
                <Library className="relative" />
                Collections
              </SidebarGroupLabel>
              <Collections initialCollections={collections as CollectionWithFolders[]} />
            </SidebarGroup>
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
