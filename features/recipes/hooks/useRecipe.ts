import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

export function useRecipe(id: string) {
  return useQuery({
    queryKey: ["recipe", id],
    queryFn: async () => {
      const { data } = await api.get(`/recipes/${id}`);
      return data;
    },
    enabled: !!id,
  });
}