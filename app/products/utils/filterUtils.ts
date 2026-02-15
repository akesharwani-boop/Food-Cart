export interface FilterParams {
  search?: string;
  cuisine?: string;
  rating?: string;
  sort?: string;
}

export function applyFilters(recipes: any[], filters: FilterParams) {
  let filtered = [...recipes];

  // 🔍 Search by name
  if (filters.search) {
    filtered = filtered.filter((r) =>
      r.name.toLowerCase().includes(filters.search!.toLowerCase()),
    );
  }

  //  Cuisine filter
  if (filters.cuisine) {
    filtered = filtered.filter(
      (r) => r.cuisine.toLowerCase() === filters.cuisine!.toLowerCase(),
    );
  }

  //  Rating filter (e.g. 4 means 4 & above)
  if (filters.rating) {
    filtered = filtered.filter((r) => r.rating >= Number(filters.rating));
  }

  //  Price sort (generated price logic)
  if (filters.sort === "price-high") {
    filtered.sort((a, b) => 200 + b.id * 12 - (200 + a.id * 12));
  }

  if (filters.sort === "price-low") {
    filtered.sort((a, b) => 200 + a.id * 12 - (200 + b.id * 12));
  }

  if (filters.sort === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return filtered;
}
