import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRecipe } from "../api/admin.api";
import type { RecipesResponse } from "../types";
import toast from "react-hot-toast";

export const useDeleteRecipe = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteRecipe(id),

    onSuccess: (_, id) => {
      qc.setQueriesData<RecipesResponse>(
        { queryKey: ["recipes"], exact: false },
        (old) => {
          if (!old) return old;

          return {
            ...old,
            recipes: old.recipes.filter((item) => item.id !== id),
            total: old.total - 1, 
          };
        }
      );

      toast.success("Recipe deleted successfully");
    },
  });
};
