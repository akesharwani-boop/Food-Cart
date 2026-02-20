// import { useQuery } from "@tanstack/react-query";
// import { api } from "@/lib/axios";

// interface Params {
//   page: number;
//   search?: string;
//   tag?: string;
//   meal?: string;
// }

// export function useRecipes({ page, search, tag, meal }: Params) {
//   const limit = 8;
//   const skip = (page - 1) * limit;

//   return useQuery({
//     queryKey: ["recipes", page, search, tag, meal],
//     queryFn: async () => {
//       let endpoint = "/recipes";

//       if (search) {
//         endpoint = `/recipes/search?q=${search}`;
//       } else if (tag) {
//         endpoint = `/recipes/tag/${tag}`;
//       } else if (meal) {
//         endpoint = `/recipes/meal-type/${meal}`;
//       }

//       const { data } = await api.get(endpoint, {
//         params: { limit, skip },
//       });
//       console.log("data", data);
//       return data;
//     },
//     staleTime: 1000 * 60 * 5, // 5 min fresh
//     gcTime: 1000 * 60 * 10, // cacheTime
//     refetchOnWindowFocus: false,

//     placeholderData: (prev) => prev,
//   });
// }
import { useQuery } from "@tanstack/react-query";
import { fetchRecipes ,Params} from "../api/fetchRecipes";

export function useRecipes({ page, search, tag, meal }: Params) {
  return useQuery({
    queryKey: ["recipes", page, search ?? "", tag ?? "", meal ?? ""],
    queryFn: () => fetchRecipes({ page, search, tag, meal }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
  });
}