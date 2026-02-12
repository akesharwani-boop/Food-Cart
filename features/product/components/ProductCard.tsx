"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProductCard({ product }: { product: any }) {
  return (
    <Card className="overflow-hidden transition hover:shadow-lg">
      <div className="relative h-48 w-full">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw,
         (max-width: 1200px) 50vw,
         33vw"
          className="object-cover"
        />
      </div>

      <CardContent className="space-y-3 p-4">
        <h2 className="text-lg font-semibold line-clamp-1">{product.name}</h2>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.cuisine}
        </p>

        <Button className="w-full bg-orange-500 hover:bg-orange-600">
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
