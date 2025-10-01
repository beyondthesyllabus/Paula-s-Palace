import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">
              Paula's Place
            </h3>
            <p className="text-gray-400 mb-4">
              Your trusted destination for premium babies' and ladies' shoes.
              Quality, comfort, and style in every step.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/category/babies-shoes"
                  className="hover:text-white transition"
                >
                  Babies' Shoes
                </Link>
              </li>
              <li>
                <Link
                  href="/category/ladies-shoes"
                  className="hover:text-white transition"
                >
                  Ladies' Shoes
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/cart" className="hover:text-white transition">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition">
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Paula's Place. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
