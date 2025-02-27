"use client";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Folder, LoaderIcon} from "lucide-react";
import {toast} from "sonner";

import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "../ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  // FormDescription,
  FormControl,
  FormMessage,
} from "../ui/form";
import {Input} from "../ui/input";
import {Button} from "../ui/button";
import {DropdownMenuItem} from "../ui/dropdown-menu";

import {createFolder} from "@/lib/db/actions/folders/create-folder";

const folderSchema = z.object({
  folder: z.string().min(2, {
    message: "Folder must be at least 2 characters.",
  }),
});

export function CreateFolderForm({collectionId}: {collectionId: string}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const form = useForm<z.infer<typeof folderSchema>>({
    resolver: zodResolver(folderSchema),
    defaultValues: {folder: ""},
  });

  const {isSubmitting} = form.formState;

  const handleDropdownSelect = (e: Event) => {
    e.preventDefault();
    setDialogOpen(true);
  };

  async function onSubmit(values: z.infer<typeof folderSchema>) {
    try {
      await createFolder({folder: values.folder, collectionId: collectionId});
      form.reset();
      setDialogOpen(false);
      toast.success("Folder created!");
    } catch (error) {
      form.setError("root", {message: error as string});
      toast.error((error as Error).message);
    }
  }

  return (
    <>
      <DropdownMenuItem onSelect={handleDropdownSelect}>
        <div className="flex items-center gap-2">
          <Folder className="text-muted-foreground h-4 w-4" />
          <span>Create folder</span>
        </div>
      </DropdownMenuItem>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
            <DialogDescription>Enter a name for your new folder</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="folder"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Folder Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. JavaScript Utilities" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div
              //  className="flex justify-end gap-2"
              >
                {/* <Button type="button" variant="ghost" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button> */}
                <Button disabled={isSubmitting} type="submit">
                  {isSubmitting ? (
                    <>
                      <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Folder"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
