import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { notFound } from "next/navigation";
import { ProductClient } from "./ProductClient";

async function getProduct(slug: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: { category: true },
    });
    return product;
  } catch (error) {
    console.error("Database error:", error);
    return null;
  }
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  const images = JSON.parse(product.images);
  const sizes = JSON.parse(product.sizes);

  return (
    <ProductClient
      product={{
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        images,
        sizes,
        stock: product.stock,
        categoryName: product.category.name,
      }}
    />
  );
}
