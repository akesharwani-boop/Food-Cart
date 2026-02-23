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
import { useTags } from "@/features/admin/hooks/useTags";
export default function ProductsToolbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: tags, isLoading } = useTags();
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

        {/* 🔹 Meal Type Select */}
        <Select
          value={urlMeal || "all"}
          onValueChange={(val) =>
            updateParams("meal", val === "all" ? "" : val)
          }
        >
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue placeholder="Meal Type" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Meals</SelectItem>
            <SelectItem value="breakfast">Breakfast</SelectItem>
            <SelectItem value="lunch">Lunch</SelectItem>
            <SelectItem value="dinner">Dinner</SelectItem>
            <SelectItem value="snack">Snack</SelectItem>
          </SelectContent>
        </Select>

        {/* 🔹 Tag Select (Dynamic from API) */}
        <Select
          value={urlTag || "all"}
          onValueChange={(val) => updateParams("tag", val === "all" ? "" : val)}
        >
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue placeholder="Tag" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Tags</SelectItem>

            {isLoading && (
              <SelectItem value="loading" disabled>
                Loading...
              </SelectItem>
            )}

            {tags?.map((tag: string) => (
              <SelectItem key={tag} value={tag}>
                {tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
