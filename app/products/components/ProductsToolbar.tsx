"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

export default function ProductsToolbar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlSearch = searchParams.get("search") ?? "";
  const urlMeal = searchParams.get("meal") ?? "";
  const urlTag = searchParams.get("tag") ?? "";

  const [search, setSearch] = useState(urlSearch);

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set(key, value);
    else params.delete(key);

    params.set("page", "1");

    router.push(`/products?${params.toString()}`);
  };

  useEffect(() => {
    setSearch(urlSearch);
  }, [urlSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== urlSearch) {
        updateParams("search", search);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search, urlSearch]);

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <h1 className="text-3xl font-bold">All Recipes</h1>

      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <Input
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-[250px]"
        />

        <Select
          value={urlMeal}
          onValueChange={(val) => updateParams("meal", val)}
        >
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue placeholder="Meal Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="snack">Snack</SelectItem>
            <SelectItem value="lunch">Lunch</SelectItem>
            <SelectItem value="dinner">Dinner</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={urlTag}
          onValueChange={(val) => updateParams("tag", val)}
        >
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue placeholder="Tag" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Indian">Indian</SelectItem>
            <SelectItem value="Pakistani">Pakistani</SelectItem>
            <SelectItem value="Italian">Italian</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
