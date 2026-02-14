"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addtoCart } from "@/features/cart/cartSlice";
import { useState } from "react";

export default function ProductDetailClient({
  product,
  price,
}: any) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    dispatch(
      addtoCart({
        id: product.id,
        name: product.name,
        image: product.image,
        price,
        quantity,
      })
    );
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="grid gap-10 md:grid-cols-2">
        
        {/* IMAGE */}
        <div className="relative h-[500px] w-full overflow-hidden rounded-xl">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="50vw"
            className="object-cover rounded-xl"
          />
        </div>

        {/* DETAILS */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 text-yellow-500">
            ⭐ {product.rating}
            <span className="text-sm text-muted-foreground">
              ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="text-2xl font-semibold text-orange-600">
            ₹{price}
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center rounded-lg border">
              <button
                onClick={() =>
                  setQuantity((prev) => Math.max(1, prev - 1))
                }
                className="px-4 py-2"
              >
                -
              </button>
              
              <span className="px-4">{quantity}</span>

              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="px-4 py-2"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={handleAddToCart}
              className="flex-1 bg-orange-500 hover:bg-orange-600"
            >
              Add to Cart
            </Button>

            <Button
              variant="outline"
              className="flex-1 border-orange-500 text-orange-600"
            >
              Buy Now
            </Button>
          </div>

          {/* Description */}
          <div className="pt-6">
            <h2 className="text-lg font-semibold">Description</h2>
            <p className="text-muted-foreground mt-2">
              A delicious {product.cuisine} dish.
              Preparation time: {product.prepTimeMinutes} mins.
            </p>
          </div>

          {/* Ingredients */}
          <div>
            <h2 className="text-lg font-semibold">Ingredients</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
              {product.ingredients?.map(
                (item: string, index: number) => (
                  <li key={index}>{item}</li>
                )
              )}
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <h2 className="text-lg font-semibold">Instructions</h2>
            <p className="mt-2 text-muted-foreground whitespace-pre-line">
              {product.instructions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}