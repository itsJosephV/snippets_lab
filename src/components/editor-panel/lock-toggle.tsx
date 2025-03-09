import type {FolderWithSnippets} from "@/types";
import type {Snippet} from "@prisma/client";

import React, {useMemo} from "react";
import {Lock, Unlock} from "lucide-react";
import {useQueryClient, useMutation} from "@tanstack/react-query";
import {toast} from "sonner";
import debounce from "lodash.debounce";

import {Toggle} from "../ui/toggle";
import {buttonVariants} from "../ui/button";

import {useSnippet} from "@/context/useSnippetContext";
import {updateSnippetLock} from "@/lib/db/actions/snippets/update-snippet-lock";

function LockToggle() {
  const {selectedSnippet, setSelectedSnippet} = useSnippet();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({snippetId, isLocked}: {snippetId: string; isLocked: boolean}) => {
      if (!selectedSnippet) return;

      return updateSnippetLock({
        snippetId: snippetId,
        isLocked: isLocked,
      });
    },
    onMutate: async ({isLocked}) => {
      if (!selectedSnippet) return;
      await queryClient.cancelQueries({queryKey: ["folder", selectedSnippet.folderId]});
      const previousFolder = queryClient.getQueryData(["folder", selectedSnippet.folderId]);
      const updatedSnippet = {...selectedSnippet, isLocked};

      queryClient.setQueryData(["folder", selectedSnippet.folderId], (old: FolderWithSnippets) => {
        if (!old || !old.snippets) return old;

        return {
          ...old,
          snippets: old.snippets.map((snippet: Snippet) =>
            snippet.id === selectedSnippet.id ? updatedSnippet : snippet,
          ),
        };
      });
      setSelectedSnippet(updatedSnippet);

      return {previousFolder, previousSnippet: selectedSnippet};
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["folder", selectedSnippet?.folderId], context?.previousFolder);
      setSelectedSnippet(context?.previousSnippet as Snippet);
      toast.error("Failed to update lock");
    },
    onSuccess: (response) => {
      if (!response) return;
      setSelectedSnippet(response);
      toast.success(`Lock updated`);
    },
    onSettled: () => {
      if (selectedSnippet) {
        queryClient.invalidateQueries({queryKey: ["folder", selectedSnippet.folderId]});
      }
    },
  });

  const debouncedMutate = useMemo(
    () =>
      debounce((params) => {
        mutation.mutate(params);
      }, 300),
    [mutation],
  );

  return (
    <Toggle
      className={buttonVariants({
        variant: "secondary",
        size: "icon",
      })}
      pressed={selectedSnippet?.isLocked}
      onPressedChange={() =>
        debouncedMutate({
          snippetId: selectedSnippet?.id as string,
          isLocked: !selectedSnippet?.isLocked,
        })
      }
    >
      {selectedSnippet?.isLocked ? <Lock /> : <Unlock />}
    </Toggle>
  );
}

export default LockToggle;
