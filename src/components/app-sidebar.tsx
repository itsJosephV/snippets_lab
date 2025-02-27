import {
  Plus,
  Star,
  FolderCode,
  Folder,
  ChevronRight,
  MoreHorizontal,
  Forward,
  Trash2,
} from "lucide-react";

import {Button} from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {CollapsibleContent, CollapsibleTrigger} from "./ui/collapsible";
import FolderItem from "./folder-item";

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Collapsible} from "@/components/ui/collapsible";
import {
  getCollectionByUserId,
  getFoldersByCollectionId,
} from "@/lib/colletions-mock-data/retrieving-functions";
import {users} from "@/lib/colletions-mock-data/mock-data-users";

export function AppSidebar() {
  const user = users[0];
  const mockUserId = user.id;
  const getUserCollections = getCollectionByUserId(mockUserId);

  const folders = (folderId: string) => getFoldersByCollectionId(folderId);

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
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon" variant="secondary">
                  <Plus />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your account and
                    remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
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
              <SidebarMenu>
                {getUserCollections?.map((collection) => (
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
                        <DropdownMenuContent
                          align="start"
                          className="w-48 rounded-lg sm:w-56"
                          side="right"
                        >
                          <DropdownMenuItem>
                            <Folder className="text-muted-foreground" />
                            <span>View Project</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Forward className="text-muted-foreground" />
                            <span>Share Project</span>
                          </DropdownMenuItem>
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
