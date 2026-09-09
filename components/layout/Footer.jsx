import Link from 'next/link';
import { FiInstagram, FiTwitter, FiYoutube, FiFacebook } from 'react-icons/fi';
import { categories } from '@/data/categories';

export default function Footer() {
  return (
    <footer className="bg-secondary text-white mt-24">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                <span className="text-secondary font-bold text-sm">BC</span>
              </div>
              <span className="text-lg font-bold">BC ELECTRONICS</span>
            </div>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
              Genuine electronics from Schneider Electric, Legrand, MK Electric, Hager, and more, backed by real
              warranty and fast delivery across Nigeria.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[FiInstagram, FiTwitter, FiYoutube, FiFacebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold mb-4">Shop</p>
            <ul className="space-y-2.5">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/categories/${cat.id}`}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold mb-4">Support</p>
            <ul className="space-y-2.5">
              <li>
                <Link href="/profile?tab=orders" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Returns Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold mb-4">Company</p>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="text-sm text-slate-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Ajo. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">Designed for people who notice details.</p>
        </div>
      </div>
    </footer>
  );
}
