import ProductCard from "./ProductCard";
import Pagination from "./Pagination";

interface ProductGridProps {
  products: any[];
  total: number;
  page: number;
}

export default function ProductGrid({
  products,
  total,
  page,
}: ProductGridProps) {
  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination total={total} page={page} />
    </>
  );
}
