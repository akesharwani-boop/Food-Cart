import { api } from "@/lib/axios";

export interface Params {
  page: number;
  search?: string;
  tag?: string;
  meal?: string;
}

export async function fetchRecipes({ page, search, tag, meal }: Params) {
  const limit = 8;
  const skip = (page - 1) * limit;

  let endpoint = "/recipes";

  if (search) {
    endpoint = `/recipes/search?q=${search}`;
  } else if (tag) {
    endpoint = `/recipes/tag/${tag}`;
  } else if (meal) {
    endpoint = `/recipes/meal-type/${meal}`;
  }

  const { data } = await api.get(endpoint, {
    params: { limit, skip },
  });

  return data;
}
