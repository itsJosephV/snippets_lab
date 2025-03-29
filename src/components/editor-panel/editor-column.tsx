"use client";
import type {FolderAndSnippets, SnippetsWithCollectionName} from "@/types";

import {useEffect, useRef, useState} from "react";
import {toast} from "sonner";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import debounce from "lodash.debounce";
import {useSearchParams} from "next/navigation";

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
  const searchParams = useSearchParams();
  const folderId = searchParams.get("folderId") as string;

  const [isSaving, setIsSaving] = useState<boolean>(false);
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
        queryKey: ["folder", folderId],
      });

      const previousFolder = queryClient.getQueryData<FolderAndSnippets>(["folder", folderId]);

      queryClient.setQueryData<FolderAndSnippets>(["folder", folderId], (old) => {
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
        queryClient.setQueryData(["folder", folderId], context?.previousFolder);
      }
      toast.error(`Error saving changes: ${error}`);
      setIsSaving(false);
      SPEmitters.emit("UNLOCK_SNIPPETS_PANEL");
    },
    onSuccess: (data, variables) => {
      if (variables.version === saveVersionRef.current && selectedSnippet) {
        queryClient.setQueryData<FolderAndSnippets>(["folder", folderId], (old) => {
          if (!old || !old.snippets) return old;

          return {
            ...old,
            snippets: old.snippets.map((snippet) =>
              snippet.id === selectedSnippet.id
                ? {...snippet, content: data.content, updatedAt: data.updatedAt}
                : snippet,
            ),
          };
        });
        updateSnippetState((snippet) => {
          setSelectedSnippet({
            ...(snippet as SnippetsWithCollectionName),
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
          queryKey: ["folder", folderId],
        });
      }
    },
  });

  const debouncedSaveRef = useRef(
    debounce((newContent: string, version: number, snippetId: string) => {
      setIsSaving(true);

      mutation.mutate({
        snippetId,
        newContent,
        version,
      });
    }, DEBOUNCE_TIME),
  );

  const handleContentChange = (value: string) => {
    if (!selectedSnippet?.id) return;

    const currentValue = value;
    const currentSaveVersion = ++saveVersionRef.current;

    SPEmitters.emit("LOCK_SNIPPETS_PANEL");

    debouncedSaveRef.current(currentValue, currentSaveVersion, selectedSnippet.id);
  };

  useEffect(() => {
    const debouncedSave = debouncedSaveRef.current;

    return () => {
      debouncedSave.cancel();
      SPEmitters.emit("UNLOCK_SNIPPETS_PANEL");
    };
  }, [debouncedSaveRef]);

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
