import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";

async function getCategoryWithProducts(slug: string) {
  if (!process.env.DATABASE_URL) {
    console.log("No database configured");
    return null;
  }
  
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
    <div className="bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Category Header */}
        <Reveal width="100%">
          <div className="mb-20 text-center">
            <span className="text-gold-600 font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
              Collection
            </span>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">{category.name}</h1>
            {category.description && (
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">{category.description}</p>
            )}
            <div className="mt-8 flex items-center justify-center space-x-4">
              <div className="h-px w-12 bg-gold-300"></div>
              <p className="text-gold-700 font-medium uppercase tracking-widest text-xs">
                {category.products.length} {category.products.length === 1 ? "Exquisite Piece" : "Exquisite Pieces"}
              </p>
              <div className="h-px w-12 bg-gold-300"></div>
            </div>
          </div>
        </Reveal>

        {/* Products Grid */}
        {category.products.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-cream-200">
            <p className="text-2xl font-serif text-gray-400 mb-8">
              The collection is currently being curated.
            </p>
            <Link
              href="/"
              className="inline-flex items-center space-x-2 bg-primary-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-600 transition-all shadow-lg hover:shadow-xl"
            >
              <span>Discover Other Collections</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {category.products.map((product, index) => {
              const images = JSON.parse(product.images);
              return (
                <Reveal key={product.id} delay={0.1 * (index % 4)}>
                  <Link
                    href={`/product/${product.slug}`}
                    className="group flex flex-col h-full block"
                  >
                    <div className="aspect-[4/5] relative bg-white rounded-2xl overflow-hidden mb-6 shadow-md group-hover:shadow-2xl transition-all duration-500">
                      <Image
                        src={images[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {product.featured && (
                        <div className="absolute top-4 right-4 bg-gold-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
                          LIMITED EDITION
                        </div>
                      )}
                      {product.stock <= 0 && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                          <span className="bg-gray-900 text-white px-4 py-1 text-xs font-bold rounded-full">SOLD OUT</span>
                        </div>
                      )}
                    </div>
                    <div className="text-center flex-1 flex flex-col px-2">
                      <h3 className="font-serif text-lg text-gray-900 mb-2 group-hover:text-primary-600 transition line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-primary-600 font-bold text-lg mt-auto">
                        {formatPrice(product.price)}
                      </p>
                      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-gold-600 text-xs font-bold uppercase tracking-widest border-b border-gold-300 pb-1">
                          View Details
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
