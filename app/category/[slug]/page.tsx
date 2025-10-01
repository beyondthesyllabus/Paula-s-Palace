import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { notFound } from "next/navigation";

async function getCategoryWithProducts(slug: string) {
  try {
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        products: {
          orderBy: { createdAt: "desc" },
        },
      },
    });
    return category;
  } catch (error) {
    console.error("Database error:", error);
    return null;
  }
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = await getCategoryWithProducts(params.slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Category Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
        {category.description && (
          <p className="text-xl text-gray-600">{category.description}</p>
        )}
        <p className="text-gray-500 mt-2">
          {category.products.length} {category.products.length === 1 ? "product" : "products"}
        </p>
      </div>

      {/* Products Grid */}
      {category.products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-500 mb-4">
            No products available in this category yet.
          </p>
          <Link
            href="/"
            className="text-primary-600 hover:text-primary-700 font-semibold"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {category.products.map((product) => {
            const images = JSON.parse(product.images);
            return (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden"
              >
                <div className="aspect-square relative bg-gray-100">
                  <Image
                    src={images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.featured && (
                    <div className="absolute top-2 right-2 bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded">
                      FEATURED
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary-600 transition line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-primary-600 font-bold text-xl">
                      {formatPrice(product.price)}
                    </p>
                    {product.stock > 0 ? (
                      <span className="text-green-600 text-sm font-medium">
                        In Stock
                      </span>
                    ) : (
                      <span className="text-red-600 text-sm font-medium">
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
