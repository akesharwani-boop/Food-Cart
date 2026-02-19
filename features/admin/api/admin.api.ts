import { api } from "@/lib/axios";
import type { Recipe, RecipePayload, RecipesResponse } from "../types";
import axios from "axios";
export const getRecipes = async (page: number): Promise<RecipesResponse> => {
  const limit = 10;
  const skip = (page - 1) * limit;

  const { data } = await api.get<RecipesResponse>(
    `/recipes?limit=${limit}&skip=${skip}`,
  );

  return data;
};

export const addRecipe = async (payload: RecipePayload): Promise<Recipe> => {
  const randomImage = "https://cdn.dummyjson.com/recipe-images/1.webp";

  const { data } = await api.post<Recipe>("/recipes/add", {
    ...payload,
    image: randomImage,
  });

  return data;
};

export const updateRecipe = async (
  id: number,
  payload: RecipePayload
): Promise<Recipe> => {

  const response = await fetch(
    `https://dummyjson.com/recipes/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: payload.name,   
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Update failed");
  }

  return response.json();
};



export const deleteRecipe = async (
  id: number,
): Promise<{ id: number; isDeleted: boolean }> => {
  const { data } = await api.delete(`/recipes/${id}`);
  return data;
};
