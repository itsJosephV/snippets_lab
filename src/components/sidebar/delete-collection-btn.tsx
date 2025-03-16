"use client";
import {useState} from "react";
import {Loader, Trash2} from "lucide-react";
import {useQueryClient, useMutation} from "@tanstack/react-query";
import {toast} from "sonner";

import {buttonVariants} from "../ui/button";

import {DropdownMenuItem} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {deleteCollection} from "@/lib/db/actions/collections/delete-collection";

export function DeleteCollectionButton({collectionId}: {collectionId: string}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const queryClient = useQueryClient();

  const {mutate, isPending} = useMutation({
    mutationFn: ({collectionId}: {collectionId: string}) => deleteCollection({collectionId}),
    onError: (error) => {
      toast.error(`Error deleting collection: ${error.message as string}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["collections"]});
      setIsDialogOpen(false);
      toast.success("Collection deleted! 🎉");
    },
  });

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    mutate({collectionId});
  };

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Collection
        </DropdownMenuItem>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this collection?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the collection and all of its
            contents.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({variant: "destructive"})}
            disabled={isPending}
            onClick={handleDelete}
          >
            {isPending ? (
              <>
                <Loader className="animate-spin" />
                Deleting...
              </>
            ) : (
              <>Delete Collection</>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
