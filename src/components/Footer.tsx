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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <Image src="/logo.png" alt="Laptop Lane" width={48} height={48} className="h-12 w-12" />
              <span className="text-xl font-bold">LaptopLane</span>
            </Link>
            <p className="text-gray-300 text-sm mb-4">
              {t.footer.description}
            </p>
            <div className="flex space-x-4">
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

          {/* Quick Links & Legal */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">{t.footer.customerService}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/products" className="text-gray-300 hover:text-white transition-colors">
                    {t.nav.products}
                  </Link>
                </li>
                <li>
                  <Link href="/track-order" className="text-gray-300 hover:text-white transition-colors">
                    {t.nav.trackOrder}
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="text-gray-300 hover:text-white transition-colors">
                    {t.nav.cart}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="text-gray-300 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/cookie-policy" className="text-gray-300 hover:text-white transition-colors">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="/admin/signin" className="text-gray-300 hover:text-white transition-colors">
                    {t.footer.adminLogin}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t.footer.contact}</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>support@laptoplane.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-300">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-300">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>Tech District, Digital City</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Laptop Lane. {t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
