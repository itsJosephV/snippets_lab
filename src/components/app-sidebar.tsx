import {Star, FolderCode} from "lucide-react";
import {Suspense} from "react";
import {Collection, Folder} from "@prisma/client";

import CreateCollectionForm from "./forms/create-collection-form";
import Collections from "./collections";

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

enum SidebarTab {
  Collections = "collections",
  Tags = "tags",
}

type CollectionWithFolders = (Collection & {folders: Folder[]})[];

export function AppSidebar({collections}: {collections: CollectionWithFolders}) {
  const defaultTab = SidebarTab.Collections;

  return (
    <Sidebar
      style={{
        paddingTop: "var(--layout-header-height)",
      }}
    >
      <Tabs defaultValue={defaultTab}>
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
          {/**--COLLECTIONS TAB-- */}
          <TabsContent value={defaultTab}>
            <SidebarGroup>
              <SidebarGroupLabel>Favorites</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton className="pl-3" tooltip="test">
                    <FolderCode />
                    <span>All Snippets</span>
                  </SidebarMenuButton>
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
              <SidebarGroupLabel>Sections</SidebarGroupLabel>
              {/* <Suspense fallback={<CollectionsSkeleton />}> */}
              <Collections initialCollections={collections} />
              {/* </Suspense> */}
            </SidebarGroup>
          </TabsContent>
          {/**--TAGS TAB-- */}
          <TabsContent value={SidebarTab.Tags}>
            <SidebarGroup>TAGS HERE</SidebarGroup>
          </TabsContent>
        </SidebarContent>
        <SidebarRail />
      </Tabs>
    </Sidebar>
  );
}

function CollectionsSkeleton() {
  return <div>loading..</div>;
}
