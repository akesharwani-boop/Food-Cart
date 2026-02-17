import ProductDetailClient from "./ProductDetailClient";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetail({ params }: Props) {
  const { id } = await params;   

  return <ProductDetailClient id={id} />;
}