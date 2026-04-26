import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateOrderNumber } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      items,
      subtotal,
      shipping,
      total,
      userId,
      cryptoWallet,
    } = body;

    // Generate crypto payment address and create order
    const orderNumber = generateOrderNumber();
    const cryptoAddress = `${cryptoWallet}_${orderNumber.slice(-6)}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId,
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress: JSON.stringify(shippingAddress),
        paymentMethod: "crypto",
        paymentStatus: "pending",
        orderStatus: "processing",
        subtotal,
        shipping,
        total,
        cryptoWallet: cryptoAddress,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            size: item.size,
            image: item.image,
          })),
        },
      },
    });

    return NextResponse.json({ 
      orderNumber,
      cryptoAddress,
      amount: total,
      message: "Order created. Please send crypto payment to the provided address."
    });

  } catch (error) {
    console.error("Crypto checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
