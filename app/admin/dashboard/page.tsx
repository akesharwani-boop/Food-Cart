import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <Link
          href="/admin/recipes"
          className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold">Manage Recipes</h2>
        </Link>

        <Link
          href="/admin/users"
          className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold">Manage Users</h2>
        </Link>
      </div>
    </div>
  );
}
