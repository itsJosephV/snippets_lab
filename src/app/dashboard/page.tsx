import {AppSidebar} from "@/components/sidebar/app-sidebar";
import EditorColumn from "@/components/editor-panel/editor-column";
import SnippetsPanel from "@/components/snippets-panel/snippets-panel";
import {ResizableHandle, ResizablePanelGroup} from "@/components/ui/resizable";
import {SidebarProvider} from "@/components/ui/sidebar";
import {getCollections} from "@/lib/db/data/get_collections";

interface SearchParams {
  folderId: string;
}

async function DashboardPage({searchParams}: {searchParams: Promise<SearchParams>}) {
  const {folderId} = await searchParams;
  const collections = await getCollections();

  return (
    <SidebarProvider>
      <AppSidebar collections={collections} />
      <ResizablePanelGroup direction="horizontal">
        <SnippetsPanel folderId={folderId} />
        <ResizableHandle className="hidden lg:block" />
        <EditorColumn />
      </ResizablePanelGroup>
    </SidebarProvider>
  );
}

export default DashboardPage;
