"use client";
import React from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {LoaderIcon} from "lucide-react";
import {toast} from "sonner";

import {DropdownMenuLabel} from "../ui/dropdown-menu";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select";

import {getUserSettings} from "@/lib/db/data/get_user_settings";
import {updateDefaultLanguage} from "@/lib/db/actions/settings/updateDefaultLanguage";
import {languageExtension} from "@/lib/languages/language-extension";

function DefaultLanguage() {
  const queryClient = useQueryClient();

  const {data: settings} = useQuery({
    queryKey: ["settings"],
    queryFn: getUserSettings,
  });

  const {mutate, isPending} = useMutation({
    mutationFn: (theme: string) => updateDefaultLanguage(theme),
    onSuccess: async (context) => {
      await queryClient.invalidateQueries({queryKey: ["settings"]});
      toast.success(`Default language updated to ${context.defaultLanguage}`);
    },
  });

  {
    /* {isPending && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />} */
  }

  return (
    <DropdownMenuLabel className="flex flex-col gap-1 text-xs font-normal">
      <span className="text-muted-foreground flex items-center gap-1">
        Default language
        {isPending && <LoaderIcon className="relative top-px size-3 animate-spin" />}
      </span>
      <Select value={settings?.defaultLanguage} onValueChange={(value) => mutate(value)}>
        <SelectTrigger className="capitalize" disabled={isPending}>
          <SelectValue placeholder="Select a theme" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(languageExtension).map(([key]) => (
            <SelectItem key={key} className="capitalize" value={key}>
              {key}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </DropdownMenuLabel>
  );
}

export default DefaultLanguage;
