import { useQuery } from "@tanstack/react-query";
import { fetchTags } from "../api/fetchTags";

export function useTags() {
  return useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
    staleTime: 1000 * 60 * 10, // 10 min fresh
  });
}