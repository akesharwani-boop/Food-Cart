"use client";

import { useEffect, useState, useCallback } from "react";
import Pagination from "@/features/admin/components/Pagination";
import RecipeModal from "@/features/admin/components/RecipeModal";
import toast from "react-hot-toast";
import Image from "next/image";

interface Recipe {
  id: number;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
}

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(0);

  const limit = 6;

  const fetchRecipes = useCallback(async () => {
    const skip = (page - 1) * limit;

    const res = await fetch(
      `https://dummyjson.com/recipes?limit=${limit}&skip=${skip}`,
    );

    const data = await res.json();

    setRecipes(data.recipes);
    setTotal(data.total);
  }, [page]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const deleteRecipe = async (id: number) => {
    await fetch(`https://dummyjson.com/recipes/${id}`, {
      method: "DELETE",
    });

    toast.success("Recipe Deleted");
    fetchRecipes();
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Recipes</h1>
        <button
          onClick={() => setOpen(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          Add Recipe
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Image</th>
              <th>Name</th>
              <th>Cuisine</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {recipes.map((r) => (
              <tr key={r.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3">
                  <Image
                    src={r.image}
                    alt={r.name}
                    width={48}
                    height={48}
                    className="rounded object-cover"
                  />
                </td>

                <td className="font-medium">{r.name}</td>
                <td>{r.cuisine}</td>
                <td>⭐ {r.rating}</td>

                <td className="space-x-3">
                  <button className="text-blue-500 hover:underline">
                    Edit
                  </button>

                  <button
                    onClick={() => deleteRecipe(r.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />

      <RecipeModal open={open} setOpen={setOpen} refresh={fetchRecipes} />
    </div>
  );
}
