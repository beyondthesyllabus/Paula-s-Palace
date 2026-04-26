import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-400 mt-24 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl font-serif font-bold text-white mb-6">
              Paula&apos;s Place
            </h3>
            <p className="text-neutral-500 mb-8 max-w-md leading-relaxed">
              Experience the pinnacle of footwear luxury. From the first steps of childhood to the elegant strides of a lady, we provide quality that transcends time.
            </p>
            <div className="flex space-x-5">
              {/* Placeholder social icons */}
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center hover:bg-gold-500 hover:border-gold-500 hover:text-white transition-all duration-300 cursor-pointer">
                  <span className="sr-only">Social Link</span>
                  <div className="w-4 h-4 bg-current rounded-sm"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-serif font-bold text-lg mb-6">Collections</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/category/babies-shoes"
                  className="hover:text-gold-400 transition-colors duration-300"
                >
                  Babies&apos; Shoes
                </Link>
              </li>
              <li>
                <Link
                  href="/category/ladies-shoes"
                  className="hover:text-gold-400 transition-colors duration-300"
                >
                  Ladies&apos; Shoes
                </Link>
              </li>
              <li>
                <Link
                  href="/new-arrivals"
                  className="hover:text-gold-400 transition-colors duration-300"
                >
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-serif font-bold text-lg mb-6">Experience</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/cart" className="hover:text-gold-400 transition-colors duration-300">
                  Your Cart
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold-400 transition-colors duration-300">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-400 transition-colors duration-300">
                  Boutique Locator
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-900 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-600">
          <p className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Paula&apos;s Place Boutique. All Rights Reserved.
          </p>
          <div className="flex space-x-8">
            <Link href="/privacy" className="hover:text-neutral-400 transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-neutral-400 transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
