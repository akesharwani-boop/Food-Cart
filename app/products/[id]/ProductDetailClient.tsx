"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addtoCart } from "@/features/cart/cartSlice";
import { useState } from "react";
import { useRecipe } from "@/features/recipes/hooks/useRecipe";
import { generatePrice } from "@/lib/price";

interface Props {
  id: string;
}

export default function ProductDetailClient({ id }: Props) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading, isError } = useRecipe(id);

  if (isLoading) return <div className="p-10">Loading...</div>;
  if (isError || !product) return <div className="p-10">Product not found</div>;

  const price = generatePrice(product.id);

  const handleAddToCart = () => {
    dispatch(
      addtoCart({
        id: product.id,
        name: product.name,
        image: product.image,
        price,
        quantity,
      }),
    );
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative h-[500px] w-full overflow-hidden rounded-xl">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-xl"
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <div className="text-2xl font-semibold text-orange-600">₹{price}</div>
          {/* Quantity */}
          <div className="flex items-center gap-4">
            <span className="font-medium">Quantity:</span>

            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200">
                -
              </button>

              <span className="px-4">{quantity}</span>

              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200">
                +
              </button>
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={handleAddToCart}
              className="flex-1 bg-orange-500 hover:bg-orange-600">
              Add to Cart
            </Button>
          </div>

          <div>
            <h2 className="font-semibold">Description</h2>
            <p className="text-muted-foreground">
              {product.cuisine} • Prep {product.prepTimeMinutes} mins
            </p>
          </div>

          <div>
            <h2 className="font-semibold">Ingredients</h2>
            <ul className="list-disc pl-5">
              {product.ingredients?.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-semibold">Instructions</h2>
            <ul className="list-decimal pl-5 space-y-1 text-muted-foreground">
              {product.instructions?.map((step: string, index: number) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
