import {AppSidebar} from "@/components/app-sidebar";
import EditorColumn from "@/components/editor-column";
import SnippetsColumn from "@/components/snippets-column";
import {ResizableHandle, ResizablePanelGroup} from "@/components/ui/resizable";
// import {auth} from "@/lib/auth";

async function DashboardPage() {
  // const session = await auth();

  return (
    <>
      <AppSidebar />
      <ResizablePanelGroup direction="horizontal">
        <SnippetsColumn />
        <ResizableHandle className="hidden lg:block" />
        <EditorColumn />
      </ResizablePanelGroup>
    </>
  );
}

export default DashboardPage;
