import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Update product
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await req.json();
    const { name, description, price, categoryId, images, sizes, stock, featured } = body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price: parseFloat(price),
        images: JSON.stringify(images || []),
        sizes: JSON.stringify(sizes || []),
        categoryId,
        stock: parseInt(stock) || 0,
        featured: featured || false,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Delete product
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Check if product exists in any orders
    const orderItems = await prisma.orderItem.findFirst({
      where: { productId: id },
    });

    if (orderItems) {
      return NextResponse.json(
        { error: "Cannot delete product that has existing orders. Consider setting stock to 0 instead." },
        { status: 400 }
      );
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
