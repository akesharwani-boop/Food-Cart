import ProductDetailClient from "./ProductDetailClient";

interface ProductDetailProps {
  params: {
    id: string;
  };
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(`https://dummyjson.com/recipes/${id}`, {
    cache: "no-store",
  });

  const product = await res.json();

  const price = 296 + (product.id + 10) * 8;

  return <ProductDetailClient product={product} price={price} />;
}
