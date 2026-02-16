"use client";

import { useEffect, useState } from "react";
import Pagination from "@/features/admin/components/Pagination";
import UserModal from "@/features/admin/components/UserModal";
import DeleteModal from "@/features/admin/components/DeleteModal";
import toast from "react-hot-toast";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phone: string;
  role: string;
  image: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);

  const limit = 6;

 const [totalPages, setTotalPages] = useState(1);

const fetchUsers = async () => {
  const skip = (page - 1) * limit;

  const res = await fetch(
    `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
  );

  const data = await res.json();

  setUsers(data.users);
  setTotalPages(Math.ceil(data.total / limit));
};
  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleDelete = async () => {
    if (!deleteUserId) return;

    await fetch(`https://dummyjson.com/users/${deleteUserId}`, {
      method: "DELETE",
    });

    setUsers((prev) => prev.filter((u) => u.id !== deleteUserId));
    toast.success("User deleted successfully ✅");
    setDeleteUserId(null);
  };


  return (
    <div className="p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <button
          onClick={() => {
            setEditUser(null);
            setOpen(true);
          }}
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          Add User
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Profile</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Role</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <Image
                    src={u.image}
                    alt={u.firstName}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </td>
                <td>
                  {u.firstName} {u.lastName}
                </td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>{u.role}</td>
                <td>{u.age}</td>

                <td className="flex gap-3 items-center">
                  <Pencil
                    size={18}
                    className="text-blue-500 cursor-pointer"
                    onClick={() => {
                      setEditUser(u);
                      setOpen(true);
                    }}
                  />
                  <Trash2
                    size={18}
                    className="text-red-500 cursor-pointer"
                    onClick={() => setDeleteUserId(u.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    <Pagination page={page} totalPages={totalPages} setPage={setPage} />

      <UserModal
        open={open}
        setOpen={setOpen}
        editUser={editUser}
        refresh={fetchUsers}
      />

      <DeleteModal
        open={!!deleteUserId}
        onClose={() => setDeleteUserId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
