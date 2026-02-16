"use client";

import Image from "next/image";

interface Column<T> {
  key: keyof T | "actions";
  label: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onDelete?: (id: number) => void;
}

export default function DataTable<T extends { id: number; image?: string }>({
  data,
  columns,
  onDelete,
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className="p-3 text-left">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              {columns.map((col) => {
                if (col.key === "actions") {
                  return (
                    <td key="actions" className="p-3 space-x-3">
                      <button className="text-blue-500 hover:underline">
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete?.(item.id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  );
                }

                if (col.key === "image" && item.image) {
                  return (
                    <td key="image" className="p-3">
                      <Image
                        src={item.image}
                        alt="img"
                        width={40}
                        height={40}
                        className="rounded object-cover"
                      />
                    </td>
                  );
                }

                return (
                  <td key={String(col.key)} className="p-3">
                    {String(item[col.key as keyof T])}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
