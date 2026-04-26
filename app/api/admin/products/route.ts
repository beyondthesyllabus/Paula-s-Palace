import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Get all products for admin
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Create new product
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, price, categoryId, images, sizes, stock, featured } = body;

    if (!name || !description || !price || !categoryId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    const product = await prisma.product.create({
      data: {
        name,
        slug: `${slug}-${Date.now().toString(36)}`, // Ensure uniqueness
        description,
        price: parseFloat(price),
        images: JSON.stringify(images || []),
        sizes: JSON.stringify(sizes || []),
        categoryId,
        stock: parseInt(stock) || 100,
        featured: featured || false,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
