"use client";

import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Info, LoaderIcon, Plus} from "lucide-react";
import {toast} from "sonner";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Snippet} from "@prisma/client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {Form, FormField, FormItem, FormLabel, FormControl, FormMessage} from "../ui/form";
import {Input} from "../ui/input";
import {Button, buttonVariants} from "../ui/button";
import {Textarea} from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "../ui/tooltip";

import {FolderWithSnippets} from "@/types";
import {createSnippet} from "@/lib/db/actions/snippets/create-snippet";
import {Language} from "@/types";
import {useSnippet} from "@/context/useSnippetContext";
import {languageTemplateFn} from "@/lib/languages/language-helpers";

const snippetSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "A title is required.",
    })
    .max(40, {
      message: "Title must be at most 40 characters, keep it short!",
    }),
  description: z.string().max(150, {
    message: "Description must be at most 150 characters.",
  }),
  language: z.string(),
});

export const DEFAULT_LANGUAGE = Language["TYPESCRIPT"];

export function CreateSnippetForm({folderId}: {folderId: string}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const {setSelectedSnippet} = useSnippet();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof snippetSchema>>({
    resolver: zodResolver(snippetSchema),
    defaultValues: {
      title: "",
      description: "",
      language: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof snippetSchema>) =>
      createSnippet({
        title: values.title,
        description: values.description,
        language: values.language,
        folderId,
      }),
    onMutate: async (values) => {
      await queryClient.cancelQueries({queryKey: ["folder", folderId]});
      const previousFolder = queryClient.getQueryData(["folder", folderId]);

      const tempId = `temp-${Date.now()}`;
      const tempSnippet = {
        id: tempId,
        title: values.title,
        description: values.description || null,
        language: values.language || DEFAULT_LANGUAGE,
        content: languageTemplateFn(
          values.title,
          values.description,
          (values.language as Language) || DEFAULT_LANGUAGE,
        ),
        isFavorite: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        folderId,
      };

      // Actualizar el caché optimistamente
      queryClient.setQueryData(["folder", folderId], (old: FolderWithSnippets) => {
        if (!old || !old.snippets) return {...old, snippets: [tempSnippet]};

        // setSelectedSnippet(tempSnippet);

        return {
          ...old,
          snippets: [tempSnippet, ...old.snippets],
        };
      });

      return {previousFolder};
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["folder", folderId], context?.previousFolder);
      toast.error("Error creating snippet");
    },
    onSuccess: (response) => {
      queryClient.setQueryData(["folder", folderId], (old: FolderWithSnippets) => {
        if (!old || !old.snippets) return {...old, snippets: [response]};

        return {
          ...old,
          snippets: old.snippets.map((snippet: Snippet) =>
            snippet.id.startsWith("temp-") ? response : snippet,
          ),
        };
      });
      setSelectedSnippet(response);
      toast.success("Snippet created!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ["folder", folderId]});
    },
  });

  const handleSubmit = (values: z.infer<typeof snippetSchema>) => {
    mutation.mutate(values);
    setDialogOpen(false);
    form.reset();
  };

  const handleOpenChange = (isOpen: boolean) => {
    setDialogOpen(isOpen);
    if (!isOpen) {
      form.reset();
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger
        className={buttonVariants({
          size: "icon",
          variant: "secondary",
        })}
        disabled={!folderId}
      >
        <Plus />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Snippet</DialogTitle>
          <DialogDescription>Create a new snippet in the current folder.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Debounce function for react" {...field} />
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="language"
              render={({field}) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    Language{" "}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="text-muted-foreground relative top-px" size={14} />
                        </TooltipTrigger>
                        <TooltipContent className="" side="right">
                          <p>The default language is TypeScript</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full capitalize">
                        <SelectValue placeholder="Choose a language" />
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
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Description (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-20 resize-none"
                      placeholder="e.g. A function to debounce user input in React."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={mutation.isPending} type="submit">
              {mutation.isPending ? (
                <>
                  <LoaderIcon className="animate-spin" /> Creating...
                </>
              ) : (
                "Create Snippet"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
