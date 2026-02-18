import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRecipe } from "../api/admin.api";
import type { Recipe, UpdateRecipeVariables } from "../types";
import toast from "react-hot-toast";

export const useUpdateRecipe = () => {
  const qc = useQueryClient();

  return useMutation<Recipe, Error, UpdateRecipeVariables>({
    mutationFn: ({ id, data }) => updateRecipe(id, data),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["recipes"] });
      toast.success("Recipe updated successfully");
    },
  });
};
