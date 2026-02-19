"use client";

import { useSearchParams } from "next/navigation";
import { useRecipes } from "@/features/admin/hooks/useRecipes";
import RecipesTable from "@/features/admin/components/RecipesTable";
import { useDeleteRecipe } from "@/features/admin/hooks/useDeleteRecipe";
import { Button } from "@/components/ui/button";
import AdminPagination from "@/components/shared/AdminPagination";
import { useState } from "react";
import RecipeFormModal from "@/features/admin/components/RecipeFormModal";
import { useAddRecipe } from "@/features/admin/hooks/useAddRecipe";
import { useUpdateRecipe } from "@/features/admin/hooks/useUpdateRecipe";
import type { Recipe } from "@/features/admin/types";
import DeleteConfirmDialog from "@/features/admin/components/DeleteConfirmDialog";
export default function ManageRecipesPage() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading } = useRecipes(page);
  const deleteMutation = useDeleteRecipe();

  const [open, setOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const addMutation = useAddRecipe();
  const updateMutation = useUpdateRecipe();
  const [deleteId, setDeleteId] = useState<number | null>(null);

  if (isLoading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Recipes</h1>

        <Button
          className="bg-orange-500 hover:bg-orange-600 text-white"
          onClick={() => {
            setSelectedRecipe(null); // new recipe
            setOpen(true);
          }}
        >
          Add Item
        </Button>
      </div>

      {data && (
        <>
          <RecipesTable
            data={data.recipes}
            onEdit={(item) => {
                console.log("Editing item id:", item.id); 
              setSelectedRecipe(item);
              setOpen(true);
            }}
            onDelete={(id) => setDeleteId(id)}
          />
          <RecipeFormModal
            open={open}
            setOpen={setOpen}
            initialValues={
              selectedRecipe || {
                name: "",
                tags: [],
                mealType: [],
              }
            }
            onSubmit={(values) => {
              if (selectedRecipe) {
                updateMutation.mutate({ id: selectedRecipe.id, data: values });
              } else {
                addMutation.mutate(values);
              }
            }}
          />

          <div className="flex justify-center mt-6">
            <AdminPagination
              totalPages={Math.ceil(data.total / 10)}
              basePath="/admin/manage-recipes"
            />
          </div>
        </>
      )}
      <DeleteConfirmDialog
        open={deleteId !== null}
        setOpen={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) {
            deleteMutation.mutate(deleteId);
            setDeleteId(null);
          }
        }}
      />
      
    </div>
  );
}
