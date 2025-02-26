"use client";
import {Bird, Code, Plus, Search} from "lucide-react";
import useBreakpoint from "use-breakpoint";

// import DrawerEditor from "./drawer-editor";
import {SidebarTrigger} from "./ui/sidebar";
import {Input} from "./ui/input";
import {Button} from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {Separator} from "./ui/separator";
import Settings from "./settings";
import {ResizablePanel} from "./ui/resizable";
import {ModeToggle} from "./theme-toggle";
import {ScrollArea} from "./ui/scroll-area";

import {cn} from "@/lib/utils";
import {
  getSnippetsByFolderId,
  getTagsForSnippet,
} from "@/lib/colletions-mock-data/retrieving-functions";
import {useSnippet} from "@/context/useSnippetContext";
const BREAKPOINTS = {xl: 1280, xxl: 1536};

function SnippetsColumn() {
  const {breakpoint} = useBreakpoint(BREAKPOINTS);

  const draftBP = (bp: "xl" | "xxl" | null) => {
    switch (bp) {
      case "xl":
        return 25;
      case "xxl":
        return 20;
      default:
        return 35;
    }
  };

  /**
   * JAVASCRIPT FOLDER AS IF IT WAS PASSED RETRIEVED FROM THE SERVER?
   */
  const folderId = "f12a3b4c-5d6e-7890-fghi-jk0123456789";

  const snippets = getSnippetsByFolderId(folderId);
  const tags = (snippetId: string) => getTagsForSnippet(snippetId);

  const {setSelectedSnippet} = useSnippet();

  return (
    <ResizablePanel defaultSize={35} maxSize={50} minSize={draftBP(breakpoint)}>
      <section className="grid grid-rows-[auto_1fr]">
        <header>
          <div className="border-border flex items-center border-b p-2">
            <div className="flex flex-1 items-center gap-1">
              <SidebarTrigger />
              <p className="text-sm">Snippets Header</p>
            </div>
            <div className="flex h-full lg:block">
              <div className="space-x-1.5 lg:hidden">
                <Settings />
                <ModeToggle />
              </div>
              <div className="py-1 lg:hidden">
                <Separator className="mx-2" orientation="vertical" />
              </div>
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
          </div>
          <div className="border-border relative border-b p-2">
            <Search className="text-muted-foreground absolute top-1/2 left-5 h-4 w-4 -translate-y-1/2" />

            <Input className="pl-8" placeholder="Search for a snippet..." />
          </div>
        </header>
        <ScrollArea>
          <ul
            className={cn(
              "flex flex-col gap-3 overflow-y-scroll p-2",
              "h-[calc(100vh-var(--snippets-header-height))]",
            )}
          >
            {snippets.map((snippet) => {
              return (
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                <li
                  key={snippet.id}
                  className="hover:bg-muted-foreground/10 border-border rounded-sm border p-2 transition-colors"
                  onClick={() => setSelectedSnippet(snippet)}
                >
                  <h2 className="text-lg font-medium tracking-tight">{snippet.title}</h2>
                  <div className="mt-1">
                    <p className="text-muted-foreground text-sm">{snippet.description}</p>
                  </div>
                  {/* <DrawerEditor /> */}
                  <div className="mt-3 flex gap-1.5">
                    {tags(snippet.id).map((tag) => (
                      <div
                        key={tag.id}
                        className="text-primary-background bg-primary-foreground rounded-sm p-0.5 px-1 text-xs"
                      >
                        {tag.name}
                      </div>
                    ))}
                  </div>
                  <div className="text-muted-foreground mt-3 flex items-center gap-1 text-sm capitalize">
                    <Bird size={18} /> Collection Name
                  </div>
                </li>
              );
            })}
          </ul>
        </ScrollArea>
      </section>
    </ResizablePanel>
  );
}

export default SnippetsColumn;
