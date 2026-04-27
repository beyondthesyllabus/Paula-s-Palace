"use client";

import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="bg-cream-50 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center bg-white p-12 rounded-[3rem] shadow-2xl border border-cream-200">
          <div className="w-24 h-24 bg-cream-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <ShoppingCart className="w-10 h-10 text-gold-500" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-neutral-900 mb-4">Your Collection is Empty</h1>
          <p className="text-neutral-500 mb-10 leading-relaxed">
            Every great journey begins with a single step. Discover our curated collections and start your legacy today.
          </p>
          <Link
            href="/"
            className="inline-block bg-primary-500 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-primary-600 transition-all shadow-xl hover:shadow-primary-100"
          >
            Explore Collections
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = 10; // Fixed shipping cost
  const total = subtotal + shipping;

  return (
    <div className="bg-cream-50 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-5xl font-serif font-bold text-neutral-900">Your Boutique Cart</h1>
          <div className="w-20 h-1 bg-gold-400 mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 xl:gap-16">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={`${item.productId}-${item.size}`}
                className="bg-white rounded-3xl shadow-sm border border-cream-100 p-6 flex flex-col sm:flex-row gap-6 group hover:shadow-xl transition-all duration-500"
              >
                <Link
                  href={`/product/${item.slug}`}
                  className="relative w-32 h-40 flex-shrink-0 bg-cream-50 rounded-2xl overflow-hidden shadow-inner"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </Link>

                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <Link
                      href={`/product/${item.slug}`}
                      className="font-serif text-2xl text-neutral-900 hover:text-primary-500 transition-colors"
                    >
                      {item.name}
                    </Link>
                    <button
                      onClick={() => removeFromCart(item.productId, item.size)}
                      className="text-neutral-300 hover:text-rose-500 transition-colors p-1"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <p className="text-gold-600 font-bold text-xs uppercase tracking-widest mb-4">Size: {item.size}</p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center bg-cream-50 rounded-xl p-1 border border-cream-100">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.size,
                            item.quantity - 1
                          )
                        }
                        className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-lg transition-colors text-neutral-400 hover:text-neutral-900"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-bold text-neutral-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.size,
                            item.quantity + 1
                          )
                        }
                        className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-lg transition-colors text-neutral-400 hover:text-neutral-900"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-xs text-neutral-400 uppercase tracking-widest mb-1">Total</p>
                      <p className="font-bold text-2xl text-neutral-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-neutral-900 text-white rounded-[2.5rem] shadow-2xl p-10 sticky top-32 border border-neutral-800">
              <h2 className="text-3xl font-serif font-bold mb-8">Summary</h2>

              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-center text-neutral-400">
                  <span className="uppercase tracking-widest text-xs font-bold">Subtotal</span>
                  <span className="font-bold text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center text-neutral-400">
                  <span className="uppercase tracking-widest text-xs font-bold">Shipping</span>
                  <span className="font-bold text-white">{formatPrice(shipping)}</span>
                </div>
                <div className="h-px bg-neutral-800"></div>
                <div className="flex justify-between items-center text-xl">
                  <span className="font-serif font-bold">Total</span>
                  <span className="font-bold text-gold-400">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <Link
                  href="/checkout"
                  className="block w-full bg-primary-500 text-white text-center py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-primary-600 transition-all shadow-xl hover:shadow-primary-900/50"
                >
                  Checkout
                </Link>

                <Link
                  href="/"
                  className="block w-full text-center py-3 text-neutral-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
                >
                  Continue Shopping
                </Link>
              </div>
              
              <div className="mt-10 pt-10 border-t border-neutral-800">
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest text-center leading-loose">
                  Secure encrypted checkout<br />
                  Complimentary returns included
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
