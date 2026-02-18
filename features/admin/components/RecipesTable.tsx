"use client";

import { Pencil, Trash } from "lucide-react";
import type { Recipe } from "../types";
import Image from "next/image";

interface Props {
  data: Recipe[];
  onEdit: (item: Recipe) => void;
  onDelete: (id: number) => void;
}

export default function RecipesTable({ data, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead className="bg-orange-100 text-left">
          <tr>
            <th className="p-3">Image</th>
            <th className="p-3">Name</th>
            <th className="p-3">Tags</th>
            <th className="p-3">Meal Type</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-3">
                <Image
                  src={item.image}
                  alt={item.name}
                  className="h-12 w-12 rounded object-cover"
                  height={48}
                  width={48}
                />
              </td>

              <td className="p-3 font-medium">{item.name}</td>

              <td className="p-3">{item.tags?.join(", ") || "-"}</td>

              <td className="p-3">{item.mealType?.join(", ") || "-"}</td>

              <td className="p-3 flex gap-3">
                <Pencil
                  className="cursor-pointer text-orange-500 hover:scale-110 transition"
                  onClick={() => onEdit(item)}
                />
                <Trash
                  className="cursor-pointer text-red-500 hover:scale-110 transition"
                  onClick={() => onDelete(item.id)}
                />
              </td>
            </tr>
            
          ))}
        </tbody>
      </table>
    </div>
  );
}
