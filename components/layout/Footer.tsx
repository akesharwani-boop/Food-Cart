"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 bg-[#f5f3ef] border-t">
      <div className="container mx-auto px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Column 1 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Get To Know Us</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#">About Us</Link>
              </li>
              <li>
                <Link href="#">Team</Link>
              </li>
              <li>
                <Link href="#">Internship</Link>
              </li>
              <li>
                <Link href="#">Partner With Us</Link>
              </li>
              <li>
                <Link href="#">Blog</Link>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Customer Care</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#">FAQ</Link>
              </li>
              <li>
                <Link href="#">Contact Us</Link>
              </li>
              <li>
                <Link href="#">Bulk Orders</Link>
              </li>
              <li>
                <Link href="#">Feedback</Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Policies</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#">Shipping Policy</Link>
              </li>
              <li>
                <Link href="#">Refund Policy</Link>
              </li>
              <li>
                <Link href="#">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Social */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex gap-4 text-gray-600">
              <Facebook className="hover:text-orange-500 cursor-pointer" />
              <Instagram className="hover:text-orange-500 cursor-pointer" />
              <Linkedin className="hover:text-orange-500 cursor-pointer" />
              <Twitter className="hover:text-orange-500 cursor-pointer" />
            </div>
          </div>

          {/* Column 5 - Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              Subscribe to Food-letter!
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Get amazing offers & new food launches.
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Email address"
                className="w-full rounded-l-md border px-3 py-2 text-sm focus:outline-none"
              />
              <button className="bg-orange-600 hover:bg-orange-500 text-white px-4 rounded-r-md transition">
                Sign Up
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Cooking Healthy Food. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
