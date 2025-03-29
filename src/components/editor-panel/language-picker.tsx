import type {Snippet} from "@prisma/client";

import * as React from "react";
import {toast} from "sonner";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useSearchParams} from "next/navigation";

import {FolderAndSnippets, SnippetsWithCollectionName} from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Language} from "@/types";
import {useSnippet} from "@/context/useSnippetContext";
import {updateSnippetLanguage} from "@/lib/db/actions/snippets/update-snippet-language";

export function LanguagePicker() {
  const {selectedSnippet, setSelectedSnippet} = useSnippet();
  const queryClient = useQueryClient();
  const key = "folder";
  const params = useSearchParams();
  const folderId = params.get("folderId") as string;

  const mutation = useMutation({
    mutationFn: ({snippetId, language}: {snippetId: string; language: Language}) =>
      updateSnippetLanguage(snippetId, language),
    onMutate: async ({language}) => {
      if (!selectedSnippet) return;

      await queryClient.cancelQueries({queryKey: [key, folderId]});

      const previousFolder = queryClient.getQueryData([key, folderId]);

      const updatedSnippet = {...selectedSnippet, language};

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
      queryClient.setQueryData([key, folderId], context?.previousFolder);
      setSelectedSnippet(context?.previousSnippet as SnippetsWithCollectionName);
      toast.error("Failed to update language");
    },
    onSuccess: (response) => {
      setSelectedSnippet(response);
      toast.success(`Language updated to ${response.language}`);
    },
    onSettled: () => {
      if (selectedSnippet) {
        queryClient.invalidateQueries({queryKey: [key, folderId]});
      }
    },
  });

  const handleSelectChange = (value: Language) => {
    if (!selectedSnippet) return;
    mutation.mutate({snippetId: selectedSnippet.id, language: value});
  };

  return (
    <Select
      disabled={!selectedSnippet?.language || selectedSnippet.isLocked}
      value={selectedSnippet?.language}
      onValueChange={handleSelectChange}
    >
      <SelectTrigger className="w-[150px] capitalize">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Object.entries(Language).map(([key, value]) => (
            <SelectItem key={key} className="capitalize" value={value}>
              {value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
