'use client';

import Link from 'next/link';
import { ArrowRight, Laptop, Keyboard, Mouse, HardDrive, Usb, Truck, Shield, Headphones } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import type { Product } from '@/types';
import { useLanguageStore } from '@/store/languageStore';

export default function Home() {
  const t = useLanguageStore((state) => state.t);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  const categories = [
    { id: 'laptop', name: 'Laptops', icon: Laptop, color: 'from-blue-500 to-blue-700' },
    { id: 'keyboard', name: 'Keyboards', icon: Keyboard, color: 'from-purple-500 to-purple-700' },
    { id: 'mouse', name: 'Mouse', icon: Mouse, color: 'from-green-500 to-green-700' },
    { id: 'external_hard_drive', name: 'External Drives', icon: HardDrive, color: 'from-orange-500 to-orange-700' },
    { id: 'flash_drive', name: 'Flash Drives', icon: Usb, color: 'from-pink-500 to-pink-700' },
  ];

  const features = [
    { icon: Truck, title: t.features.fastDelivery, description: t.features.fastDeliveryDesc },
    { icon: Shield, title: t.features.securePayment, description: t.features.securePaymentDesc },
    { icon: Headphones, title: t.features.support, description: t.features.supportDesc },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(4);
      
      if (data && !error) {
        setFeaturedProducts(data);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-hero-gradient text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {t.hero.title}
                <span className="block text-accent-500">Laptop Lane</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/products" className="btn-primary bg-white text-primary-700 hover:bg-gray-100">
                  {t.hero.shopNow}
                  <ArrowRight className="inline-block ml-2 h-5 w-5" />
                </Link>
                <Link href="/track-order" className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold py-3 px-6 rounded-lg transition-all duration-200">
                  {t.hero.trackOrder}
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl"></div>
                <Laptop className="h-96 w-96 mx-auto relative z-10 text-white/20" strokeWidth={0.5} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-md">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <feature.icon className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">{t.categories.title}</h2>
            <p className="section-subtitle">{t.categories.subtitle}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="group"
              >
                <div className={`bg-gradient-to-br ${category.color} p-8 rounded-2xl text-white text-center transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl`}>
                  <category.icon className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">{t.featured.title}</h2>
            <p className="section-subtitle">{t.featured.subtitle}</p>
          </div>
          {featuredProducts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`} className="card group">
                  <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                    {product.image_url ? (
                      <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <Laptop className="h-24 w-24 text-gray-400" />
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                    <h3 className="font-semibold text-gray-900 mb-2 truncate">{product.name}</h3>
                    <p className="text-primary-600 font-bold">₦{product.price.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">{t.featured.comingSoon}</p>
              <Link href="/admin" className="btn-primary mt-4 inline-block">
                {t.featured.adminAdd}
              </Link>
            </div>
          )}
          <div className="text-center mt-12">
            <Link href="/products" className="btn-primary">
              {t.featured.viewAll}
              <ArrowRight className="inline-block ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.cta.title}</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            {t.cta.subtitle}
          </p>
          <Link href="/products" className="btn-primary bg-white text-primary-700 hover:bg-gray-100">
            {t.cta.startShopping}
          </Link>
        </div>
      </section>
    </div>
  );
}
