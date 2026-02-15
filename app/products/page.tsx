import { Metadata } from "next";
import ProductGrid from "@/features/product/components/ProductGrid";
import Pagination from "@/features/product/components/Pagination";
import { applyFilters } from "./utils/filterUtils";
import ProductsToolbar from "./components/ProductsToolbar";
export const metadata: Metadata = {
  title: "Products | Cooking Healthy Food",
};

interface ProductsPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    cuisine?: string;
    rating?: string;
    sort?: string;
  }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;

  const page = Number(params?.page ?? 1);
  const limit = 8;

  const res = await fetch(`https://dummyjson.com/recipes?limit=100`, {
    cache: "no-store",
  });

  const data = await res.json();

  const filteredRecipes = applyFilters(data.recipes, {
    search: params?.search,
    cuisine: params?.cuisine,
    rating: params?.rating,
    sort: params?.sort,
  });

  const totalPages = Math.ceil(filteredRecipes.length / limit);
  const start = (page - 1) * limit;
  const paginatedRecipes = filteredRecipes.slice(start, start + limit);

  return (
    <div className="container mx-auto px-6 py-10">
     <ProductsToolbar />
     <br></br>
      <ProductGrid
        products={paginatedRecipes}
        total={filteredRecipes.length}
        page={page}
      />

      <Pagination totalPages={totalPages} />
    </div>
  );
}
