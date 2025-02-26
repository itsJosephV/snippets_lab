"use server";
import {LoaderIcon, Plus, Search} from "lucide-react";

// import DrawerEditor from "./drawer-editor";
import {Suspense} from "react";

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
import {ModeToggle} from "./theme-toggle";
import {ScrollArea} from "./ui/scroll-area";
import BPResizablePanel from "./BPResizablePanel";
import SnippetsLits from "./snippets-list";

async function SnippetsColumn({folderId}: {folderId: string}) {
  // ASYNC FUNCTION FETCHING SNIPPETS FROM THE SERVER

  return (
    <BPResizablePanel>
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
          <Suspense
            key={folderId}
            fallback={
              <div className="mt-20 flex w-full justify-center">
                <LoaderIcon className="animate-spin" />
              </div>
            }
          >
            <SnippetsLits folderId={folderId} />
          </Suspense>
        </ScrollArea>
      </section>
    </BPResizablePanel>
  );
}

export default SnippetsColumn;
