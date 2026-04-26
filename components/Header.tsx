"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "./CartProvider";
import { useState, useEffect } from "react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

export function Header() {
  const { cart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data);
        }
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="text-3xl font-serif font-bold text-primary-500 tracking-tight group-hover:text-primary-600 transition-colors">
              Paula&apos;s Place
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            <Link
              href="/"
              className="text-gray-800 hover:text-primary-500 font-medium tracking-wide transition-all duration-300 relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            {/* Dynamic Collections Dropdown */}
            <div className="relative group">
              <button
                onMouseEnter={() => setIsCollectionsOpen(true)}
                onMouseLeave={() => setIsCollectionsOpen(false)}
                className="flex items-center space-x-1 text-gray-800 hover:text-primary-500 font-medium tracking-wide transition-all duration-300"
              >
                <span>Collections</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isCollectionsOpen ? "rotate-180" : ""}`} />
              </button>
              
              <div 
                onMouseEnter={() => setIsCollectionsOpen(true)}
                onMouseLeave={() => setIsCollectionsOpen(false)}
                className={`absolute top-full -left-4 w-64 bg-white shadow-2xl rounded-2xl border border-cream-100 py-4 transition-all duration-300 origin-top ${
                  isCollectionsOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
              >
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/category/${cat.slug}`}
                      className="block px-6 py-3 text-sm text-gray-700 hover:bg-cream-50 hover:text-primary-500 transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))
                ) : (
                  <p className="px-6 py-3 text-xs text-neutral-400 italic">Curating collections...</p>
                )}
              </div>
            </div>

            <Link
              href="/#new-arrivals"
              className="text-gray-800 hover:text-primary-500 font-medium tracking-wide transition-all duration-300 relative group"
            >
              New Arrivals
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Cart Icon */}
          <div className="flex items-center space-x-6">
            <Link
              href="/cart"
              className="relative p-2 text-gray-800 hover:text-primary-500 transition-transform hover:scale-110 active:scale-95 duration-200"
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg ring-2 ring-white">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-800 hover:text-primary-500 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-6 space-y-4 border-t border-cream-100 animate-in fade-in slide-in-from-top-4 duration-300 overflow-y-auto max-h-[70vh]">
            <Link
              href="/"
              className="block px-4 py-2 text-gray-800 hover:text-primary-500 font-medium hover:bg-cream-50 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            
            <div className="px-4 py-2">
              <p className="text-xs font-bold text-gold-600 uppercase tracking-widest mb-3">Collections</p>
              <div className="grid grid-cols-1 gap-2 pl-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    className="block py-1 text-gray-600 hover:text-primary-500 text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/#new-arrivals"
              className="block px-4 py-2 text-gray-800 hover:text-primary-500 font-medium hover:bg-cream-50 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              New Arrivals
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
