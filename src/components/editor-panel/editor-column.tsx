"use client";
import type {FolderWithSnippets} from "@/types";

import {useEffect, useRef, useState} from "react";
import {toast} from "sonner";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Snippet} from "@prisma/client";

import {ResizablePanel} from "../ui/resizable";

import Editor from "./editor";
import EditorHeader from "./editor-header";
import EditorFooter from "./editor-footer";

import {SPEmitters} from "@/lib/events";
import {useSnippet} from "@/context/useSnippetContext";
import {updateSnippetContent} from "@/lib/db/actions/snippets/update-snippet-content";

const DEBOUNCE_TIME = 1500;

function EditorColumn() {
  const {selectedSnippet, setSelectedSnippet} = useSnippet();
  const queryClient = useQueryClient();

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const saveVersionRef = useRef<number>(0);

  const updateSnippetState = (callback: (snippet: typeof selectedSnippet) => void) => {
    if (!selectedSnippet) return;
    callback(selectedSnippet);
  };

  const mutation = useMutation({
    mutationFn: ({
      snippetId,
      newContent,
    }: {
      snippetId: string;
      newContent: string;
      version: number;
    }) =>
      updateSnippetContent({
        snippetId,
        newContent,
      }),
    onMutate: async ({newContent}) => {
      if (!selectedSnippet) return;

      await queryClient.cancelQueries({
        queryKey: ["folder", selectedSnippet.folderId],
      });

      const previousFolder = queryClient.getQueryData<FolderWithSnippets>([
        "folder",
        selectedSnippet.folderId,
      ]);

      queryClient.setQueryData<FolderWithSnippets>(["folder", selectedSnippet.folderId], (old) => {
        if (!old || !old.snippets) return old;

        return {
          ...old,
          snippets: old.snippets.map((snippet) =>
            snippet.id === selectedSnippet.id ? {...snippet, content: newContent} : snippet,
          ),
        };
      });

      return {previousFolder};
    },
    onError: (error, variables, context) => {
      if (selectedSnippet) {
        queryClient.setQueryData(["folder", selectedSnippet.folderId], context?.previousFolder);
      }
      toast.error(`Error saving changes: ${error}`);
      setIsSaving(false);
      SPEmitters.emit("UNLOCK_SNIPPETS_PANEL");
    },
    onSuccess: (data, variables) => {
      if (variables.version === saveVersionRef.current && selectedSnippet) {
        queryClient.setQueryData<FolderWithSnippets>(
          ["folder", selectedSnippet.folderId],
          (old) => {
            if (!old || !old.snippets) return old;

            return {
              ...old,
              snippets: old.snippets.map((snippet) =>
                snippet.id === selectedSnippet.id
                  ? {...snippet, content: data.content, updatedAt: data.updatedAt}
                  : snippet,
              ),
            };
          },
        );
        updateSnippetState((snippet) => {
          setSelectedSnippet({
            ...(snippet as Snippet),
            content: data.content,
            updatedAt: data.updatedAt,
          });
        });
      }
    },
    onSettled: () => {
      setIsSaving(false);
      SPEmitters.emit("UNLOCK_SNIPPETS_PANEL");
      if (selectedSnippet) {
        queryClient.invalidateQueries({
          queryKey: ["folder", selectedSnippet.folderId],
        });
      }
    },
  });

  const handleContentChange = (value: string) => {
    if (!selectedSnippet?.id) return;

    const currentValue = value;
    const currentSaveVersion = ++saveVersionRef.current;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
      SPEmitters.emit("UNLOCK_SNIPPETS_PANEL");
    }
    SPEmitters.emit("LOCK_SNIPPETS_PANEL");

    saveTimeoutRef.current = setTimeout(() => {
      setIsSaving(true);
      mutation.mutate({
        snippetId: selectedSnippet.id,
        newContent: currentValue,
        version: currentSaveVersion,
      });
    }, DEBOUNCE_TIME);
  };

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
        SPEmitters.emit("UNLOCK_SNIPPETS_PANEL");
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
