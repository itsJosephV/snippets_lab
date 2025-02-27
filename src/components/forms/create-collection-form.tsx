"use client";
import React, {useState} from "react";
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
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormControl,
  FormMessage,
} from "../ui/form";
import {Input} from "../ui/input";
import {Button} from "../ui/button";

import {createCollection} from "@/lib/db/actions/collections/create-collection";
const collectionSchema = z.object({
  collection: z.string().min(2, {
    message: "Collection must be at least 2 characters.",
  }),
});

function CreateCollectionForm() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof collectionSchema>>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      collection: "",
    },
  });

  const {isSubmitting} = form.formState;

  async function onSubmit(values: z.infer<typeof collectionSchema>) {
    try {
      await createCollection({collection: values.collection});
      form.reset();
      setDialogOpen(false);
      toast.success("Collection created!");
    } catch (error) {
      form.setError("root", {
        message: error as string,
      });
      const {message} = error as {message: string};

      toast.error(message);
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
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>Here will be a form to create a new collection</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="collection"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Collection</FormLabel>
                  <FormControl>
                    <Input placeholder="JavaScript Essentials" {...field} />
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
                "Create Collection"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateCollectionForm;
