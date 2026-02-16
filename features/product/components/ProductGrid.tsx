import ProductCard from "./ProductCard";
interface Recipe {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviewCount?: number;
  prepTimeMinutes?: number;
  cuisine?: string;
}

interface ProductGridProps {
  products: Recipe[];
  total: number;
  page: number;
}

export default function ProductGrid({
  products,
}: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-xl font-semibold text-gray-700">
          No Recipes Found
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Try searching something else.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
     
    </div>
  );
}