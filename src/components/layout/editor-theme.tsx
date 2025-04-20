"use client";
import React from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Loader2} from "lucide-react";
import {toast} from "sonner";

import {DropdownMenuLabel} from "../ui/dropdown-menu";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select";

import {updateEditorTheme} from "@/lib/db/actions/settings/updateEditorTheme";
import {getUserSettings} from "@/lib/db/data/get_user_settings";

function EditorTheme() {
  const queryClient = useQueryClient();

  const {data: settings} = useQuery({
    queryKey: ["settings"],
    queryFn: () => getUserSettings(),
  });

  const {mutate, isPending} = useMutation({
    mutationFn: (theme: string) => updateEditorTheme(theme),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["settings"]});
      toast.success("Editor theme updated");
    },
  });

  return (
    <DropdownMenuLabel className="flex items-center justify-between font-normal">
      {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Editor theme
      <Select value={settings?.editorTheme} onValueChange={(value) => mutate(value)}>
        <SelectTrigger className="w-44 capitalize" disabled={isPending}>
          <SelectValue placeholder="Select a theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="github">GitHub</SelectItem>
          <SelectItem value="duotone">Duotone</SelectItem>
          <SelectItem value="basic">Basic</SelectItem>
        </SelectContent>
      </Select>
    </DropdownMenuLabel>
  );
}

export default EditorTheme;
