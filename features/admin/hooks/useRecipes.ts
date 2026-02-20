import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "../api/admin.api";
import type { RecipesResponse } from "../types";

export const useRecipes = (page: number) => {
  return useQuery<RecipesResponse>({
    queryKey: ["recipes", page],
    queryFn: () => getRecipes(page),
    placeholderData: (previousData) => previousData,
    // staleTime: 1000 * 60 * 5, // 5 minutes fresh
  // cacheTime: 1000 * 60 * 10, // 10 minutes cache me rahe
  });
};