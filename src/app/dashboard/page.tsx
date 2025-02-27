import {Suspense} from "react";

import {AppSidebar} from "@/components/app-sidebar";
import EditorColumn from "@/components/editor-column";
import SnippetsColumn from "@/components/snippets-column";
import {ResizableHandle, ResizablePanelGroup} from "@/components/ui/resizable";

interface SearchParams {
  folderId: string;
}

async function DashboardPage({searchParams}: {searchParams: Promise<SearchParams>}) {
  const {folderId} = await searchParams;

  return (
    <>
      <AppSidebar />
      <ResizablePanelGroup direction="horizontal">
        <SnippetsColumn folderId={folderId} />
        <ResizableHandle className="hidden lg:block" />
        <EditorColumn />
      </ResizablePanelGroup>
    </>
  );
}

export default DashboardPage;
