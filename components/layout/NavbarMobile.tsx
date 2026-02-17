"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";

interface Props {
  mobileOpen: boolean;
  search: string;
  setSearch: (value: string) => void;
  handleSearch: () => void;
  setMobileOpen: (value: boolean) => void;
  handleLogout: () => void;
  navLinks: { name: string; href: string }[];
}

export default function NavbarMobile({
  mobileOpen,
  search,
  setSearch,
  handleSearch,
  setMobileOpen,
  handleLogout,
  navLinks,
}: Props) {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );

  const role = user?.role;

  if (!mobileOpen) return null;

  return (
    <div className="border-t bg-white p-4 space-y-4 shadow-md md:hidden">
      {/* Search */}
      <div className="flex items-center rounded-md border px-3 py-2 focus-within:ring-2 focus-within:ring-orange-400">
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 bg-transparent text-sm outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>
          <Search size={18} />
        </button>
      </div>

      {/* Links */}
      {navLinks.map((link) => (
        <Link
          key={link.name}
          href={isAuthenticated ? link.href : "/login"}
          onClick={() => setMobileOpen(false)}
          className="block text-sm font-medium text-gray-700 hover:text-orange-500"
        >
          {link.name}
        </Link>
      ))}

      {isAuthenticated && user ? (
        <>
          <div className="text-sm font-medium">
            {role === "admin" ? "Admin" : user.firstName}
          </div>

          {role === "admin" && (
            <Link href="/admin/dashboard">
              <Button variant="outline" className="w-full">
                Dashboard
              </Button>
            </Link>
          )}

          <Button
            variant="outline"
            onClick={() => {
              handleLogout();
              setMobileOpen(false);
            }}
            className="w-full text-red-500"
          >
            Logout
          </Button>
        </>
      ) : (
        <Link href="/login">
          <Button variant="outline" className="w-full">
            Login
          </Button>
        </Link>
      )}
    </div>
  );
}
