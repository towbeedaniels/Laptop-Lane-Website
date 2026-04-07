'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguageStore } from '@/store/languageStore';

export default function Footer() {
  const t = useLanguageStore((state) => state.t);

  return (
    <footer className="bg-primary-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <Image src="/logo.png" alt="Laptop Lane" width={48} height={48} className="h-12 w-12" />
              <span className="text-xl font-bold">LaptopLane</span>
            </Link>
            <p className="text-gray-300 text-sm">
              {t.footer.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=laptop" className="text-gray-300 hover:text-white transition-colors">
                  Laptops
                </Link>
              </li>
              <li>
                <Link href="/products?category=keyboard" className="text-gray-300 hover:text-white transition-colors">
                  Keyboards
                </Link>
              </li>
              <li>
                <Link href="/products?category=mouse" className="text-gray-300 hover:text-white transition-colors">
                  Mouse
                </Link>
              </li>
              <li>
                <Link href="/products?category=external_hard_drive" className="text-gray-300 hover:text-white transition-colors">
                  Storage
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/track-order" className="text-gray-300 hover:text-white transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-300 hover:text-white transition-colors">
                  {t.nav.cart}
                </Link>
              </li>
              <li>
                <Link href="/admin/signin" className="text-gray-300 hover:text-white transition-colors">
                  {t.footer.adminLogin}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t.footer.contact}</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-4 w-4" />
                <span>support@laptoplane.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-300">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>Tech District, Digital City</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Laptop Lane. {t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
