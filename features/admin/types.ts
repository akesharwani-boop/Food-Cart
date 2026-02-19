export interface Recipe {
  id: number;
  name: string;
  image: string;
  tags: string[];
  mealType: string[];
  cuisine: string;
  rating: number;
}

export interface RecipesResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}

export interface RecipePayload {
  name: string;
  // image: string;
  tags: string[];
  mealType: string[];
}
export interface UpdateRecipeVariables {
  id: number;
  data: RecipePayload;
}

