import * as React from "react";
import {useOptimistic, startTransition} from "react";
import {toast} from "sonner";

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

  const [optimisticLanguage, setOptimisticLanguage] = useOptimistic(
    selectedSnippet?.language,
    (_, newLanguage: Language) => newLanguage,
  );

  const handleSelectChange = (value: Language) => {
    if (!selectedSnippet) return;

    startTransition(async () => {
      setOptimisticLanguage(value);

      try {
        const response = await updateSnippetLanguage(selectedSnippet.id, value);

        setSelectedSnippet({
          ...selectedSnippet,
          language: response.language,
        });
        toast.success(`Language updated to ${response.language}`);
      } catch (error) {
        toast.error(`Failed to update language: ${error}`);
      }
    });
  };

  return (
    <Select
      disabled={!selectedSnippet?.language}
      value={optimisticLanguage}
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
