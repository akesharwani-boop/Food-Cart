"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
  onConfirm: () => void;
}

export default function DeleteConfirmDialog({
  open,
  setOpen,
  onConfirm,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
        </DialogHeader>

        <p>Are you sure you want to delete this recipe?</p>

        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            className="bg-red-500 text-white"
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
          >
            Confirm Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
