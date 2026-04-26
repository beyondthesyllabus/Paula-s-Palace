"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart, Check } from "lucide-react";

interface ProductClientProps {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    images: string[];
    sizes: string[];
    stock: number;
    categoryName: string;
  };
}

export function ProductClient({ product }: ProductClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      quantity,
      slug: product.slug,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-12 text-xs uppercase tracking-[0.2em] text-neutral-400">
          <Link href="/" className="hover:text-gold-600 transition-colors">
            Home
          </Link>
          <span className="mx-3 text-neutral-300">/</span>
          <Link
            href={`/category/${product.categoryName.toLowerCase().replace(/'/g, "").replace(/\s+/g, "-")}`}
            className="hover:text-gold-600 transition-colors"
          >
            {product.categoryName}
          </Link>
          <span className="mx-3 text-neutral-300">/</span>
          <span className="text-neutral-900 font-bold">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
          {/* Images Section */}
          <div className="space-y-6">
            <div className="aspect-[4/5] relative bg-white rounded-3xl overflow-hidden shadow-2xl group">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              {product.stock <= 0 && (
                <div className="absolute inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center">
                  <span className="bg-neutral-900 text-white px-8 py-2 rounded-full text-sm font-bold uppercase tracking-widest">Sold Out</span>
                </div>
              )}
            </div>
            
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square relative bg-white rounded-xl overflow-hidden transition-all duration-300 ${
                      selectedImage === index
                        ? "ring-2 ring-gold-500 shadow-lg scale-95"
                        : "opacity-60 hover:opacity-100 hover:shadow-md"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col">
            <span className="text-gold-600 font-bold tracking-[0.3em] uppercase text-xs mb-4">
              {product.categoryName}
            </span>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-neutral-900 mb-6 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center space-x-6 mb-8">
              <p className="text-3xl font-bold text-primary-500">
                {formatPrice(product.price)}
              </p>
              <div className="h-4 w-px bg-neutral-300"></div>
              {product.stock > 0 ? (
                <p className="text-emerald-600 text-sm font-bold uppercase tracking-widest flex items-center">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
                  In Stock
                </p>
              ) : (
                <p className="text-rose-600 text-sm font-bold uppercase tracking-widest">Out of Stock</p>
              )}
            </div>

            <div className="prose prose-neutral mb-12">
              <p className="text-neutral-600 leading-relaxed text-lg italic">
                &ldquo;{product.description}&rdquo;
              </p>
            </div>

            {/* Size Selection */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-bold uppercase tracking-widest text-neutral-900">
                  Select Your Size
                </label>
                <button className="text-xs text-gold-600 font-bold uppercase tracking-widest border-b border-gold-200 hover:border-gold-500 transition-colors">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-4">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[4rem] h-14 flex items-center justify-center rounded-xl font-bold transition-all duration-300 border-2 ${
                      selectedSize === size
                        ? "border-neutral-900 bg-neutral-900 text-white shadow-xl scale-110"
                        : "border-cream-300 bg-white text-neutral-600 hover:border-gold-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Section */}
            <div className="mt-auto space-y-6">
              <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-cream-200 shadow-sm">
                <span className="text-sm font-bold uppercase tracking-widest text-neutral-500">Quantity</span>
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-lg font-bold w-4 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0 || added}
                className={`w-full py-6 rounded-2xl font-bold text-lg flex items-center justify-center space-x-3 transition-all duration-500 transform active:scale-95 ${
                  added
                    ? "bg-emerald-600 text-white shadow-emerald-200"
                    : product.stock === 0
                    ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                    : "bg-primary-500 text-white hover:bg-primary-600 shadow-xl hover:shadow-primary-100"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-6 h-6" />
                    <span className="uppercase tracking-widest">Added to Collection</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-6 h-6" />
                    <span className="uppercase tracking-widest">Add to Collection</span>
                  </>
                )}
              </button>
            </div>

            {/* Meta Info */}
            <div className="mt-12 pt-8 border-t border-cream-200 flex flex-col space-y-4">
              <p className="text-xs text-neutral-400 uppercase tracking-widest">
                Complimentary White Glove Delivery
              </p>
              <p className="text-xs text-neutral-400 uppercase tracking-widest">
                30-Day Royal Returns Guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
