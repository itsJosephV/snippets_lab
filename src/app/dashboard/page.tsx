import {dehydrate, HydrationBoundary} from "@tanstack/react-query";

import {AppSidebar} from "@/components/sidebar/app-sidebar";
import EditorColumn from "@/components/editor-panel/editor-column";
import SnippetsPanel from "@/components/snippets-panel/snippets-panel";
import {ResizableHandle, ResizablePanelGroup} from "@/components/ui/resizable";
import {SidebarProvider} from "@/components/ui/sidebar";
import {getCollections} from "@/lib/db/data/get_collections";
import {getQueryClient} from "@/lib/get-query-client";
import {draftCollection} from "@/lib/db/data/get_all_views";
// import {getAllViews} from "@/lib/db/data/get_all_views";

async function DashboardPage() {
  const queryClient = getQueryClient();

  await Promise.all([
    await queryClient.prefetchQuery({
      queryKey: ["collections"],
      queryFn: getCollections,
    }),
    queryClient.prefetchQuery({
      queryKey: ["draft"],
      queryFn: draftCollection,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SidebarProvider>
        <AppSidebar />
        <ResizablePanelGroup direction="horizontal">
          <SnippetsPanel />
          <ResizableHandle className="hidden lg:block" />
          <EditorColumn />
        </ResizablePanelGroup>
      </SidebarProvider>
    </HydrationBoundary>
  );
}

export default DashboardPage;
