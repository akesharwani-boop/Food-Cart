"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Clock } from "lucide-react";
import { useDispatch } from "react-redux";
import { addtoCart } from "@/features/cart/cartSlice";

interface Recipe {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviewCount?: number;
  prepTimeMinutes?: number;
  cuisine?: string;
}

export default function ProductCard({ product }: { product: Recipe }) {
  const dispatch = useDispatch();

  const price = 296 + (product.id + 10) * 8;

  const handleAddToCart = () => {
    dispatch(
      addtoCart({
        id: product.id,
        name: product.name,
        image: product.image,
        price: price,
        quantity: 1,
      })
    );
  };

  return (
    <Card className="group overflow-hidden rounded-xl border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      
      {/* Image */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw,
                 (max-width: 1200px) 50vw,
                 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <CardContent className="space-y-3 p-4">

        {/* Title */}
        <h2 className="text-lg font-semibold line-clamp-1">
          {product.name}
        </h2>

        {/* Cuisine + Price */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 line-clamp-1">
            {product.cuisine}
          </p>

          <span className="text-sm font-semibold text-orange-500">
            ₹{price}
          </span>
        </div>

        {/* Rating + Prep Time */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span>{product.rating}</span>
            {product.reviewCount && (
              <span className="text-gray-400">
                ({product.reviewCount})
              </span>
            )}
          </div>

          {product.prepTimeMinutes && (
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{product.prepTimeMinutes} min</span>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            onClick={handleAddToCart}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-sm"
          >
            Add to Cart
          </Button>

          <Link href={`/products/${product.id}`} className="flex-1">
            <Button
              variant="outline"
              className="w-full border-orange-500 text-orange-500 hover:bg-orange-50 text-sm"
            >
              View
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}