"use client";

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "@/features/cart/cartSlice";

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">
        Your Cart ({cartItems.length} items)
      </h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-10">
          {/* LEFT: Items */}
          <div className="md:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border rounded-xl p-4 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-24 w-24">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  <div>
                    <h2 className="font-semibold text-lg">
                      {item.name}
                    </h2>
                    <p className="text-orange-600 font-medium">
                      ₹{item.price}
                    </p>

                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-sm text-red-500 mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-4">
                  <div className="flex border rounded-lg">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      className="px-3 py-1"
                    >
                      -
                    </button>

                    <span className="px-4 py-1">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => dispatch(increaseQuantity(item.id))}
                      className="px-3 py-1"
                    >
                      +
                    </button>
                  </div>

                  <div className="font-semibold">
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Summary */}
          <div className="border rounded-xl p-6 shadow-sm h-fit">
            <h2 className="text-xl font-semibold mb-4">
              Order Summary
            </h2>

            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between mb-4">
              <span>Delivery</span>
              <span className="text-green-600">Free</span>
            </div>

            <div className="border-t pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{subtotal}</span>
            </div>

            <button className="mt-6 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}