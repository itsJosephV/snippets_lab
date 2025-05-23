import type {FolderAndSnippets, SnippetsWithCollectionName} from "@/types";
import type {Snippet} from "@prisma/client";

import {Lock, Unlock} from "lucide-react";
import {useQueryClient, useMutation} from "@tanstack/react-query";
import {toast} from "sonner";
import {useSearchParams} from "next/navigation";

import {Toggle} from "../ui/toggle";
import {buttonVariants} from "../ui/button";

import {useSnippet} from "@/context/useSnippetContext";
import {updateSnippetLock} from "@/lib/db/actions/snippets/update-snippet-lock";

function LockToggle() {
  const {selectedSnippet, setSelectedSnippet} = useSnippet();

  const queryClient = useQueryClient();

  const key = "folder";
  const params = useSearchParams();
  const folderId = params.get("folderId") as string;

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
      await queryClient.cancelQueries({queryKey: [key, folderId]});
      const previousFolder = queryClient.getQueryData([key, folderId]);
      const updatedSnippet = {...selectedSnippet, isLocked};

      queryClient.setQueryData([key, folderId], (old: FolderAndSnippets) => {
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
      queryClient.setQueryData([key, selectedSnippet?.folderId], context?.previousFolder);
      setSelectedSnippet(context?.previousSnippet as SnippetsWithCollectionName);
      toast.error("Failed to update lock");
    },
    onSuccess: (response) => {
      if (!response) return;
      setSelectedSnippet(response);
      toast.success(`Lock updated`);
    },
    onSettled: () => {
      if (selectedSnippet) {
        queryClient.invalidateQueries({queryKey: [key, folderId]});
      }
    },
  });

  return (
    <Toggle
      className={buttonVariants({
        variant: "secondary",
        size: "icon",
      })}
      disabled={mutation.isPending || !selectedSnippet}
      pressed={selectedSnippet?.isLocked}
      onPressedChange={() =>
        mutation.mutate({
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
