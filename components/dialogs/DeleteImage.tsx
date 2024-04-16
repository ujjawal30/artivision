"use client";

import { useTransition } from "react";

import { deleteImage } from "@/lib/actions/image.actions";
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
import { Button } from "@/components/ui/button";

interface DeleteImageProps {
  imageId: string;
}

const DeleteImage = ({ imageId }: DeleteImageProps) => {
  const [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="w-full rounded-2xl">
        <Button
          type="button"
          className="button h-12 w-full md:h-14"
          variant="destructive"
        >
          Delete Image
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="flex flex-col gap-10 !rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this image?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this image
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="border bg-red-500 text-white hover:bg-red-600"
            onClick={() =>
              startTransition(async () => {
                await deleteImage(imageId);
              })
            }
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteImage;
