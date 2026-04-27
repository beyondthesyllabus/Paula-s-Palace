import Link from "next/link";
import { Facebook, Instagram, Mail, Phone, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-white mt-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 gap-y-12">
          {/* Brand & About */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-serif font-bold text-white mb-4">
              Paula&apos;s Place
            </h3>
            <p className="text-white font-bold text-xs leading-relaxed opacity-90">
              Experience the pinnacle of footwear luxury. From the first steps of childhood to the elegant strides of a lady, we provide quality that transcends time.
            </p>
            <div className="flex space-x-3 mt-6">
              <a
                href="#"
                className="w-8 h-8 rounded-full border border-neutral-700 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                title="Facebook"
              >
                <Facebook size={14} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full border border-neutral-700 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                title="Instagram"
              >
                <Instagram size={14} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full border border-neutral-700 flex items-center justify-center hover:bg-green-600 hover:border-green-600 transition-all"
                title="WhatsApp"
              >
                <MessageCircle size={14} />
              </a>
            </div>
          </div>

          {/* Top Collections */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4 underline underline-offset-4">Collections</h4>
            <ul className="space-y-3 text-xs font-bold">
              <li>
                <Link href="/category/bq-kiddies" className="hover:underline transition-all">
                  BQ Kiddies
                </Link>
              </li>
              <li>
                <Link href="/category/baby-0-2-years" className="hover:underline transition-all">
                  Baby (0-24 Months)
                </Link>
              </li>
              <li>
                <Link href="/category/shoes" className="hover:underline transition-all">
                  Ladies Shoes
                </Link>
              </li>
              <li>
                <Link href="/category/kid-girl-toddler-to-older" className="hover:underline transition-all">
                  Kid Girl Collection
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4 underline underline-offset-4">Information</h4>
            <ul className="space-y-3 text-xs font-bold">
              <li>
                <Link href="/about" className="hover:underline transition-all">Our Story</Link>
              </li>
              <li>
                <Link href="/cart" className="hover:underline transition-all">Shopping Cart</Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:underline transition-all">Checkout</Link>
              </li>
              <li>
                <Link href="/admin" className="hover:underline transition-all">Partner Login</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4 underline underline-offset-4">Contact Us</h4>
            <ul className="space-y-3 text-xs font-bold">
              <li className="flex items-center space-x-2">
                <Phone size={14} />
                <span>+234 XXX XXX XXXX</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={14} />
                <span>hello@paulasplace.com</span>
              </li>
              <li className="opacity-80 italic">
                Lagos, Nigeria
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-900 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold text-white tracking-widest">
          <p className="mb-4 md:mb-0 uppercase">
            &copy; {new Date().getFullYear()} Paula&apos;s Place. Crafted for Excellence.
          </p>
          <div className="flex space-x-6 uppercase">
            <Link href="/privacy" className="hover:underline transition">Privacy</Link>
            <Link href="/terms" className="hover:underline transition">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
