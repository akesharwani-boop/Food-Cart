import { Metadata } from "next";
import ProductGrid from "@/features/product/components/ProductGrid";
import Pagination from "@/features/product/components/Pagination";

export const metadata: Metadata = {
  title: "Products | Cooking Healthy Food",
};

interface ProductsPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {

  // ✅ VERY IMPORTANT (Next 15 fix)
  const params = await searchParams;

  const page = Number(params?.page ?? 1);

  const limit = 8;
  const skip = (page - 1) * limit;

  const res = await fetch(
    `https://dummyjson.com/recipes?limit=${limit}&skip=${skip}`,
    { cache: "no-store" }
  );

  const data = await res.json();

  const totalPages = Math.ceil(data.total / limit);

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">All Recipes</h1>

      <ProductGrid
        products={data.recipes}
        total={data.total}
        page={page}
      />

      <Pagination totalPages={totalPages} />
    </div>
  );
}