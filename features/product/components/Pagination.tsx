"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface Props {
  totalPages: number;
}

export default function Pagination({ totalPages }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") ?? 1);

  const goToPage = (page: number) => {
    router.push(`/products?page=${page}`);
  };

  return (
    <div className="flex justify-center gap-2 mt-10">
      {Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1;

        return (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={cn(
              "w-10 h-10 rounded-full border text-sm font-medium transition-all",
              currentPage === page
                ? "bg-orange-500 text-white shadow-md scale-105"
                : "bg-white hover:bg-orange-100",
            )}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}
