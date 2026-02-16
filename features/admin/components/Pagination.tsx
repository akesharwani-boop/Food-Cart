"use client";

interface Props {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export default function Pagination({ page, totalPages, setPage }: Props) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (page > 3) pages.push("...");

      for (
        let i = Math.max(2, page - 1);
        i <= Math.min(totalPages - 1, page + 1);
        i++
      ) {
        pages.push(i);
      }

      if (page < totalPages - 2) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPages();

  return (
    <div className="flex justify-center items-center gap-3 mt-8 flex-wrap">
      {/* Prev */}
      <button
        onClick={() => page > 1 && setPage(page - 1)}
        className="w-10 h-10 rounded-full border hover:bg-gray-100"
      >
        {"<"}
      </button>

      {pages.map((p, index) =>
        p === "..." ? (
          <span key={index} className="px-2 text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => setPage(p as number)}
            className={`w-10 h-10 rounded-full border transition-all duration-200
              ${
                page === p
                  ? "bg-orange-500 text-white border-orange-500 shadow-md scale-110"
                  : "bg-white hover:bg-gray-100"
              }`}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => page < totalPages && setPage(page + 1)}
        className="w-10 h-10 rounded-full border hover:bg-gray-100"
      >
        {">"}
      </button>
    </div>
  );
}