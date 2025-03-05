"use client";

import type {Snippet} from "@prisma/client";

import {useEffect, useRef, useState} from "react";
import {toast} from "sonner";

import {ResizablePanel} from "./ui/resizable";
import Editor from "./editor";
import EditorHeader from "./editor-header";
import EditorFooter from "./editor-footer";

import {emitter} from "@/lib/events";
import {useSnippet} from "@/context/useSnippetContext";
import {updateSnippetContent} from "@/lib/db/actions/snippets/update-snippet-content";
const DEBOUNCE_TIME = 1500;

function EditorColumn() {
  const {selectedSnippet, setSelectedSnippet} = useSnippet();
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const saveVersionRef = useRef<number>(0);

  const updateSnippetState = (callback: (snippet: Snippet) => void) => {
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
        ...snippet,
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
            ...selectedSnippet,
            content: response.content,
            updatedAt: response.updatedAt,
          });
        }
      } catch (error) {
        updateSnippetState((snippet) => {
          setSelectedSnippet({
            ...snippet,
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
        <EditorHeader />
        <Editor handleContentChange={handleContentChange} />
        <EditorFooter isSaving={isSaving} />
      </section>
    </ResizablePanel>
  );
}

export default EditorColumn;
