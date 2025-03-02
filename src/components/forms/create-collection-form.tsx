"use client";
import React, {useState, useTransition} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {LoaderIcon, Plus} from "lucide-react";
import {toast} from "sonner";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogTrigger,
} from "../ui/dialog";
import {Form, FormField, FormItem, FormLabel, FormControl, FormMessage} from "../ui/form";
import {Input} from "../ui/input";
import {Button} from "../ui/button";

import {createCollection} from "@/lib/db/actions/collections/create-collection";
const collectionSchema = z.object({
  collection: z.string().min(1, {
    message: "Collection name is required",
  }),
});

function CreateCollectionForm() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof collectionSchema>>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      collection: "",
    },
  });

  async function onSubmit(values: z.infer<typeof collectionSchema>) {
    startTransition(async () => {
      try {
        await createCollection({collection: values.collection});
        form.reset();
        setDialogOpen(false);
        toast.success("Collection created!");
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
      <DialogTrigger asChild>
        <Button size="icon" variant="secondary">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Collection</DialogTitle>
          <DialogDescription>Create a new collection to organize your snippets.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="collection"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. TypeScript Essentials" {...field} />
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />
            <Button type="submit">
              {isPending ? (
                <>
                  <LoaderIcon className="animate-spin" /> Creating...
                </>
              ) : (
                "Create"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateCollectionForm;
