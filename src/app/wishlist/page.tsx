'use client';

import { useState, useEffect } from 'react';
import { useWishlistStore } from '@/store/wishlistStore';
import Link from 'next/link';
import { Heart, Trash2, Laptop, ArrowRight } from 'lucide-react';

export default function WishlistPage() {
  const { items, removeItem, getItemCount } = useWishlistStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Heart className="h-8 w-8 text-red-500 fill-red-500" />
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <span className="text-gray-500">({getItemCount()} items)</span>
          </div>
          <Link href="/products" className="btn-primary flex items-center space-x-2">
            <span>Browse Products</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {items.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((product) => (
              <div key={product.id} className="card group relative">
                <Link href={`/products/${product.id}`} className="block">
                  <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <Laptop className="h-24 w-24 text-gray-400" />
                    )}
                  </div>
                </Link>
                <button
                  onClick={() => removeItem(product.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
                <div className="p-4">
                  <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                  <h3 className="font-semibold text-gray-900 mb-2 truncate">{product.name}</h3>
                  <p className="text-primary-600 font-bold">₦{product.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-6">Save products you love to your wishlist</p>
            <Link href="/products" className="btn-primary inline-flex items-center space-x-2">
              <span>Start Shopping</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
