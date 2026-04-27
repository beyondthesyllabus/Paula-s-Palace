import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";

async function getFeaturedProducts() {
  if (!process.env.DATABASE_URL) {
    console.log("No database configured");
    return [];
  }
  
  try {
    const products = await prisma.product.findMany({
      where: { featured: true },
      include: { category: true },
      take: 6,
    });
    return products;
  } catch (error) {
    console.error("Database error:", error);
    return [];
  }
}

async function getCategories() {
  if (!process.env.DATABASE_URL) {
    console.log("No database configured");
    return [];
  }
  
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (error) {
    console.error("Database error:", error);
    return [];
  }
}

export default async function HomePage() {
  const [featuredProducts, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
  ]);

  return (
    <div className="bg-cream-50">
      {/* Professional Hero Section */}
      <section className="relative h-[85vh] flex flex-col md:flex-row overflow-hidden border-b border-cream-200">
        {/* Background Panes */}
        <div className="absolute inset-0 flex flex-col md:flex-row z-0">
          {/* Babies Pane */}
          <div className="relative flex-1 group overflow-hidden border-r border-white/10">
            <Image
              src="/hero-baby.png"
              alt="Premium Babies Collection"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              priority
            />
            <div className="absolute inset-0 bg-neutral-900/40 group-hover:bg-neutral-900/30 transition-all duration-500" />
            <div className="absolute bottom-10 left-0 w-full text-center md:text-left md:pl-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block">
              <span className="text-white font-serif italic text-2xl">For the Little Ones</span>
            </div>
          </div>

          {/* Ladies Pane */}
          <div className="relative flex-1 group overflow-hidden border-x border-white/10">
            <Image
              src="/hero-ladies.png"
              alt="Elegant Ladies Collection"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              priority
            />
            <div className="absolute inset-0 bg-neutral-900/40 group-hover:bg-neutral-900/30 transition-all duration-500" />
            <div className="absolute bottom-10 left-0 w-full text-center md:text-left md:pl-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block">
              <span className="text-white font-serif italic text-2xl">Elegant & Timeless</span>
            </div>
          </div>

          {/* Kiddies (BQ) Pane */}
          <div className="relative flex-1 group overflow-hidden border-l border-white/10">
            <Image
              src="/bq-hero.png"
              alt="BQ KIDDIES Collection"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              priority
            />
            <div className="absolute inset-0 bg-neutral-900/40 group-hover:bg-neutral-900/30 transition-all duration-500" />
            <div className="absolute bottom-10 left-0 w-full text-center md:text-left md:pl-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block">
              <span className="text-white font-serif italic text-2xl">Premium Kiddies Wear</span>
            </div>
          </div>
        </div>

        {/* Central Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
          <Reveal delay={0.3}>
            <div className="bg-white/10 backdrop-blur-md p-12 md:p-20 rounded-[4rem] border border-white/20 text-center shadow-2xl max-w-4xl mx-4 pointer-events-auto">
              <span className="text-gold-400 font-bold tracking-[0.4em] uppercase text-xs mb-6 block">
                EST. 2024
              </span>
              <h1 className="text-4xl md:text-8xl font-serif font-bold text-white mb-6 md:mb-8 leading-tight drop-shadow-2xl">
                Welcome to <br />
                <span className="text-white">Paula&apos;s Palace</span>
              </h1>
              <p className="text-white/80 text-sm md:text-xl max-w-2xl mx-auto mb-8 md:mb-12 font-medium leading-relaxed drop-shadow-lg px-4">
                Discover a world of premium fashion for babies, ladies, and the finest kiddies&apos; collections. 
                Elegance in every step, quality in every thread.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link
                  href="/#collections"
                  className="bg-primary-500 text-white px-12 py-5 rounded-full font-bold uppercase tracking-[0.2em] hover:bg-primary-600 transition-all duration-300 transform hover:scale-105 shadow-[0_20px_50px_rgba(234,179,8,0.3)] group flex items-center"
                >
                  <span>Shop Now</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/category/bq-kiddies"
                  className="bg-white/10 backdrop-blur-xl text-white border border-white/30 px-12 py-5 rounded-full font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-neutral-900 transition-all duration-300 transform hover:scale-105"
                >
                  View BQ Luxe
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Decorative Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:block">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Professional Categories Section */}
      <section className="bg-white pt-24 pb-12" id="collections">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal width="100%">
            <div className="text-center mb-20">
              <span className="text-gold-600 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
                Boutique Selection
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                Shop by Collections
              </h2>
              <p className="text-neutral-500 max-w-2xl mx-auto leading-relaxed">
                Discover our meticulously curated ranges, designed to provide comfort, style, and quality for every stage of childhood.
              </p>
              <div className="w-24 h-1 bg-gold-400 mx-auto mt-8"></div>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Reveal key={category.id} delay={0.1 * index} width="100%">
                <Link
                  href={`/category/${category.slug}`}
                  className="group relative h-80 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 block"
                >
                  {category.image && (
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                    <h3 className="text-2xl font-serif font-bold mb-2 transform group-hover:-translate-y-2 transition-transform duration-500">
                      {category.name}
                    </h3>
                    <div className="h-0.5 w-12 bg-gold-400 mb-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    <p className="text-sm text-neutral-300 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                      {category.description}
                    </p>
                  </div>
                  
                  {/* Decorative corner element */}
                  <div className="absolute top-6 right-6 w-10 h-10 border-t border-r border-white/30 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0"></div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="bg-cream-50/50 py-16 border-y border-cream-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="flex justify-between items-end mb-16">
                <div>
                  <h2 className="text-4xl font-serif font-bold text-gray-900 mb-2">Featured Styles</h2>
                  <p className="text-gray-500">Handpicked for your exceptional taste</p>
                </div>
                <Link href="/shop" className="text-primary-600 font-semibold hover:text-primary-700 transition flex items-center space-x-1">
                  <span>View All Products</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </Reveal>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {featuredProducts.map((product, index) => {
                const images = JSON.parse(product.images);
                return (
                  <Reveal key={product.id} delay={0.1 * index} width="100%">
                    <Link
                      href={`/product/${product.slug}`}
                      className="group block"
                    >
                      <div className="aspect-[4/5] relative bg-cream-100 rounded-2xl overflow-hidden mb-6 shadow-md group-hover:shadow-xl transition-all duration-500">
                        <Image
                          src={images[0]}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary-600 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Featured
                        </div>
                      </div>
                      <div className="text-center px-4">
                        <p className="text-xs uppercase tracking-widest text-gold-600 font-bold mb-2">
                          {product.category.name}
                        </p>
                        <h3 className="font-serif text-xl text-gray-900 mb-2 group-hover:text-primary-600 transition">
                          {product.name}
                        </h3>
                        <p className="text-primary-600 font-bold text-lg">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Trust Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {[
            {
              title: "Premium Quality",
              desc: "Carefully selected shoes made from the finest materials for ultimate comfort.",
              icon: (
                <svg className="w-10 h-10 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-1.006 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946 1.006 3.42 3.42 0 013.138 3.138 3.42 3.42 0 001.006 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-1.006 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946 1.006 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-1.006 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-1.006-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 001.006-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              ),
            },
            {
              title: "Secure Luxury",
              desc: "Every transaction is protected. Choose from multiple premium payment methods.",
              icon: (
                <svg className="w-10 h-10 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              ),
            },
            {
              title: "White Glove Delivery",
              desc: "Swift and reliable shipping that ensures your shoes arrive in pristine condition.",
              icon: (
                <svg className="w-10 h-10 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              ),
            },
          ].map((item, i) => (
            <Reveal key={i} delay={0.2 * i}>
              <div className="text-center group p-8 rounded-3xl hover:bg-white hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="bg-cream-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-gold-50 transition-colors duration-500">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
