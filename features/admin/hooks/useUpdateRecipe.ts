
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateRecipeVariables, RecipesResponse } from "../types";
import toast from "react-hot-toast";
import { updateRecipe } from "../api/admin.api";

export const useUpdateRecipe = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateRecipeVariables) =>
      updateRecipe(id, data),
    onMutate: async ({ id, data }) => {
      await qc.cancelQueries({ queryKey: ["recipes"] });

      const previousRecipes = qc.getQueriesData<RecipesResponse>({
        queryKey: ["recipes"],
      });
      qc.setQueriesData<RecipesResponse>(
        { queryKey: ["recipes"] },
        (old) => {
          if (!old) return old;

          return {
            ...old,
            recipes: old.recipes.map((item) =>
              item.id === id ? { ...item, ...data } : item
            ),
          };
        }
      );

      return { previousRecipes };
    },

    onError: (err, variables, context) => {
      if (context?.previousRecipes) {
        context.previousRecipes.forEach(([key, value]) => {
          qc.setQueryData(key, value);
        });
      }
      toast.error("Update failed. Rolled back.");
    },

    onSettled: () => {
      setTimeout(()=>{
      qc.invalidateQueries({queryKey:['recipes']})
      },9000)
    },

    onSuccess: () => {
      toast.success("Recipe updated successfully");
    },
  

  });
};
