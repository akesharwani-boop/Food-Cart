import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "../api/admin.api";
import type { RecipesResponse } from "../types";

export const useRecipes = (page: number) => {
  return useQuery<RecipesResponse>({
    queryKey: ["recipes", page],
    queryFn: () => getRecipes(page),
    placeholderData: (previousData) => previousData,
  });
};