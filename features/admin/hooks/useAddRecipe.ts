import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addRecipe } from "../api/admin.api";
import type { Recipe, RecipePayload } from "../types";
import toast from "react-hot-toast";
import { RecipesResponse } from "../types";
export const useAddRecipe = () => {
  const qc = useQueryClient();

 return useMutation<Recipe, Error, RecipePayload>({
  mutationFn: addRecipe,

  onSuccess: (newRecipe) => {
    qc.setQueriesData<RecipesResponse>(
      { queryKey: ["recipes"], exact: false },
      (old) => {
        if (!old) return old;

        return {
          ...old,
          recipes: [newRecipe, ...old.recipes], 
        };
      }
    );

    toast.success("Recipe added successfully");
  },
});

};
