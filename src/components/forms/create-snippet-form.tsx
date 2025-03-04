"use client";
import React, {useState, useTransition} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {LoaderIcon, Plus} from "lucide-react";
import {toast} from "sonner";

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

import {createSnippet} from "@/lib/db/actions/snippets/create-snippet";

const snippetSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "A title is required.",
    })
    .max(50, {
      message: "Title must be at most 35 characters, keep it short!",
    }),
  description: z.string().max(150, {
    message: "Description must be at most 150 characters.",
  }),
});

export function CreateSnippetForm({folderId}: {folderId: string}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof snippetSchema>>({
    resolver: zodResolver(snippetSchema),
    defaultValues: {title: "", description: ""},
  });

  async function onSubmit(values: z.infer<typeof snippetSchema>) {
    startTransition(async () => {
      try {
        await createSnippet({title: values.title, description: values.description, folderId});
        form.reset();
        setDialogOpen(false);
        toast.success("Snippet created!");
      } catch (error) {
        form.setError("root", {message: error as string});
        toast.error((error as Error).message);
      }
    });
  }

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
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
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
              name="description"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
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
            <Button disabled={isPending} type="submit">
              {isPending ? (
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
