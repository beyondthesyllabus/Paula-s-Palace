import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

async function main() {
  console.log("🚀 Adding new categories...");

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    console.log(`✅ Added/Updated category: ${cat.name}`);
  }

  console.log("✨ All categories synchronized.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
