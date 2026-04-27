"use client";

import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const { cart, getCartTotal, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "paypal" | "cod" | "bank_transfer" | "crypto">("cod");
  const [cryptoWallet, setCryptoWallet] = useState("");

  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "Nigeria",
  });

  const subtotal = getCartTotal();
  const shipping = 10;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      if (paymentMethod === "cod") {
        // Cash on Delivery - Create order directly
        const response = await fetch("/api/orders/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerName: formData.name,
            customerEmail: formData.email,
            customerPhone: formData.phone,
            shippingAddress: {
              address: formData.address,
              city: formData.city,
              state: formData.state,
              zip: formData.zip,
              country: formData.country,
            },
            items: cart,
            subtotal,
            shipping,
            total,
            paymentMethod: "cod",
          }),
        });

        const data = await response.json();

        if (response.ok) {
          clearCart();
          router.push(`/order-confirmation/${data.orderNumber}`);
        } else {
          alert(data.error || "Failed to create order");
        }
      } else if (paymentMethod === "stripe") {
        // Stripe Payment
        const response = await fetch("/api/checkout/stripe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerName: formData.name,
            customerEmail: formData.email,
            customerPhone: formData.phone,
            shippingAddress: {
              address: formData.address,
              city: formData.city,
              state: formData.state,
              zip: formData.zip,
              country: formData.country,
            },
            items: cart,
            subtotal,
            shipping,
            total,
          }),
        });

        const data = await response.json();

        if (response.ok && data.sessionId) {
          const stripe = await stripePromise;
          if (stripe) {
            await stripe.redirectToCheckout({ sessionId: data.sessionId });
          }
        } else {
          alert(data.error || "Failed to initialize payment");
        }
      } else if (paymentMethod === "paypal") {
        // PayPal Payment
        alert("PayPal integration coming soon! Please use Cash on Delivery or Stripe.");
      } else if (paymentMethod === "bank_transfer") {
        // Bank Transfer Payment
        const response = await fetch("/api/checkout/bank-transfer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: (session?.user as any)?.id,
            customerName: formData.name,
            customerEmail: formData.email,
            customerPhone: formData.phone,
            shippingAddress: {
              address: formData.address,
              city: formData.city,
              state: formData.state,
              zip: formData.zip,
              country: formData.country,
            },
            items: cart,
            subtotal,
            shipping,
            total,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          clearCart();
          router.push(`/bank-transfer-instructions/${data.orderNumber}?reference=${data.bankReference}`);
        } else {
          alert(data.error || "Failed to create order");
        }
      } else if (paymentMethod === "crypto") {
        // Crypto Payment
        if (!cryptoWallet) {
          alert("Please enter your crypto wallet address");
          setLoading(false);
          return;
        }

        const response = await fetch("/api/checkout/crypto", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: (session?.user as any)?.id,
            customerName: formData.name,
            customerEmail: formData.email,
            customerPhone: formData.phone,
            shippingAddress: {
              address: formData.address,
              city: formData.city,
              state: formData.state,
              zip: formData.zip,
              country: formData.country,
            },
            items: cart,
            subtotal,
            shipping,
            total,
            cryptoWallet,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          clearCart();
          router.push(`/crypto-payment-instructions/${data.orderNumber}?address=${data.cryptoAddress}&amount=${data.amount}`);
        } else {
          alert(data.error || "Failed to create order");
        }
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An error occurred during checkout");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <a href="/" className="text-primary-600 hover:underline">
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      State/Province
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      ZIP/Postal Code
                    </label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Country *
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <div className="space-y-3">
                <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-primary-300 transition">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-4 h-4 text-primary-600"
                  />
                  <span className="ml-3 font-medium">Cash on Delivery</span>
                </label>
                <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-primary-300 transition">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="stripe"
                    checked={paymentMethod === "stripe"}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-4 h-4 text-primary-600"
                  />
                  <span className="ml-3 font-medium">
                    Credit/Debit Card (Stripe)
                  </span>
                </label>
                <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-primary-300 transition opacity-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    disabled
                    className="w-4 h-4 text-primary-600"
                  />
                  <span className="ml-3 font-medium">PayPal (Coming Soon)</span>
                </label>
                <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-primary-300 transition">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank_transfer"
                    checked={paymentMethod === "bank_transfer"}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-4 h-4 text-primary-600"
                  />
                  <span className="ml-3 font-medium">Bank Transfer</span>
                </label>
                <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-primary-300 transition">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="crypto"
                    checked={paymentMethod === "crypto"}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-4 h-4 text-primary-600"
                  />
                  <span className="ml-3 font-medium">Cryptocurrency</span>
                </label>
                
                {/* Crypto Wallet Input - Show only when crypto is selected */}
                {paymentMethod === "crypto" && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Crypto Wallet Address
                    </label>
                    <input
                      type="text"
                      value={cryptoWallet}
                      onChange={(e) => setCryptoWallet(e.target.value)}
                      placeholder="Enter your wallet address (BTC, ETH, etc.)"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                    <p className="mt-2 text-sm text-gray-600">
                      We accept Bitcoin, Ethereum, and other major cryptocurrencies.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div
                    key={`${item.productId}-${item.size}`}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-gray-600">
                      {item.name} ({item.size}) x {item.quantity}
                    </span>
                    <span className="font-semibold">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-3 space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">{formatPrice(shipping)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-lg">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-primary-600">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
