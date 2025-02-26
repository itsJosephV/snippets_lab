"use client";
import {Lock, Star, Tag} from "lucide-react";

import {Button} from "./ui/button";
import {Separator} from "./ui/separator";
import Settings from "./settings";
import {ResizablePanel} from "./ui/resizable";
import Editor from "./editor";

import {useSnippet} from "@/context/useSnippetContext";
function EditorColumn() {
  const {selectedSnippet} = useSnippet();

  return (
    <ResizablePanel className="hidden lg:block" defaultSize={65}>
      <section className="grid grid-rows-[auto_1fr]">
        <header className="border-border flex items-center border-b p-2 backdrop-blur-xl">
          <p className="flex-1 text-sm">{selectedSnippet?.title}</p>
          <div className="flex h-full items-center">
            <div className="space-x-1.5">
              <Button size="icon" variant="secondary">
                <Lock />
              </Button>
              <Button size="icon" variant="secondary">
                <Tag />
              </Button>
              <Button size="icon" variant="secondary">
                <Star />
              </Button>
            </div>
            <div className="h-full py-1">
              <Separator className="mx-2" orientation="vertical" />
            </div>
            <div className="space-x-1.5">
              <Settings />
            </div>
          </div>
        </header>
        <Editor snippetContent={selectedSnippet?.content as string} />
      </section>
    </ResizablePanel>
  );
}

export default EditorColumn;
