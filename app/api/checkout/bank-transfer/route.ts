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
    } = body;

    // Generate order number and bank reference
    const orderNumber = generateOrderNumber();
    const bankReference = `PP${orderNumber.slice(-8)}`;

    // Create order with bank transfer payment method
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId,
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress: JSON.stringify(shippingAddress),
        paymentMethod: "bank_transfer",
        paymentStatus: "pending",
        orderStatus: "processing",
        subtotal,
        shipping,
        total,
        bankReference,
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
      bankReference,
      message: "Order created. Please complete bank transfer."
    });

  } catch (error) {
    console.error("Bank transfer checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
