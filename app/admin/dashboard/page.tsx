"use client";

import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="p-6 grid gap-6 md:grid-cols-2">
      <Link
        href="/admin/manage-recipes"
        className="border border-orange-300 p-6 rounded hover:border-orange-500"
      >
        <h2 className="text-xl font-bold text-orange-600">Manage Recipes</h2>
      </Link>
    </div>
  );
}
