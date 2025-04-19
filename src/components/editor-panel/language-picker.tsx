import * as React from "react";
import {toast} from "sonner";
import {QueryClient, useMutation, useQueryClient} from "@tanstack/react-query";
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
import {useSnippet} from "@/context/useSnippetContext";
import {updateSnippetLanguage} from "@/lib/db/actions/snippets/update-snippet-language";
import {languageExtension, LanguageExtension} from "@/lib/languages/language-extension";

export function LanguagePicker() {
  const {selectedSnippet, setSelectedSnippet} = useSnippet();
  const queryClient = useQueryClient();
  const key = "folder";
  const params = useSearchParams();
  const currentFolderId = params.get("folderId") as string;
  const snippetHomeFolderId = selectedSnippet?.folderId;

  const mutation = useMutation({
    mutationFn: ({snippetId, language}: {snippetId: string; language: LanguageExtension}) =>
      updateSnippetLanguage(snippetId, language),
    onMutate: async ({language}) => {
      if (!selectedSnippet) return null;

      await queryClient.cancelQueries({queryKey: ["folder"]});

      updateAllRelevantFolders(queryClient, selectedSnippet.id, (snippet) => ({
        ...snippet,
        language,
      }));

      const previousSnippet = selectedSnippet;
      const updatedSnippet = {
        ...selectedSnippet,
        language,
      };

      setSelectedSnippet(updatedSnippet);

      return {previousSnippet};
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData([key, currentFolderId], context?.previousSnippet);
      setSelectedSnippet(context?.previousSnippet as SnippetsWithCollectionName);
      toast.error("Failed to update language");
    },
    onSuccess: (response) => {
      updateAllRelevantFolders(queryClient, response.id, () => response);
      setSelectedSnippet(response);
      toast.success(`Language updated to ${response.language}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: [key, currentFolderId], exact: true});
      if (snippetHomeFolderId) {
        queryClient.invalidateQueries({
          queryKey: ["folder", snippetHomeFolderId],
          exact: true,
        });
      }
    },
  });

  const handleSelectChange = (value: LanguageExtension) => {
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
          {Object.entries(languageExtension).map(([key]) => (
            <SelectItem key={key} className="capitalize" value={key}>
              {key}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function updateAllRelevantFolders(
  queryClient: QueryClient,
  snippetId: string,
  updater: (snippet: SnippetsWithCollectionName) => SnippetsWithCollectionName,
) {
  const queryCache = queryClient.getQueryCache();
  const allFolderQueries = queryCache.findAll({queryKey: ["folder"]});

  allFolderQueries.forEach((query) => {
    const folderId = query.queryKey[1];

    queryClient.setQueryData<FolderAndSnippets>(["folder", folderId], (old) => {
      if (!old?.snippets) return old;

      return {
        ...old,
        snippets: old.snippets.map((snippet) =>
          snippet.id === snippetId ? updater(snippet) : snippet,
        ),
      };
    });
  });
}
