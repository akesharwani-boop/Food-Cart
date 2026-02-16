"use client";

import { useSearchParams } from "next/navigation";
import { useRecipes } from "@/features/recipes/hooks/useRecipes";
import ProductGrid from "@/features/product/components/ProductGrid";
import PaginationComponent from "@/components/shared/PaginationComponent";
import ProductsToolbar from "./components/ProductsToolbar";

export default function ProductsPage() {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") ?? 1);
  const search = searchParams.get("search") ?? undefined;
  const tag = searchParams.get("tag") ?? undefined;
  const meal = searchParams.get("meal") ?? undefined;

  const { data, isLoading } = useRecipes({
    page,
    search,
    tag,
    meal,
  });

  if (isLoading) return <p>Loading...</p>;

  const totalPages = Math.ceil(data.total / 8);

  return (
    <div className="container mx-auto px-6 py-10 space-y-8">
      <ProductsToolbar />

      <ProductGrid products={data.recipes} total={data.total} page={page} />

      <PaginationComponent currentPage={page} totalPages={totalPages} />
    </div>
  );
}
