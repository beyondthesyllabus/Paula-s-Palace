import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// This route should be deleted after first use or protected with a secret
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  // Protect this endpoint
  if (secret !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Check if data already exists
    const existingCategories = await prisma.category.count();
    if (existingCategories > 0) {
      return NextResponse.json({
        message: "Database already seeded",
        categories: existingCategories,
      });
    }

    // Create categories
    const babiesCategory = await prisma.category.create({
      data: {
        name: "Babies' Shoes",
        slug: "babies-shoes",
        description: "Comfortable and adorable shoes for your little ones",
        image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80",
      },
    });

    const ladiesCategory = await prisma.category.create({
      data: {
        name: "Ladies' Shoes",
        slug: "ladies-shoes",
        description: "Stylish and elegant footwear for modern women",
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80",
      },
    });

    // Create sample products
    const babiesProducts = [
      {
        name: "Soft Sole Baby Sneakers - Pink",
        slug: "soft-sole-baby-sneakers-pink",
        description: "Ultra-soft sneakers perfect for first walkers.",
        price: 24.99,
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&q=80",
        ]),
        sizes: JSON.stringify(["0-6M", "6-12M", "12-18M"]),
        stock: 50,
        featured: true,
        categoryId: babiesCategory.id,
      },
      {
        name: "Classic Baby Booties - Blue",
        slug: "classic-baby-booties-blue",
        description: "Cozy knitted booties to keep tiny feet warm.",
        price: 18.99,
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80",
        ]),
        sizes: JSON.stringify(["0-6M", "6-12M"]),
        stock: 40,
        featured: true,
        categoryId: babiesCategory.id,
      },
    ];

    const ladiesProducts = [
      {
        name: "Classic Black Pumps",
        slug: "classic-black-pumps",
        description: "Timeless black pumps with 3-inch heel.",
        price: 79.99,
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80",
        ]),
        sizes: JSON.stringify(["6", "7", "8", "9", "10"]),
        stock: 60,
        featured: true,
        categoryId: ladiesCategory.id,
      },
      {
        name: "White Leather Sneakers",
        slug: "white-leather-sneakers",
        description: "Minimalist white sneakers in genuine leather.",
        price: 69.99,
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
        ]),
        sizes: JSON.stringify(["6", "7", "8", "9", "10", "11"]),
        stock: 70,
        featured: true,
        categoryId: ladiesCategory.id,
      },
    ];

    for (const product of [...babiesProducts, ...ladiesProducts]) {
      await prisma.product.create({ data: product });
    }

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
      categories: 2,
      products: babiesProducts.length + ladiesProducts.length,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to seed database" },
      { status: 500 }
    );
  }
}
