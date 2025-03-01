"use client";

import {LoaderIcon, Lock, Star, Tag} from "lucide-react";
import {useRef, useState} from "react";
import {toast} from "sonner";

import {Button} from "./ui/button";
import {Separator} from "./ui/separator";
import Settings from "./settings";
import {ResizablePanel} from "./ui/resizable";
import Editor from "./editor";

import {useSnippet} from "@/context/useSnippetContext";
import {updateSnippetContent} from "@/lib/db/actions/snippets/update-snippet-content";

const saveContent = async (snippetId: string, newContent: string, newUpdateDate: Date) => {
  const response = await updateSnippetContent({
    snippetId,
    newContent,
    newUpdateDate,
  });

  return response;
};

function EditorColumn() {
  const {selectedSnippet, setSelectedSnippet, isSaving, setIsSaving} = useSnippet();
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleContentChange = (value: string) => {
    if (!selectedSnippet?.id) return;

    const newUpdateDate = new Date();

    // Optimistic update
    if (selectedSnippet) {
      setSelectedSnippet({
        ...selectedSnippet!,
        content: value,
        updatedAt: newUpdateDate,
      });
    }

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(async () => {
      try {
        setIsSaving(true);

        await saveContent(selectedSnippet.id, value, newUpdateDate);

        toast.success("Cambios guardados");
      } catch (error) {
        // Revert optimistic update
        if (selectedSnippet) {
          setSelectedSnippet({
            ...selectedSnippet!,
            content: selectedSnippet.content,
          });
        }

        toast.error(`Error guardando cambios: ${error}`);
      } finally {
        setIsSaving(false);
      }
    }, 500);
  };

  return (
    <ResizablePanel className="hidden lg:block" defaultSize={65}>
      <section className="grid grid-rows-[auto_1fr]">
        <header className="border-border flex items-center border-b p-2 backdrop-blur-xl">
          <p className="flex-1 text-sm">{selectedSnippet?.title}</p>
          {selectedSnippet && (
            <div className="bg-primary-foreground text-muted-foreground mr-4 rounded-md px-2 py-1.5 text-xs">
              {isSaving ? (
                <div className="flex items-center gap-1">
                  <LoaderIcon className="h-3 w-3 animate-spin" />
                  <span>Saving...</span>
                </div>
              ) : (
                <div>
                  {selectedSnippet?.updatedAt && (
                    <>
                      Saved at{" "}
                      {selectedSnippet?.updatedAt?.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </>
                  )}
                </div>
              )}
            </div>
          )}
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
        <Editor handleContentChange={handleContentChange} />
      </section>
    </ResizablePanel>
  );
}

export default EditorColumn;
