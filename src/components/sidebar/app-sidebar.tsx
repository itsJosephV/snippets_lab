"use client";
import type {CollectionWithFolders} from "@/types";

import {Star, FolderCode, Pin, PinIcon, Library} from "lucide-react";
import {useQuery} from "@tanstack/react-query";

import CreateCollectionForm from "../forms/create-collection-form";

import Collections from "./collections";
import AllSnippetsButton from "./all-snippets-btn";

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {getCollections} from "@/lib/db/data/get_collections";

enum SidebarTab {
  Collections = "collections",
  Tags = "tags",
}

export function AppSidebar() {
  const {data: collections} = useQuery({
    queryKey: ["collections"],
    queryFn: getCollections,
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
                <SidebarMenuItem>
                  {/* <SidebarMenuButton className="pl-3" tooltip="test">
                    <FolderCode />
                    <span>All Snippets</span>
                  </SidebarMenuButton> */}
                  <AllSnippetsButton />
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="pl-3" tooltip="test">
                    <Star />
                    <span>Favorites</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel className="flex items-center gap-1">
                <Library className="relative" />
                Libraries
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
