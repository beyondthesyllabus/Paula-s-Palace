import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

async function getOrder(orderNumber: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { orderNumber },
      include: { items: true },
    });
    return order;
  } catch (error) {
    console.error("Database error:", error);
    return null;
  }
}

export default async function OrderConfirmationPage({
  params,
}: {
  params: { orderNumber: string };
}) {
  const order = await getOrder(params.orderNumber);

  if (!order) {
    notFound();
  }

  const shippingAddress = JSON.parse(order.shippingAddress);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-gray-600">
          Thank you for your order. We've sent a confirmation email to{" "}
          <span className="font-semibold">{order.customerEmail}</span>
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-sm font-semibold text-gray-500 mb-2">
              ORDER NUMBER
            </h2>
            <p className="text-xl font-bold">{order.orderNumber}</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-500 mb-2">
              ORDER DATE
            </h2>
            <p className="text-xl font-bold">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-sm font-semibold text-gray-500 mb-2">
              PAYMENT METHOD
            </h2>
            <p className="font-medium">{order.paymentMethod.toUpperCase()}</p>
            <p className="text-sm text-gray-600">
              Status:{" "}
              <span
                className={
                  order.paymentStatus === "paid"
                    ? "text-green-600"
                    : "text-yellow-600"
                }
              >
                {order.paymentStatus}
              </span>
            </p>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-500 mb-2">
              SHIPPING ADDRESS
            </h2>
            <p className="text-sm">
              {shippingAddress.address}
              <br />
              {shippingAddress.city}, {shippingAddress.state}{" "}
              {shippingAddress.zip}
              <br />
              {shippingAddress.country}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Order Items</h2>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-4 last:border-b-0"
            >
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">
                  Size: {item.size} | Quantity: {item.quantity}
                </p>
              </div>
              <p className="font-bold">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 mt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold">{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="font-semibold">{formatPrice(order.shipping)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-primary-600">{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Link
          href="/"
          className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
