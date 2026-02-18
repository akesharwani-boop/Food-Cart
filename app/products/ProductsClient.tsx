"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import ProductGrid from "@/features/product/components/ProductGrid";
// import Pagination from "@/features/product/components/Pagination";
import ProductsToolbar from "./components/ProductsToolbar";

interface Props {
  searchParams: {
    page?: string;
    search?: string;
    tag?: string;
    meal?: string;
  };
}

export default function ProductsClient({ searchParams }: Props) {
  const page = Number(searchParams.page ?? 1);
  const limit = 8;
  const skip = (page - 1) * limit;

  const { data, isLoading } = useQuery({
    queryKey: ["recipes", searchParams],
    queryFn: async () => {
      //  SEARCH API
      if (searchParams.search) {
        const res = await api.get(
          `/recipes/search?q=${searchParams.search}`
        );
        return res.data;
      }

      //  TAG API
      if (searchParams.tag) {
        const res = await api.get(
          `/recipes/tag/${searchParams.tag}`
        );
        return res.data;
      }

      // MEAL TYPE API
      if (searchParams.meal) {
        const res = await api.get(
          `/recipes/meal-type/${searchParams.meal}`
        );
        return res.data;
      }

      //  DEFAULT PAGINATED
      const res = await api.get(
        `/recipes?limit=${limit}&skip=${skip}`
      );
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <ProductsToolbar />

      <ProductGrid
        products={data.recipes}
        total={data.total}
        page={page}
      />

      {/* <Pagination totalPages={Math.ceil(data.total / limit)} /> */}
    </>
  );
}