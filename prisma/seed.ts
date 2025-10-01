import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

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

  console.log("✅ Categories created");

  // Create Babies' Shoes products
  const babiesProducts = [
    {
      name: "Soft Sole Baby Sneakers - Pink",
      slug: "soft-sole-baby-sneakers-pink",
      description: "Ultra-soft sneakers perfect for first walkers. Made with breathable materials and flexible soles for natural foot development.",
      price: 24.99,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&q=80",
        "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80",
      ]),
      sizes: JSON.stringify(["0-6M", "6-12M", "12-18M"]),
      stock: 50,
      featured: true,
      categoryId: babiesCategory.id,
    },
    {
      name: "Classic Baby Booties - Blue",
      slug: "classic-baby-booties-blue",
      description: "Cozy knitted booties to keep tiny feet warm. Soft cotton blend with non-slip grip.",
      price: 18.99,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80",
        "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&q=80",
      ]),
      sizes: JSON.stringify(["0-6M", "6-12M"]),
      stock: 40,
      featured: true,
      categoryId: babiesCategory.id,
    },
    {
      name: "Leather Baby Sandals",
      slug: "leather-baby-sandals",
      description: "Premium leather sandals with adjustable straps. Perfect for summer outings.",
      price: 32.99,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800&q=80",
        "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80",
      ]),
      sizes: JSON.stringify(["6-12M", "12-18M", "18-24M"]),
      stock: 30,
      featured: false,
      categoryId: babiesCategory.id,
    },
    {
      name: "Canvas Baby High Tops",
      slug: "canvas-baby-high-tops",
      description: "Trendy high-top sneakers in durable canvas. Easy velcro closure for quick changes.",
      price: 27.99,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800&q=80",
        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80",
      ]),
      sizes: JSON.stringify(["6-12M", "12-18M", "18-24M"]),
      stock: 45,
      featured: false,
      categoryId: babiesCategory.id,
    },
    {
      name: "Sparkle Baby Mary Janes",
      slug: "sparkle-baby-mary-janes",
      description: "Adorable glittery Mary Jane shoes for special occasions. Soft insole and secure strap.",
      price: 29.99,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
      ]),
      sizes: JSON.stringify(["6-12M", "12-18M", "18-24M"]),
      stock: 35,
      featured: true,
      categoryId: babiesCategory.id,
    },
  ];

  for (const product of babiesProducts) {
    await prisma.product.create({ data: product });
  }

  console.log("✅ Babies' shoes created");

  // Create Ladies' Shoes products
  const ladiesProducts = [
    {
      name: "Classic Black Pumps",
      slug: "classic-black-pumps",
      description: "Timeless black pumps with 3-inch heel. Perfect for office or evening wear. Premium leather construction.",
      price: 79.99,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80",
        "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=800&q=80",
      ]),
      sizes: JSON.stringify(["6", "7", "8", "9", "10"]),
      stock: 60,
      featured: true,
      categoryId: ladiesCategory.id,
    },
    {
      name: "Strappy Heeled Sandals - Nude",
      slug: "strappy-heeled-sandals-nude",
      description: "Elegant nude sandals with delicate straps. 4-inch stiletto heel for a sophisticated look.",
      price: 89.99,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80",
        "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=800&q=80",
      ]),
      sizes: JSON.stringify(["6", "7", "8", "9", "10"]),
      stock: 45,
      featured: true,
      categoryId: ladiesCategory.id,
    },
    {
      name: "White Leather Sneakers",
      slug: "white-leather-sneakers",
      description: "Minimalist white sneakers in genuine leather. Comfortable cushioned sole for all-day wear.",
      price: 69.99,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
        "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80",
      ]),
      sizes: JSON.stringify(["6", "7", "8", "9", "10", "11"]),
      stock: 70,
      featured: true,
      categoryId: ladiesCategory.id,
    },
    {
      name: "Suede Ankle Boots - Tan",
      slug: "suede-ankle-boots-tan",
      description: "Chic tan suede ankle boots with block heel. Side zipper for easy on and off.",
      price: 119.99,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80",
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80",
      ]),
      sizes: JSON.stringify(["6", "7", "8", "9", "10"]),
      stock: 40,
      featured: false,
      categoryId: ladiesCategory.id,
    },
    {
      name: "Ballet Flats - Rose Gold",
      slug: "ballet-flats-rose-gold",
      description: "Comfortable ballet flats in shimmering rose gold. Perfect for everyday elegance.",
      price: 54.99,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&q=80",
        "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&q=80",
      ]),
      sizes: JSON.stringify(["6", "7", "8", "9", "10"]),
      stock: 55,
      featured: false,
      categoryId: ladiesCategory.id,
    },
    {
      name: "Platform Espadrilles - Navy",
      slug: "platform-espadrilles-navy",
      description: "Trendy navy espadrilles with jute platform. Canvas upper with ankle tie detail.",
      price: 64.99,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80",
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80",
      ]),
      sizes: JSON.stringify(["6", "7", "8", "9", "10"]),
      stock: 50,
      featured: false,
      categoryId: ladiesCategory.id,
    },
    {
      name: "Red Velvet Heels",
      slug: "red-velvet-heels",
      description: "Luxurious red velvet pumps for special occasions. 3.5-inch heel with cushioned insole.",
      price: 94.99,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80",
        "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=800&q=80",
      ]),
      sizes: JSON.stringify(["6", "7", "8", "9", "10"]),
      stock: 30,
      featured: true,
      categoryId: ladiesCategory.id,
    },
    {
      name: "Leopard Print Loafers",
      slug: "leopard-print-loafers",
      description: "Bold leopard print loafers in soft suede. Comfortable slip-on style with cushioned footbed.",
      price: 72.99,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&q=80",
        "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&q=80",
      ]),
      sizes: JSON.stringify(["6", "7", "8", "9", "10"]),
      stock: 42,
      featured: false,
      categoryId: ladiesCategory.id,
    },
  ];

  for (const product of ladiesProducts) {
    await prisma.product.create({ data: product });
  }

  console.log("✅ Ladies' shoes created");
  console.log("🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
