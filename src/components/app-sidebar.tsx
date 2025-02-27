import {Star, FolderCode} from "lucide-react";
import {Suspense} from "react";

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

export function AppSidebar() {
  return (
    <Sidebar
      style={{
        paddingTop: "var(--layout-header-height)",
      }}
    >
      <Tabs defaultValue="test1">
        <SidebarHeader className="border-b">
          <div className="flex gap-1.5">
            <TabsList className="grid flex-1 grid-cols-2">
              <TabsTrigger value="test1">Collections</TabsTrigger>
              <TabsTrigger value="test2">Tags</TabsTrigger>
            </TabsList>
            <CreateCollectionForm />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <TabsContent value="test1">
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
            {/**---- */}
            {/**---- */}
            {/**---- */}
            <SidebarGroup>
              <SidebarGroupLabel>Sections</SidebarGroupLabel>
              <Suspense fallback={<CollectionsSkeleton />}>
                <Collections />
              </Suspense>
            </SidebarGroup>
            {/**---- */}
            {/**---- */}
            {/**---- */}
          </TabsContent>
          <TabsContent value="test2">
            <SidebarGroup>testing02</SidebarGroup>
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
