"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/");
    }
  }, [user]);

  return <div className="min-h-screen bg-gray-100 p-6">{children}</div>;
}