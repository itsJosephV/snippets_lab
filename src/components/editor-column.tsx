"use client";

import type {Snippet} from "@prisma/client";

import {LoaderIcon, Lock, Star, Tag} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import {toast} from "sonner";

import {Button} from "./ui/button";
import {Separator} from "./ui/separator";
import Settings from "./settings";
import {ResizablePanel} from "./ui/resizable";
import Editor from "./editor";
import {LanguagePicker} from "./language-picker";

import {emitter} from "@/lib/events";
import {useSnippet} from "@/context/useSnippetContext";
import {updateSnippetContent} from "@/lib/db/actions/snippets/update-snippet-content";
const DEBOUNCE_TIME = 1500;

function EditorColumn() {
  const {selectedSnippet, setSelectedSnippet, cursorPosition} = useSnippet();
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const saveVersionRef = useRef<number>(0);

  const updateSnippetState = (callback: (snippet: typeof selectedSnippet) => void) => {
    if (!selectedSnippet) return;
    callback(selectedSnippet);
  };

  const handleContentChange = (value: string) => {
    if (!selectedSnippet?.id) return;

    const newUpdateDate = new Date();
    const currentValue = value;
    const currentSaveVersion = ++saveVersionRef.current;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
      emitter.emit("UNLOCK_EDITOR");
    }
    emitter.emit("LOCK_EDITOR");

    updateSnippetState((snippet) => {
      setSelectedSnippet({
        ...(snippet as Snippet),
        content: currentValue,
      });
    });

    saveTimeoutRef.current = setTimeout(async () => {
      try {
        setIsSaving(true);
        const response = await updateSnippetContent({
          snippetId: selectedSnippet.id,
          newContent: currentValue,
          newUpdateDate,
        });

        if (saveVersionRef.current === currentSaveVersion) {
          setSelectedSnippet({
            ...(selectedSnippet as Snippet),
            content: response.content,
            updatedAt: response.updatedAt,
          });
        }
      } catch (error) {
        updateSnippetState((snippet) => {
          setSelectedSnippet({
            ...(snippet as Snippet),
            content: selectedSnippet?.content,
            updatedAt: selectedSnippet?.updatedAt,
          });
        });
        toast.error(`Error saving changes: ${error}`);
        setIsSaving(false);
      } finally {
        if (saveVersionRef.current === currentSaveVersion) {
          setIsSaving(false);
        }
        emitter.emit("UNLOCK_EDITOR");
      }
    }, DEBOUNCE_TIME);
  };

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
        emitter.emit("UNLOCK_EDITOR");
      }
    };
  }, []);

  return (
    <ResizablePanel className="hidden lg:block" defaultSize={65}>
      <section className="grid grid-rows-[auto_1fr_auto]">
        <header className="border-border flex items-center border-b p-2 backdrop-blur-xl">
          <p className="flex-1 text-sm">{selectedSnippet?.title}</p>
          {/* {selectedSnippet && (
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
          )} */}
          <LanguagePicker />
          <div className="h-full py-1">
            <Separator className="mx-2" orientation="vertical" />
          </div>
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
        <footer className="bg-background border-border text-muted-foreground flex w-full items-center justify-between border-t p-2 text-sm leading-none">
          <div>
            Ln {cursorPosition.ln}, Col {cursorPosition.col}
          </div>
          <div>
            {isSaving ? (
              <div className="flex items-center gap-1">
                <LoaderIcon className="size-[0.875rem] animate-spin" />
                <span>Saving...</span>
              </div>
            ) : (
              <div>
                {selectedSnippet?.updatedAt && (
                  <>
                    Last saved -{" "}
                    {selectedSnippet?.updatedAt?.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </>
                )}
              </div>
            )}
          </div>
        </footer>
      </section>
    </ResizablePanel>
  );
}

export default EditorColumn;
