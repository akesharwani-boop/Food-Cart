"use client";

import { useSearchParams } from "next/navigation";
import { useRecipes } from "@/features/recipes/hooks/useRecipes";
import ProductGrid from "@/features/product/components/ProductGrid";
import PaginationComponent from "@/components/shared/PaginationComponent";
import ProductsToolbar from "./components/ProductsToolbar";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchRecipes } from "@/features/recipes/api/fetchRecipes";
export default function ProductsPage() {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") ?? 1);
  const search = searchParams.get("search") ?? undefined;
  const tag = searchParams.get("tag") ?? undefined;
  const meal = searchParams.get("meal") ?? undefined;
  const queryClient = useQueryClient();
  const { data, isFetching, isError } = useRecipes({
    page,
    search,
    tag,
    meal,
  });
  useEffect(() => {
  if (!data) return;

  const totalPages = Math.ceil(data.total / 8);

  // 🔹 Prefetch NEXT page
  if (page < totalPages) {
    queryClient.prefetchQuery({
      queryKey: ["recipes", page + 1, search ?? "", tag ?? "", meal ?? ""],
      queryFn: () =>
        fetchRecipes({
          page: page + 1,
          search,
          tag,
          meal,
        }),
    });
  }

  // 🔹 Prefetch PREVIOUS page
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["recipes", page - 1, search ?? "", tag ?? "", meal ?? ""],
      queryFn: () =>
        fetchRecipes({
          page: page - 1,
          search,
          tag,
          meal,
        }),
    });
  }
}, [page, data, search, tag, meal, queryClient]);
  if (!data) return <p>Loading...</p>;
  if (isError) return <p>Error loading data</p>;

  if (!data || !data.recipes) {
    return <p>No data found</p>;
  }

  const totalPages = Math.ceil(data.total / 8);
  return (
    <div className="container mx-auto px-6 py-10 space-y-8">
      <ProductsToolbar />

      <ProductGrid  products={data.recipes} total={data.total} page={page} 
      />
       {isFetching && <p className="text-sm">Updating...</p>}
      <PaginationComponent currentPage={page} totalPages={totalPages} />
    </div>
  );
}
