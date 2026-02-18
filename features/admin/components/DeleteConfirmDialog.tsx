"use client";

import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  onConfirm: () => void;
}

export default function DeleteConfirmDialog({ onConfirm }: Props) {
  return (
    <Dialog>
      <div className="space-y-4">
        <p>Are you sure you want to delete this recipe?</p>
        <Button
          onClick={onConfirm}
          className="bg-red-500 text-white"
        >
          Confirm Delete
        </Button>
      </div>
    </Dialog>
  );
}
