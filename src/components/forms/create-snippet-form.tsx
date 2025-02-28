"use client";
import React, {useState} from "react";
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
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  // FormDescription,
  FormControl,
  FormMessage,
  FormDescription,
} from "../ui/form";
import {Input} from "../ui/input";
import {Button} from "../ui/button";

import {createSnippet} from "@/lib/db/actions/snippets/create-snippet";

const snippetSchema = z.object({
  title: z.string().min(2, {
    message: "Folder must be at least 2 characters.",
  }),
  language: z.string(),
});

export function CreateSnippetForm({folderId}: {folderId: string}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const form = useForm<z.infer<typeof snippetSchema>>({
    resolver: zodResolver(snippetSchema),
    defaultValues: {title: "", language: ""},
  });

  const {isSubmitting} = form.formState;

  async function onSubmit(values: z.infer<typeof snippetSchema>) {
    try {
      await createSnippet({title: values.title, language: values.language, folderId: folderId});
      form.reset();
      setDialogOpen(false);
      toast.success("Snippet created!");
    } catch (error) {
      form.setError("root", {message: error as string});
      toast.error((error as Error).message);
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="secondary">
          <Plus />
        </Button>
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
                  <FormLabel>Snippet name</FormLabel>
                  <FormControl>
                    <Input placeholder="Debounce function for react" {...field} />
                  </FormControl>
                  <FormDescription>A brief description here</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="language"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <FormControl>
                    <Input placeholder="javascript" {...field} />
                  </FormControl>
                  <FormDescription>A brief description here</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              {isSubmitting ? (
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
