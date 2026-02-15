"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ProductsToolbar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.set("page", "1"); // reset page on filter change
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

      {/* Left Title */}
      <h1 className="text-3xl font-bold">All Recipes</h1>

      {/* Filters Section */}
      <div className="flex flex-wrap gap-3">

        {/* Search */}
        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            updateParams("search", e.target.value);
          }}
          className="rounded-md border px-3 py-2 text-sm"
        />

        {/* Cuisine */}
        <select
          onChange={(e) => updateParams("cuisine", e.target.value)}
          className="rounded-md border px-3 py-2 text-sm"
        >
          <option value="">All Cuisines</option>
          <option value="Italian">Italian</option>
          <option value="Asian">Asian</option>
          <option value="Pakistani">Pakistani</option>
          <option value="Indian">Indian</option>
          <option value="American">American</option>
        </select>

        {/* Rating */}
        <select
          onChange={(e) => updateParams("rating", e.target.value)}
          className="rounded-md border px-3 py-2 text-sm"
        >
          <option value="">All Ratings</option>
          <option value="4.5">4.5+</option>
          <option value="4">4+</option>
        </select>

        {/* Sort */}
        <select
          onChange={(e) => updateParams("sort", e.target.value)}
          className="rounded-md border px-3 py-2 text-sm"
        >
          <option value="">Sort</option>
          <option value="price-low">Price: Low → High</option>
          <option value="price-high">Price: High → Low</option>
          <option value="rating-high">Rating: High → Low</option>
        </select>
      </div>
    </div>
  );
}