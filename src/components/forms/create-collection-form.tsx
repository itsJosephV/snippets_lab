"use client";

import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {LoaderIcon, Plus} from "lucide-react";
import {toast} from "sonner";
import {useMutation, useQueryClient} from "@tanstack/react-query";

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
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof collectionSchema>>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      collection: "",
    },
  });

  const {mutate, isPending} = useMutation({
    mutationFn: (values: z.infer<typeof collectionSchema>) =>
      createCollection({collection: values.collection}),
    onError: (error) => {
      toast.error(`Error creating collection: ${error.message as string}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["collections"]});
      form.reset();
      setDialogOpen(false);
      toast.success("Collection created! 🎉");
    },
  });

  async function onSubmit(values: z.infer<typeof collectionSchema>) {
    mutate(values);
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
