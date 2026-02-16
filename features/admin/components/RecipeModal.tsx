"use client";

import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  refresh: () => void;
}

export default function RecipeModal({ open, setOpen, refresh }: Props) {
  const [name, setName] = useState("");

  const addRecipe = async () => {
    await fetch("https://dummyjson.com/recipes/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    toast.success("Recipe Added");
    refresh();
    setOpen(false);
    setName("");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add Recipe</h2>

        <input
          className="w-full border p-2 rounded mb-4"
          placeholder="Recipe name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button onClick={() => setOpen(false)}>Cancel</button>
          <button
            onClick={addRecipe}
            className="bg-orange-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
