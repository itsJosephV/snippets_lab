"use client";
import React from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {LoaderIcon} from "lucide-react";
import {toast} from "sonner";

import {DropdownMenuLabel} from "../ui/dropdown-menu";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select";

import {updateEditorTheme} from "@/lib/db/actions/settings/updateEditorTheme";
import {getUserSettings} from "@/lib/db/data/get_user_settings";
import {editorThemes} from "@/lib/editor-themes";

function EditorTheme() {
  const queryClient = useQueryClient();

  const {data: settings} = useQuery({
    queryKey: ["settings"],
    queryFn: getUserSettings,
  });

  const {mutate, isPending} = useMutation({
    mutationFn: (theme: string) => updateEditorTheme(theme),
    onSuccess: async (context) => {
      await queryClient.invalidateQueries({queryKey: ["settings"]});
      toast.success(`Editor theme updated to ${context.editorTheme}`);
    },
  });

  const themeKeys = Object.keys(editorThemes).reduce((acc: string[], key) => {
    const parsedKey = key.split("-")[0];

    if (!acc.includes(parsedKey)) {
      acc.push(parsedKey);
    }

    return acc;
  }, []);

  /**
   * <DropdownMenuLabel className="flex flex-col gap-1 text-xs font-normal">
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
   */

  return (
    <DropdownMenuLabel className="flex flex-col gap-1 text-xs font-normal">
      <span className="text-muted-foreground flex items-center gap-1">
        Editor theme
        {isPending && <LoaderIcon className="relative top-px size-3 animate-spin" />}
      </span>
      <Select value={settings?.editorTheme} onValueChange={(value) => mutate(value)}>
        <SelectTrigger className="capitalize" disabled={isPending}>
          <SelectValue placeholder="Select a theme" />
        </SelectTrigger>
        <SelectContent>
          {themeKeys.map((theme) => (
            <SelectItem key={theme} className="capitalize" value={theme}>
              {theme}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </DropdownMenuLabel>
  );
}

export default EditorTheme;
