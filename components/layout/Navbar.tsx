"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, ShoppingCart, Search, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { logout } from "@/features/auth/authSlice";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");

  const role = user?.role;

  const navLinks = [
    { name: "Sweets", href: "/products" },
    { name: "Snacks", href: "/products" },
    { name: "Staples", href: "/products" },
    { name: "Healthy", href: "/products" },
    { name: "Quick Help", href: "/products" },
  ];

  //  Protected Search
  const handleSearch = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (search.trim() !== "") {
      router.push(`/products?search=${search}`);
      setSearch("");
      setMobileOpen(false);
    }
  };

  //  Logout Handler
  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* ================= TOP ROW ================= */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Cooking Healthy Food"
            width={80}
            height={80}
            priority
          />
        </Link>

        {/* DESKTOP SEARCH */}
        <div className="hidden w-1/2 items-center rounded-md border bg-gray-50 px-4 py-2 transition focus-within:ring-2 focus-within:ring-orange-400 md:flex">
          <input
            type="text"
            placeholder="What would you like to eat?"
            className="flex-1 bg-transparent text-sm outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
          >
            <Search size={18} />
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-6">
          {isAuthenticated && user ? (
            <div className="hidden md:flex items-center gap-4">
              {/* Admin Dashboard */}
              {role === "admin" && (
                <Link
                  href="/admin/dashboard"
                  className="text-sm font-medium hover:text-orange-500"
                >
                  Dashboard
                </Link>
              )}

              {/* Username */}
              <span className="text-sm font-medium">
                {role === "admin" ? "Admin" : user.firstName}
              </span>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="text-sm text-red-500 hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden text-sm font-medium hover:text-orange-500 md:block"
              >
                Login
              </Link>
            </>
          )}

          {/* CART (Protected) */}
          <Link
            href={isAuthenticated ? "/cart" : "/login"}
            className="relative"
          >
            <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-orange-500 transition" />
            {cartCount > 0 && isAuthenticated && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-orange-500 px-1 text-xs font-medium text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* ================= DESKTOP NAV ================= */}
      <div className="hidden border-t bg-gray-50 md:block">
        <div className="mx-auto flex max-w-7xl items-center gap-8 px-6 py-3 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={isAuthenticated ? link.href : "/login"}
              className={`transition hover:text-orange-500 ${
                pathname === link.href ? "text-orange-500" : "text-gray-700"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      {/* ================= MOBILE DRAWER ================= */}
      {mobileOpen && (
        <div className="border-t bg-white p-4 space-y-4 shadow-md md:hidden">
          {/* Mobile Search */}
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

          {/* Mobile Links */}
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
            <>
              <Link href="/login">
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
