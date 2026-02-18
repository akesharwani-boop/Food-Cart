import { api } from "@/lib/axios";
import type { Recipe, RecipePayload, RecipesResponse } from "../types";

export const getRecipes = async (page: number): Promise<RecipesResponse> => {
  const limit = 10;
  const skip = (page - 1) * limit;

  const { data } = await api.get<RecipesResponse>(
    `/recipes?limit=${limit}&skip=${skip}`,
  );

  return data;
};

export const addRecipe = async (payload: RecipePayload): Promise<Recipe> => {
  const { data } = await api.post<Recipe>("/recipes/add", payload);
  return data;
};

export const updateRecipe = async (
  id: number,
  payload: RecipePayload,
): Promise<Recipe> => {
  const { data } = await api.put<Recipe>(`/recipes/${id}`, payload);
  return data;
};

export const deleteRecipe = async (
  id: number,
): Promise<{ id: number; isDeleted: boolean }> => {
  const { data } = await api.delete(`/recipes/${id}`);
  return data;
};
