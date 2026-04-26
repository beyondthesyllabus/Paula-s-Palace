import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting fresh seed...");

  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Create Categories (Matching sync-categories.ts)
  const categories = [
    {
      name: "BQ KIDDIES",
      slug: "bq-kiddies",
      description: "Exclusive designer pieces for fashion-forward kids.",
      image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&q=80",
    },
    {
      name: "Baby (0-24 Months)",
      slug: "baby-0-24-months",
      description: "Soft, gentle, and adorable essentials for your newborn.",
      image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80",
    },
    {
      name: "Girls Accessories",
      slug: "girls-accessories",
      description: "The perfect finishing touches for every little girl's outfit.",
      image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&q=80",
    },
    {
      name: "Accessories & Essentials",
      slug: "accessories-essentials",
      description: "Everyday necessities designed with quality in mind.",
      image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80",
    },
    {
      name: "Shoes",
      slug: "shoes",
      description: "Premium footwear for every milestone and occasion.",
      image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&q=80",
    },
    {
      name: "Unisex / General",
      slug: "unisex-general",
      description: "Versatile styles that suit every child.",
      image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80",
    },
    {
      name: "Kid Girl (Toddler To Older)",
      slug: "kid-girl",
      description: "Stylish apparel for girls as they grow and explore.",
      image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800&q=80",
    },
    {
      name: "Kid Boy (Toddler To Older)",
      slug: "kid-boy",
      description: "Durable and trendy clothes for active boys.",
      image: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800&q=80",
    },
    {
      name: "Uncategorized",
      slug: "uncategorized",
      description: "The latest arrivals and unique finds.",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
    },
  ];

  const categoryMap: Record<string, string> = {};

  for (const cat of categories) {
    const created = await prisma.category.create({ data: cat });
    categoryMap[cat.slug] = created.id;
    console.log(`✅ Created category: ${cat.name}`);
  }

  // Sample Products
  const products = [
    // BQ KIDDIES
    {
      name: "Designer Velvet Party Dress",
      slug: "designer-velvet-party-dress",
      description: "A luxurious velvet dress with hand-stitched lace detailing. Perfect for royal celebrations.",
      price: 85000,
      images: JSON.stringify(["https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&q=80"]),
      sizes: JSON.stringify(["2Y", "4Y", "6Y"]),
      stock: 15,
      featured: true,
      categoryId: categoryMap["bq-kiddies"],
    },
    {
      name: "Silk Blend Tuxedo Set",
      slug: "silk-blend-tuxedo-set",
      description: "Sharp and sophisticated 3-piece tuxedo set for your little gentleman.",
      price: 125000,
      images: JSON.stringify(["https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80"]),
      sizes: JSON.stringify(["3Y", "5Y", "7Y"]),
      stock: 10,
      featured: true,
      categoryId: categoryMap["bq-kiddies"],
    },
    // Baby (0-24 Months)
    {
      name: "Organic Cotton Romper",
      slug: "organic-cotton-romper",
      description: "Breathable, super-soft organic cotton romper with easy-snap buttons.",
      price: 18500,
      images: JSON.stringify(["https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80"]),
      sizes: JSON.stringify(["3M", "6M", "12M", "18M"]),
      stock: 50,
      featured: true,
      categoryId: categoryMap["baby-0-24-months"],
    },
    // Girls Accessories
    {
      name: "Glitter Bow Hair Clip Set",
      slug: "glitter-bow-hair-clip-set",
      description: "A set of 5 sparkling bows to add magic to any hairstyle.",
      price: 7500,
      images: JSON.stringify(["https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&q=80"]),
      sizes: JSON.stringify(["One Size"]),
      stock: 100,
      featured: false,
      categoryId: categoryMap["girls-accessories"],
    },
    // Shoes
    {
      name: "Leather Walking Shoes",
      slug: "leather-walking-shoes",
      description: "Supportive and flexible leather shoes designed for healthy foot development.",
      price: 35000,
      images: JSON.stringify(["https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&q=80"]),
      sizes: JSON.stringify(["18", "19", "20", "21"]),
      stock: 30,
      featured: true,
      categoryId: categoryMap["shoes"],
    },
    // Kid Girl
    {
      name: "Floral Summer Sundress",
      slug: "floral-summer-sundress",
      description: "Lightweight and vibrant floral dress for sunny adventures.",
      price: 28000,
      images: JSON.stringify(["https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800&q=80"]),
      sizes: JSON.stringify(["4Y", "6Y", "8Y", "10Y"]),
      stock: 40,
      featured: false,
      categoryId: categoryMap["kid-girl"],
    },
    // Kid Boy
    {
      name: "Adventure Cargo Shorts",
      slug: "adventure-cargo-shorts",
      description: "Durable and comfortable shorts with plenty of pockets for treasures.",
      price: 22000,
      images: JSON.stringify(["https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800&q=80"]),
      sizes: JSON.stringify(["4Y", "6Y", "8Y", "10Y"]),
      stock: 45,
      featured: false,
      categoryId: categoryMap["kid-boy"],
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log("✅ Products created");
  console.log("🎉 Fresh seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
