"use client";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteModal({ open, onClose, onConfirm }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96 text-center">
        <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
        <p className="text-gray-600 mb-6">This action cannot be undone.</p>

        <div className="flex justify-center gap-4">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
