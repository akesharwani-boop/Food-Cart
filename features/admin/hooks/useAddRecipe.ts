import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addRecipe } from "../api/admin.api";
import type { Recipe, RecipePayload } from "../types";
import toast from "react-hot-toast";

export const useAddRecipe = () => {
  const qc = useQueryClient();

  return useMutation<Recipe, Error, RecipePayload>({
    mutationFn: (data) => addRecipe(data),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["recipes"] });
      toast.success("Recipe added successfully");
    },
  });
};
