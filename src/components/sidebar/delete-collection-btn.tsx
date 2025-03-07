"use client";
import {useState, useTransition} from "react";
import {Loader, Trash2} from "lucide-react";

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
  const [isPending, startTransition] = useTransition();

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        await deleteCollection({collectionId});
        setIsDialogOpen(false);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Delete failed:", error);
      }
    });
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
