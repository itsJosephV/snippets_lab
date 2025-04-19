"use client";

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

enum SidebarTab {
  Collections = "collections",
  Tags = "tags",
}

export function AppSidebar() {
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
        <SidebarContent>
          {/**--COLLECTIONS-- */}
          <TabsContent value={defaultTab}>
            <DraftFolders />
            <Collections />
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
